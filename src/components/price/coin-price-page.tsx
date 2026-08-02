"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { LandingFooter } from "@/components/landing/footer";
import { LandingNav } from "@/components/landing/nav";
import { BuyWidget } from "@/components/price/buy-widget";
import { PriceAreaChart } from "@/components/price/price-area-chart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  coinPricePath,
  getAllCoins,
  type CoinInfo,
} from "@/lib/coins/catalog";
import { useTicker } from "@/hooks/use-ticker";
import {
  cn,
  formatCompactUsd,
  formatMarketPrice,
  formatPercent,
  formatPrice,
} from "@/lib/utils";
import type { OHLCV } from "@/types/exchange";

const RANGE_OPTIONS = [
  { id: "1D", label: "1D", timeframe: "15m", limit: 96 },
  { id: "7D", label: "7D", timeframe: "1h", limit: 168 },
  { id: "1M", label: "1M", timeframe: "4h", limit: 180 },
  { id: "3M", label: "3M", timeframe: "1d", limit: 90 },
  { id: "1Y", label: "1Y", timeframe: "1d", limit: 365 },
  { id: "YTD", label: "YTD", timeframe: "1d", limit: 370 },
] as const;

type RangeId = (typeof RANGE_OPTIONS)[number]["id"];

const TABS = ["Chart", "Overview", "Markets"] as const;
type TabId = (typeof TABS)[number];

interface CoinPricePageProps {
  coin: CoinInfo;
}

