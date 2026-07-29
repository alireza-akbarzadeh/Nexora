"use client";

import { useEffect, useState } from "react";

import { getSignalingManager } from "@/lib/websocket/signaling-manager";
import type { Ticker } from "@/types/exchange";

export function useTicker(symbol: string) {
  const [ticker, setTicker] = useState<Ticker | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const manager = getSignalingManager();
    const unsubscribeTicker = manager.subscribeTicker(symbol, setTicker);
    const unsubscribeConnection = manager.onConnectionChange(setConnected);

    return () => {
      unsubscribeTicker();
      unsubscribeConnection();
    };
  }, [symbol]);

  return { ticker, connected };
}

export function useWsConnection() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const manager = getSignalingManager();
    return manager.onConnectionChange(setConnected);
  }, []);

  return connected;
}
