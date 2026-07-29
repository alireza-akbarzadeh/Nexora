"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPercent, formatPrice } from "@/lib/utils";

const featuredSymbols = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT"];

export function MarketOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

  return (
    <Link href={`/trade/${slug}`}>
      <Card className="transition-colors hover:border-primary/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{symbol}</CardTitle>
        </CardHeader>
        <CardContent>
          {query.isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <div>
              <p className="font-tabular text-2xl font-semibold">
                ${formatPrice(ticker?.last ?? 0, 2)}
              </p>
              <p className={isPositive ? "text-buy" : "text-sell"}>
                {formatPercent(ticker?.percentage ?? 0)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
