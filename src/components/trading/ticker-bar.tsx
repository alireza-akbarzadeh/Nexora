"use client";

import type { Ticker } from "@/types/exchange";
import { cn, formatPercent, formatPrice } from "@/lib/utils";

interface TickerBarProps {
  symbol: string;
  ticker: Ticker | null;
}

export function TickerBar({ symbol, ticker }: TickerBarProps) {
  const isPositive = (ticker?.percentage ?? 0) >= 0;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-border bg-card/60 px-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold tracking-tight">{symbol}</p>
        <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Binance Spot
        </p>
      </div>

      <div className="font-tabular">
        <p
          className={cn(
            "text-2xl font-semibold tracking-tight",
            ticker
              ? isPositive
                ? "text-profit"
                : "text-loss"
              : "text-foreground",
          )}
        >
          {ticker ? `$${formatPrice(ticker.last, 2)}` : "—"}
        </p>
        <p
          className={cn(
            "text-sm font-medium",
            isPositive ? "text-profit" : "text-loss",
          )}
        >
          {ticker ? formatPercent(ticker.percentage) : "—"}
        </p>
      </div>

      <div className="hidden flex-1 items-center gap-8 text-xs md:flex">
        <Stat
          label="24h High"
          value={ticker ? `$${formatPrice(ticker.high, 2)}` : "—"}
        />
        <Stat
          label="24h Low"
          value={ticker ? `$${formatPrice(ticker.low, 2)}` : "—"}
        />
        <Stat
          label="24h Volume"
          value={ticker ? formatPrice(ticker.volume, 2) : "—"}
        />
        {ticker?.bid != null && ticker?.ask != null ? (
          <Stat
            label="Bid / Ask"
            value={`${formatPrice(ticker.bid, 2)} / ${formatPrice(ticker.ask, 2)}`}
          />
        ) : null}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 font-tabular text-sm font-medium text-foreground">
        {value}
      </p>
    </div>
  );
}
