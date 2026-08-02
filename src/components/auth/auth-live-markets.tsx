"use client";

import { TrendingDown, TrendingUp, Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

import { getSignalingManager } from "@/lib/websocket/signaling-manager";
import type { Ticker } from "@/types/exchange";
import { formatPercent, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const MARKETS = [
  { symbol: "BTC/USDT", label: "BTC" },
  { symbol: "ETH/USDT", label: "ETH" },
  { symbol: "SOL/USDT", label: "SOL" },
] as const;

function formatMarketPrice(value: number) {
  if (value >= 1000) return `$${formatPrice(value, 2)}`;
  if (value >= 1) return `$${formatPrice(value, 2)}`;
  return `$${formatPrice(value, 4)}`;
}

export function AuthLiveMarkets() {
  const [tickers, setTickers] = useState<Record<string, Ticker | null>>({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const manager = getSignalingManager();
    const unsubs: Array<() => void> = [];

    for (const { symbol } of MARKETS) {
      unsubs.push(
        manager.subscribeTicker(symbol, (ticker) => {
          setTickers((prev) => ({ ...prev, [symbol]: ticker }));
        }),
      );
    }

    unsubs.push(manager.onConnectionChange(setConnected));

    return () => unsubs.forEach((u) => u());
  }, []);

  return (
    <div className="card-elevated mt-10 hidden max-w-md rounded-2xl p-4 xl:block">
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>Live markets</span>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2 py-0.5",
            connected
              ? "bg-[color-mix(in_srgb,var(--profit)_12%,transparent)] text-profit"
              : "bg-white/[0.06] text-muted-foreground",
          )}
        >
          {connected ? (
            <>
              <Wifi className="h-3 w-3" />
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-profit opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-profit" />
              </span>
              Binance WS
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3" />
              Connecting…
            </>
          )}
        </span>
      </div>
      <div className="space-y-2">
        {MARKETS.map(({ symbol, label }) => {
          const ticker = tickers[symbol];
          const up = (ticker?.percentage ?? 0) >= 0;
          return (
            <div
              key={symbol}
              className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.03] px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
            >
              <span className="font-mono text-sm font-semibold">{label}</span>
              <span className="font-mono text-sm tabular-nums">
                {ticker ? formatMarketPrice(ticker.last) : "—"}
              </span>
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium tabular-nums",
                  up ? "text-profit" : "text-loss",
                )}
              >
                {ticker ? (
                  <>
                    {up ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {formatPercent(ticker.percentage)}
                  </>
                ) : (
                  "—"
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
