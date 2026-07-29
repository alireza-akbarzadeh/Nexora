"use client";

import { useEffect, useState } from "react";

import { getSignalingManager } from "@/lib/websocket/signaling-manager";
import type { OrderBook } from "@/types/exchange";

export function useOrderBook(symbol: string) {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);

  useEffect(() => {
    const manager = getSignalingManager();
    return manager.subscribeOrderBook(symbol, setOrderBook);
  }, [symbol]);

  return orderBook;
}
