"use client";

import type { Ticker } from "@/types/exchange";
import { formatPercent, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TickerBarProps {
  symbol: string;
  ticker: Ticker | null;
}

export function TickerBar({ symbol, ticker }: TickerBarProps) {
  const isPositive = (ticker?.percentage ?? 0) >= 0;

  return (
    <div className="flex flex-wrap items-center gap-4 px-4 py-2">
      <div>
        <p className="text-lg font-semibold">{symbol}</p>
        <p className="text-xs text-muted-foreground">Binance Spot</p>
      </div>

      <div className="font-tabular">
        <p className="text-2xl font-semibold">
          {ticker ? `$${formatPrice(ticker.last, 2)}` : "--"}
        </p>
        <p
          className={cn(
            "text-sm",
            isPositive ? "text-profit" : "text-loss",
          )}
        >
          {ticker ? formatPercent(ticker.percentage) : "--"}
        </p>
      </div>

      <div className="hidden gap-6 text-xs md:flex">
        <Stat label="24h High" value={ticker ? `$${formatPrice(ticker.high, 2)}` : "--"} />
        <Stat label="24h Low" value={ticker ? `$${formatPrice(ticker.low, 2)}` : "--"} />
        <Stat label="24h Volume" value={ticker ? formatPrice(ticker.volume, 2) : "--"} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-tabular font-medium">{value}</p>
    </div>
  );
}
