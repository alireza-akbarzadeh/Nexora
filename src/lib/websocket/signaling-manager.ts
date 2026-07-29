import type { OrderBook, OrderBookLevel, Ticker } from "@/types/exchange";
import { toBinanceSymbol } from "@/lib/utils";

type StreamCallback<T> = (data: T) => void;

interface BinanceTickerMessage {
  e: "24hrTicker";
  s: string;
  c: string;
  b: string;
  a: string;
  h: string;
  l: string;
  v: string;
  p: string;
  P: string;
  E: number;
}

interface BinanceDepthMessage {
  e: "depthUpdate";
  s: string;
  b: [string, string][];
  a: [string, string][];
  E: number;
}

const WS_URL = "wss://stream.binance.com:9443/ws";
const THROTTLE_MS = 125;
const RECONNECT_BASE_MS = 1000;
const MAX_RECONNECT_MS = 30000;

class SignalingManager {
  private ws: WebSocket | null = null;
  private subscriptions = new Map<string, Set<StreamCallback<unknown>>>();
  private pendingStreams = new Set<string>();
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private throttleTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private latestPayloads = new Map<string, unknown>();
  private pollingTimers = new Map<string, ReturnType<typeof setInterval>>();
  private connectionListeners = new Set<(connected: boolean) => void>();

  subscribeTicker(symbol: string, callback: StreamCallback<Ticker>) {
    const stream = `${toBinanceSymbol(symbol).toLowerCase()}@ticker`;
    return this.subscribe(stream, callback as StreamCallback<unknown>, () =>
      this.fetchTickerFallback(symbol, callback),
    );
  }

  subscribeOrderBook(symbol: string, callback: StreamCallback<OrderBook>) {
    const stream = `${toBinanceSymbol(symbol).toLowerCase()}@depth20@100ms`;
    return this.subscribe(stream, callback as StreamCallback<unknown>, () =>
      this.fetchDepthFallback(symbol, callback),
    );
  }

  onConnectionChange(callback: (connected: boolean) => void) {
    this.connectionListeners.add(callback);
    callback(this.ws?.readyState === WebSocket.OPEN);
    return () => {
      this.connectionListeners.delete(callback);
    };
  }

  private subscribe<T>(
    stream: string,
    callback: StreamCallback<T>,
    startPolling: () => void,
  ) {
    if (!this.subscriptions.has(stream)) {
      this.subscriptions.set(stream, new Set());
    }

    const listeners = this.subscriptions.get(stream)!;
    listeners.add(callback as StreamCallback<unknown>);

    this.pendingStreams.add(stream);
    this.connect();
    startPolling();

    return () => {
      listeners.delete(callback as StreamCallback<unknown>);
      if (listeners.size === 0) {
        this.subscriptions.delete(stream);
        this.stopPolling(stream);
      }
      this.syncSubscriptions();
    };
  }

