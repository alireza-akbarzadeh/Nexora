"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Header } from "@/components/layout/header";
import { OpenOrdersPanel } from "@/components/trading/open-orders-panel";
import { OrderBookPanel } from "@/components/trading/order-book-panel";
import { OrderForm } from "@/components/trading/order-form";
import { TickerBar } from "@/components/trading/ticker-bar";
import { TradingChart } from "@/components/trading/trading-chart";
import { useOrderBook } from "@/hooks/use-order-book";
import { useTicker } from "@/hooks/use-ticker";
import { cn, fromBinanceSymbol } from "@/lib/utils";
import type { OHLCV } from "@/types/exchange";

const TIMEFRAMES = ["15m", "1h", "4h", "1d"] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

interface TradeTerminalProps {
  symbolSlug: string;
}

export function TradeTerminal({ symbolSlug }: TradeTerminalProps) {
  const symbol = fromBinanceSymbol(symbolSlug);
  const { ticker } = useTicker(symbol);
  const orderBook = useOrderBook(symbol);
  const [timeframe, setTimeframe] = useState<Timeframe>("1h");

  const candlesQuery = useQuery({
    queryKey: ["ohlcv", symbol, timeframe],
    queryFn: async () => {
      const response = await fetch(
        `/api/market?symbol=${encodeURIComponent(symbol)}&type=ohlcv&timeframe=${timeframe}&limit=120`,
      );
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Failed to fetch chart data");
      }
      return response.json() as Promise<{ candles: OHLCV[] }>;
    },
    refetchInterval: 60_000,
  });

  const chartError =
    candlesQuery.error instanceof Error
      ? candlesQuery.error.message
      : candlesQuery.isError
        ? "Failed to fetch chart data"
        : null;

  return (
    <>
      <Header title="Trading Terminal" />
      <TickerBar symbol={symbol} ticker={ticker} />

      <main className="grid min-h-0 flex-1 gap-px overflow-auto bg-border p-px xl:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-rows-[minmax(0,1fr)_240px]">
        <section className="flex min-h-[480px] flex-col bg-card xl:row-span-2 xl:min-h-0">
          <PanelHeader title="Order Book" />
          <div className="min-h-0 flex-1">
            <OrderBookPanel orderBook={orderBook} />
          </div>
        </section>

        <section className="flex min-h-[420px] flex-col bg-card xl:min-h-0">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Chart
            </h2>
            <div className="flex items-center gap-0.5 rounded-md bg-muted p-0.5">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTimeframe(tf)}
                  className={cn(
                    "rounded px-2 py-1 text-[11px] font-medium transition-colors",
                    timeframe === tf
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1">
            <TradingChart
              symbol={symbol}
              candles={candlesQuery.data?.candles ?? []}
              loading={candlesQuery.isLoading}
              error={chartError}
            />
          </div>
        </section>

        <section className="flex min-h-[480px] flex-col bg-card xl:row-span-2 xl:min-h-0">
          <PanelHeader title="Place Order" />
          <div className="min-h-0 flex-1">
            <OrderForm symbol={symbol} />
          </div>
        </section>

        <section className="flex min-h-[220px] flex-col bg-card xl:min-h-0">
          <PanelHeader title="Open Orders" />
          <div className="min-h-0 flex-1">
            <OpenOrdersPanel symbol={symbol} />
          </div>
        </section>
      </main>
    </>
  );
}

function PanelHeader({ title }: { title: string }) {
  return (
    <div className="border-b border-border px-3 py-2">
      <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h2>
    </div>
  );
}
