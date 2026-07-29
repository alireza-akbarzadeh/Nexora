"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { formatPercent, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const featuredSymbols = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT"];

export function MarketOverview() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {featuredSymbols.map((symbol) => (
        <MarketCard key={symbol} symbol={symbol} />
      ))}
    </div>
  );
}

function MarketCard({ symbol }: { symbol: string }) {
  const query = useQuery({
    queryKey: ["market-ticker", symbol],
    queryFn: async () => {
      const response = await fetch(
        `/api/market?symbol=${encodeURIComponent(symbol)}&type=ticker`,
      );
      if (!response.ok) throw new Error("Failed to fetch ticker");
      return response.json();
    },
    refetchInterval: 15_000,
  });

  const ticker = query.data?.ticker;
  const isPositive = (ticker?.percentage ?? 0) >= 0;
  const slug = symbol.replace("/", "");
  const base = symbol.split("/")[0];

  return (
    <Link href={`/trade/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-primary/40 hover:bg-card hover:shadow-[0_0_24px_-8px] hover:shadow-primary/20">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {base}
            </p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{symbol}</p>
          </div>
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-lg",
              isPositive ? "bg-buy/10 text-buy" : "bg-sell/10 text-sell",
            )}
          >
            {isPositive ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4" />
            )}
          </div>
        </div>

        <div className="mt-4">
          {query.isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-4 w-16" />
            </div>
          ) : (
            <>
              <p className="font-tabular text-2xl font-semibold tracking-tight">
                ${formatPrice(ticker?.last ?? 0, 2)}
              </p>
              <p
                className={cn(
                  "mt-1 text-sm font-medium tabular-nums",
                  isPositive ? "text-buy" : "text-sell",
                )}
              >
                {formatPercent(ticker?.percentage ?? 0)}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  24h
                </span>
              </p>
            </>
          )}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </Link>
  );
}