  private connect() {
    if (typeof window === "undefined") return;
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      this.syncSubscriptions();
      return;
    }

    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.notifyConnection(true);
      this.syncSubscriptions();
    };

    this.ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data as string) as
          | BinanceTickerMessage
          | BinanceDepthMessage
          | { stream: string; data: BinanceTickerMessage | BinanceDepthMessage };

        if ("stream" in payload) {
          this.handlePayload(payload.stream, payload.data);
          return;
        }

        const stream = this.inferStream(payload);
        if (stream) {
          this.handlePayload(stream, payload);
        }
      } catch {
        // Ignore malformed payloads
      }
    };

    this.ws.onclose = () => {
      this.notifyConnection(false);
      this.scheduleReconnect();
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  private inferStream(
    payload: BinanceTickerMessage | BinanceDepthMessage,
  ): string | null {
    const symbol = payload.s?.toLowerCase();
    if (!symbol) return null;
    if (payload.e === "24hrTicker") return `${symbol}@ticker`;
    if (payload.e === "depthUpdate") return `${symbol}@depth20@100ms`;
    return null;
  }

  private handlePayload(
    stream: string,
    payload: BinanceTickerMessage | BinanceDepthMessage,
  ) {
    const normalized =
      stream.endsWith("@ticker")
        ? this.normalizeTicker(payload as BinanceTickerMessage)
        : this.normalizeOrderBook(payload as BinanceDepthMessage);

    this.latestPayloads.set(stream, normalized);
    if (this.throttleTimers.has(stream)) return;

    this.throttleTimers.set(
      stream,
      setTimeout(() => {
        this.throttleTimers.delete(stream);
        const latest = this.latestPayloads.get(stream);
        if (!latest) return;
        this.subscriptions.get(stream)?.forEach((listener) => listener(latest));
      }, THROTTLE_MS),
    );
  }

  private normalizeTicker(payload: BinanceTickerMessage): Ticker {
    return {
      symbol: payload.s,
      last: Number(payload.c),
      bid: Number(payload.b),
      ask: Number(payload.a),
      high: Number(payload.h),
      low: Number(payload.l),
      volume: Number(payload.v),
      change: Number(payload.p),
      percentage: Number(payload.P),
      timestamp: payload.E,
    };
  }

  private normalizeOrderBook(payload: BinanceDepthMessage): OrderBook {
    const mapLevels = (levels: [string, string][]): OrderBookLevel[] =>
      levels.map(([price, amount]) => ({
        price: Number(price),
        amount: Number(amount),
      }));

    return {
      symbol: payload.s,
      bids: mapLevels(payload.b).sort((a, b) => b.price - a.price),
      asks: mapLevels(payload.a).sort((a, b) => a.price - b.price),
      timestamp: payload.E,
    };
  }

  private syncSubscriptions() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const streams = Array.from(this.subscriptions.keys());
    if (streams.length === 0) return;

    this.ws.send(
      JSON.stringify({
        method: "SUBSCRIBE",
        params: streams,
        id: Date.now(),
      }),
    );
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    const delay = Math.min(
      RECONNECT_BASE_MS * 2 ** this.reconnectAttempts,
      MAX_RECONNECT_MS,
    );
    this.reconnectAttempts += 1;

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, delay);
  }

  private notifyConnection(connected: boolean) {
    this.connectionListeners.forEach((listener) => listener(connected));
  }

  private fetchTickerFallback(symbol: string, callback: StreamCallback<Ticker>) {
    const stream = `${toBinanceSymbol(symbol).toLowerCase()}@ticker`;
    if (this.pollingTimers.has(stream)) return;

    const poll = async () => {
      try {
        const response = await fetch(
          `/api/market?symbol=${encodeURIComponent(symbol)}&type=ticker`,
        );
        if (!response.ok) return;
        const data = (await response.json()) as { ticker: Ticker };
        callback(data.ticker);
      } catch {
        // Ignore polling errors
      }
    };

    poll();
    this.pollingTimers.set(stream, setInterval(poll, 5000));
  }

  private fetchDepthFallback(
    symbol: string,
    callback: StreamCallback<OrderBook>,
  ) {
    const stream = `${toBinanceSymbol(symbol).toLowerCase()}@depth20@100ms`;
    if (this.pollingTimers.has(`${stream}-depth`)) return;

    const poll = async () => {
      try {
        const binanceSymbol = toBinanceSymbol(symbol);
        const response = await fetch(
          `https://api.binance.com/api/v3/depth?symbol=${binanceSymbol}&limit=20`,
        );
        if (!response.ok) return;
        const data = (await response.json()) as {
          bids: [string, string][];
          asks: [string, string][];
        };

        callback({
          symbol: binanceSymbol,
          bids: data.bids.map(([price, amount]) => ({
            price: Number(price),
            amount: Number(amount),
          })),
          asks: data.asks.map(([price, amount]) => ({
            price: Number(price),
            amount: Number(amount),
          })),
          timestamp: Date.now(),
        });
      } catch {
        // Ignore polling errors
      }
    };

    poll();
    this.pollingTimers.set(`${stream}-depth`, setInterval(poll, 5000));
  }

  private stopPolling(stream: string) {
    const timer = this.pollingTimers.get(stream);
    if (timer) {
      clearInterval(timer);
      this.pollingTimers.delete(stream);
    }

    const depthTimer = this.pollingTimers.get(`${stream}-depth`);
    if (depthTimer) {
      clearInterval(depthTimer);
      this.pollingTimers.delete(`${stream}-depth`);
    }
  }
}

declare global {
  interface Window {
    __nexoraSignalingManager?: SignalingManager;
  }
}

export function getSignalingManager(): SignalingManager {
  if (typeof window === "undefined") {
    throw new Error("SignalingManager is only available in the browser");
  }

  if (!window.__nexoraSignalingManager) {
    window.__nexoraSignalingManager = new SignalingManager();
  }

  return window.__nexoraSignalingManager;
}
