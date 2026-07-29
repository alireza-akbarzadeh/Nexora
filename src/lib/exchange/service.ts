import type { Ticker as CcxtTicker } from "ccxt";
import { and, eq } from "drizzle-orm";

import { db, exchangeConnections } from "@/lib/db";
import {
  createAuthenticatedExchange,
  createPublicExchange,
} from "@/lib/exchange/client";
import { decryptSecret } from "@/lib/exchange/encryption";
import type {
  Balance,
  ExchangeId,
  ExchangeOrder,
  MarketInfo,
  OHLCV,
  Ticker,
} from "@/types/exchange";

function normalizeTicker(symbol: string, ticker: CcxtTicker): Ticker {
  return {
    symbol,
    last: ticker.last ?? 0,
    bid: ticker.bid ?? 0,
    ask: ticker.ask ?? 0,
    high: ticker.high ?? 0,
    low: ticker.low ?? 0,
    volume: ticker.baseVolume ?? 0,
    change: ticker.change ?? 0,
    percentage: ticker.percentage ?? 0,
    timestamp: ticker.timestamp ?? Date.now(),
  };
}

export async function getUserExchange(
  userId: string,
  exchangeId: ExchangeId = "binance",
) {
  const [connection] = await db
    .select()
    .from(exchangeConnections)
    .where(
      and(
        eq(exchangeConnections.userId, userId),
        eq(exchangeConnections.exchange, exchangeId),
        eq(exchangeConnections.isActive, true),
      ),
    )
    .limit(1);

  if (!connection) {
    return null;
  }

  const apiKey = decryptSecret(connection.encryptedApiKey);
  const apiSecret = decryptSecret(connection.encryptedApiSecret);

  return createAuthenticatedExchange(exchangeId, apiKey, apiSecret);
}

export async function fetchMarkets(
  exchangeId: ExchangeId = "binance",
): Promise<MarketInfo[]> {
  const exchange = createPublicExchange(exchangeId);
  const markets = await exchange.loadMarkets();

  return Object.values(markets)
    .filter(
      (market): market is NonNullable<typeof market> =>
        Boolean(market?.active && market.quote === "USDT"),
    )
    .slice(0, 100)
    .map((market) => ({
      symbol: market.symbol,
      base: market.base,
      quote: market.quote,
      active: market.active ?? true,
    }));
}

export async function fetchPublicTicker(
  symbol: string,
  exchangeId: ExchangeId = "binance",
): Promise<Ticker> {
  const exchange = createPublicExchange(exchangeId);
  const ticker = await exchange.fetchTicker(symbol);
  return normalizeTicker(symbol, ticker);
}

export async function fetchPublicOHLCV(
  symbol: string,
  timeframe = "1h",
  limit = 100,
  exchangeId: ExchangeId = "binance",
): Promise<OHLCV[]> {
  const exchange = createPublicExchange(exchangeId);
  const candles = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);

  return candles.map(([timestamp, open, high, low, close, volume]) => ({
    timestamp: timestamp ?? 0,
    open: open ?? 0,
    high: high ?? 0,
    low: low ?? 0,
    close: close ?? 0,
    volume: volume ?? 0,
  }));
}

export async function fetchUserBalances(
  userId: string,
  exchangeId: ExchangeId = "binance",
): Promise<Balance[]> {
  const exchange = await getUserExchange(userId, exchangeId);
  if (!exchange) {
    return [];
  }

  const accountBalance = await exchange.fetchBalance();
  const freeBalances = accountBalance.free as unknown as
    | Record<string, number>
    | undefined;
  const usedBalances = accountBalance.used as unknown as
    | Record<string, number>
    | undefined;

  return Object.entries(accountBalance.total ?? {})
    .filter(([, total]) => (total ?? 0) > 0)
    .map(([currency, total]) => ({
      currency,
      free: freeBalances?.[currency] ?? 0,
      used: usedBalances?.[currency] ?? 0,
      total: total ?? 0,
    }));
}

export async function fetchUserOrders(
  userId: string,
  symbol?: string,
  exchangeId: ExchangeId = "binance",
): Promise<ExchangeOrder[]> {
  const exchange = await getUserExchange(userId, exchangeId);
  if (!exchange) {
    return [];
  }

  const orders = await exchange.fetchOpenOrders(symbol);
  return orders.map((order) => ({
    id: String(order.id),
    symbol: String(order.symbol),
    type: order.type ?? "limit",
    side: order.side as "buy" | "sell",
    price: order.price ?? 0,
    amount: order.amount ?? 0,
    filled: order.filled ?? 0,
    remaining: order.remaining ?? 0,
    status: order.status ?? "open",
    timestamp: order.timestamp ?? Date.now(),
  }));
}

export async function placeUserOrder(
  userId: string,
  input: {
    symbol: string;
    side: "buy" | "sell";
    type: "market" | "limit";
    amount: number;
    price?: number;
    exchangeId?: ExchangeId;
  },
): Promise<ExchangeOrder> {
  const exchangeId = input.exchangeId ?? "binance";
  const exchange = await getUserExchange(userId, exchangeId);
  if (!exchange) {
    throw new Error("No active exchange connection found");
  }

  const order = await exchange.createOrder(
    input.symbol,
    input.type,
    input.side,
    input.amount,
    input.type === "limit" ? input.price : undefined,
  );

  return {
    id: String(order.id),
    symbol: String(order.symbol),
    type: order.type ?? input.type,
    side: order.side as "buy" | "sell",
    price: order.price ?? 0,
    amount: order.amount ?? 0,
    filled: order.filled ?? 0,
    remaining: order.remaining ?? 0,
    status: order.status ?? "open",
    timestamp: order.timestamp ?? Date.now(),
  };
}