export function CoinPricePage({ coin }: CoinPricePageProps) {
  const [range, setRange] = useState<RangeId>("1D");
  const [tab, setTab] = useState<TabId>("Chart");
  const { ticker } = useTicker(coin.pair);

  const rangeConfig = RANGE_OPTIONS.find((r) => r.id === range) ?? RANGE_OPTIONS[0];

  const candlesQuery = useQuery({
    queryKey: ["price-ohlcv", coin.pair, rangeConfig.timeframe, rangeConfig.limit],
    queryFn: async () => {
      const response = await fetch(
        `/api/market?symbol=${encodeURIComponent(coin.pair)}&type=ohlcv&timeframe=${rangeConfig.timeframe}&limit=${rangeConfig.limit}`,
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

  const candles = useMemo(() => {
    const raw = candlesQuery.data?.candles ?? [];
    if (range !== "YTD" || raw.length === 0) return raw;
    const start = Date.UTC(new Date().getUTCFullYear(), 0, 1);
    return raw.filter((c) => c.timestamp >= start);
  }, [candlesQuery.data?.candles, range]);

  const price = ticker?.last ?? candles.at(-1)?.close ?? null;
  const changePct = ticker?.percentage ?? null;
  const isUp = (changePct ?? 0) >= 0;
  const updatedAt = ticker?.timestamp
    ? new Date(ticker.timestamp)
    : new Date();

  const chartError =
    candlesQuery.error instanceof Error
      ? candlesQuery.error.message
      : candlesQuery.isError
        ? "Failed to fetch chart data"
        : null;

  const otherCoins = getAllCoins().filter((c) => c.slug !== coin.slug).slice(0, 6);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = `${coin.name} Price (${coin.symbol})`;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
    } catch {
      // User cancelled share — ignore.
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      <main className="mx-auto max-w-7xl px-6 pt-28 pb-16">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/#markets" className="transition-colors hover:text-foreground">
            Crypto prices
          </Link>
          <span>/</span>
          <span className="text-foreground">
            {coin.name} Price ({coin.symbol})
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold"
                  style={{ background: `${coin.color}22`, color: coin.color }}
                >
                  {coin.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                      {coin.name} Price{" "}
                      <span className="text-muted-foreground">({coin.symbol})</span>
                    </h1>
                    {coin.hot ? (
                      <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase">
                        Hot
                      </span>
                    ) : null}
                  </div>

                  {price == null && candlesQuery.isLoading ? (
                    <Skeleton className="mt-3 h-10 w-48" />
                  ) : (
                    <div className="mt-2 font-mono text-4xl font-semibold tracking-tight tabular-nums md:text-5xl">
                      {price != null ? formatMarketPrice(price) : "—"}
                    </div>
                  )}

                  <div
                    className={cn(
                      "mt-2 text-sm font-medium",
                      isUp ? "text-profit" : "text-loss",
                    )}
                  >
                    {changePct != null ? formatPercent(changePct) : "—"} in the past 24 hrs
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </Button>
            </div>

            <div className="mt-8 flex gap-6 overflow-x-auto border-b border-border">
              {TABS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={cn(
                    "relative shrink-0 pb-3 text-sm font-medium transition-colors",
                    tab === item
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item}
                  {tab === item ? (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                  ) : null}
                </button>
              ))}
            </div>

            {tab === "Chart" ? (
              <section className="mt-5">
                <div className="mb-4 flex flex-wrap items-center gap-1.5">
                  {RANGE_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setRange(option.id)}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                        range === option.id
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div className="h-[360px] md:h-[420px]">
                  <PriceAreaChart
                    candles={candles}
                    accentColor={isUp ? coin.color : "#ff6b7a"}
                    positive={isUp}
                    loading={candlesQuery.isLoading}
                    error={chartError}
                  />
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Page last updated:{" "}
                  {updatedAt.toLocaleString("en-US", {
                    timeZone: "UTC",
                    dateStyle: "short",
                    timeStyle: "short",
                  })}{" "}
                  (UTC)
                </p>
              </section>
            ) : null}

            {tab === "Overview" ? (
              <section className="mt-6 max-w-3xl space-y-4">
                <h2 className="text-lg font-semibold">About {coin.name}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {coin.description}
                </p>
                <dl className="grid gap-3 sm:grid-cols-2">
                  <Stat label="Category" value={coin.category} />
                  <Stat label="Trading pair" value={coin.pair} />
                </dl>
              </section>
            ) : null}

            {tab === "Markets" ? (
              <section className="mt-6">
                <h2 className="mb-4 text-lg font-semibold">Trade {coin.symbol}</h2>
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Pair</th>
                        <th className="px-4 py-3 font-medium">Price</th>
                        <th className="px-4 py-3 font-medium">24h Change</th>
                        <th className="px-4 py-3 font-medium" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border">
                        <td className="px-4 py-3 font-medium">{coin.pair}</td>
                        <td className="px-4 py-3 font-mono tabular-nums">
                          {price != null ? formatMarketPrice(price) : "—"}
                        </td>
                        <td
                          className={cn(
                            "px-4 py-3 font-mono tabular-nums",
                            isUp ? "text-profit" : "text-loss",
                          )}
                        >
                          {changePct != null ? formatPercent(changePct) : "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link
                            href={`/trade/${coin.symbol}USDT`}
                            className="text-primary hover:underline"
                          >
                            Trade
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            <section className="mt-12">
              <h2 className="mb-5 font-display text-2xl font-bold tracking-tight">
                {coin.name} Market Stats
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Stat
                  label="Price"
                  value={price != null ? formatMarketPrice(price) : "—"}
                />
                <Stat
                  label="24h Change"
                  value={changePct != null ? formatPercent(changePct) : "—"}
                  tone={isUp ? "up" : "down"}
                />
                <Stat
                  label="24h High"
                  value={
                    ticker?.high != null ? formatMarketPrice(ticker.high) : "—"
                  }
                />
                <Stat
                  label="24h Low"
                  value={
                    ticker?.low != null ? formatMarketPrice(ticker.low) : "—"
                  }
                />
                <Stat
                  label="24h Volume"
                  value={
                    ticker?.quoteVolume != null
                      ? formatCompactUsd(ticker.quoteVolume)
                      : "—"
                  }
                />
                <Stat
                  label="Circulating supply"
                  value={
                    coin.circulatingSupply != null
                      ? `${formatPrice(coin.circulatingSupply, 0)} ${coin.symbol}`
                      : "—"
                  }
                />
                <Stat
                  label="Max supply"
                  value={
                    coin.maxSupply == null
                      ? "Unlimited"
                      : `${formatPrice(coin.maxSupply, 0)} ${coin.symbol}`
                  }
                />
                <Stat
                  label="Est. market cap"
                  value={
                    price != null && coin.circulatingSupply != null
                      ? formatCompactUsd(price * coin.circulatingSupply)
                      : "—"
                  }
                />
                <Stat label="Category" value={coin.category} />
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <BuyWidget coin={coin} price={price} />
          </div>
        </div>

        <section className="mt-16">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Trending crypto
            </h2>
            <Link
              href="/#markets"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherCoins.map((item) => (
              <Link
                key={item.slug}
                href={coinPricePath(item)}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/40"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: `${item.color}22`, color: item.color }}
                >
                  {item.symbol.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {item.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{item.symbol}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up" | "down";
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <div className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
      <div
        className={cn(
          "mt-1.5 font-mono text-sm font-medium tabular-nums",
          tone === "up" && "text-profit",
          tone === "down" && "text-loss",
        )}
      >
        {value}
      </div>
    </div>
  );
}
