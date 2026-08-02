"use client";

import { useQuery } from "@tanstack/react-query";

import { Header } from "@/components/layout/header";
import { OpenOrdersPanel } from "@/components/trading/open-orders-panel";
import { OrderBookPanel } from "@/components/trading/order-book-panel";
import { OrderForm } from "@/components/trading/order-form";
import { TickerBar } from "@/components/trading/ticker-bar";
import { TradingChart } from "@/components/trading/trading-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrderBook } from "@/hooks/use-order-book";
import { useTicker } from "@/hooks/use-ticker";
import { fromBinanceSymbol } from "@/lib/utils";
import type { OHLCV } from "@/types/exchange";

interface TradeTerminalProps {
  symbolSlug: string;
}

export function TradeTerminal({ symbolSlug }: TradeTerminalProps) {
  const symbol = fromBinanceSymbol(symbolSlug);
  const { ticker } = useTicker(symbol);
  const orderBook = useOrderBook(symbol);

  const candlesQuery = useQuery({
    queryKey: ["ohlcv", symbol],
    queryFn: async () => {
      const response = await fetch(
        `/api/market?symbol=${encodeURIComponent(symbol)}&type=ohlcv&timeframe=1h&limit=120`,
      );
      if (!response.ok) throw new Error("Failed to fetch chart data");
      return response.json() as Promise<{ candles: OHLCV[] }>;
    },
    refetchInterval: 60_000,
  });

  return (
    <>
      <Header title="Trading Terminal" />
      <TickerBar symbol={symbol} ticker={ticker} />

      <main className="grid flex-1 gap-4 p-4 xl:grid-cols-[280px_minmax(0,1fr)_320px] xl:grid-rows-[minmax(420px,1fr)_280px]">
        <Card className="overflow-hidden xl:row-span-2">
          <CardHeader className="border-b border-border py-3">
            <CardTitle className="text-sm">Order Book</CardTitle>
          </CardHeader>
          <CardContent className="h-[520px] p-0">
            <OrderBookPanel orderBook={orderBook} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border py-3">
            <CardTitle className="text-sm">Chart</CardTitle>
          </CardHeader>
          <CardContent className="h-[420px] p-3">
            <TradingChart
              symbol={symbol}
              candles={candlesQuery.data?.candles ?? []}
              loading={candlesQuery.isLoading}
            />
          </CardContent>
        </Card>

        <Card className="overflow-hidden xl:row-span-2">
          <CardHeader className="border-b border-border py-3">
            <CardTitle className="text-sm">Place Order</CardTitle>
          </CardHeader>
          <CardContent className="h-[520px] p-0">
            <OrderForm symbol={symbol} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border py-3">
            <CardTitle className="text-sm">Open Orders</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px] p-0">
            <OpenOrdersPanel symbol={symbol} />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
