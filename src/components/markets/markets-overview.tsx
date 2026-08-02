"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChartLine,
  Search,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatCompactUsd,
  formatMarketPrice,
  formatPercent,
} from "@/lib/utils";
import type { Ticker } from "@/types/exchange";

type SortKey = "symbol" | "last" | "percentage" | "high" | "quoteVolume";
type SortDir = "asc" | "desc";
type Category = "favorites" | "spot";
type Zone = "all" | "layer1" | "defi" | "meme" | "ai";

const FAVORITES_KEY = "nexora-market-favorites";

const NEW_BASES = new Set([
  "SUI",
  "APT",
  "ARB",
  "OP",
  "SEI",
  "TIA",
  "WIF",
  "PEPE",
  "WLD",
  "ENA",
  "PENDLE",
  "JUP",
]);

const ZONE_BASES: Record<Exclude<Zone, "all">, Set<string>> = {
  layer1: new Set([
    "BTC",
    "ETH",
    "SOL",
    "BNB",
    "ADA",
    "AVAX",
    "DOT",
    "ATOM",
    "NEAR",
    "SUI",
    "APT",
    "TON",
  ]),
  defi: new Set([
    "UNI",
    "AAVE",
    "LINK",
    "MKR",
    "CRV",
    "COMP",
    "SNX",
    "LDO",
    "PENDLE",
    "ENA",
  ]),
  meme: new Set(["DOGE", "SHIB", "PEPE", "WIF", "FLOKI", "BONK", "MEME"]),
  ai: new Set(["FET", "RNDR", "TAO", "WLD", "AI", "AKT", "GRT"]),
};

const ZONES: { id: Zone; label: string }[] = [
  { id: "all", label: "All" },
  { id: "layer1", label: "Layer 1" },
  { id: "defi", label: "DeFi" },
  { id: "meme", label: "MEME" },
  { id: "ai", label: "AI" },
];

function baseOf(symbol: string) {
  return symbol.split("/")[0] ?? symbol;
}

function tradeHref(symbol: string) {
  return `/trade/${symbol.replace("/", "")}`;
}

function AssetAvatar({ base }: { base: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold tracking-tight text-primary">
      {base.slice(0, 3)}
    </span>
  );
}

function ChangeBadge({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-tabular text-sm font-medium",
        up ? "text-profit" : "text-loss",
      )}
    >
      {up ? (
        <ArrowUpRight className="size-3.5" />
      ) : (
        <ArrowDownRight className="size-3.5" />
      )}
      {formatPercent(value)}
    </span>
  );
}

function HighlightCard({
  title,
  items,
  loading,
}: {
  title: string;
  items: Ticker[];
  loading: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/80 bg-card/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        <span className="text-xs text-muted-foreground">More ›</span>
      </div>
      <div className="space-y-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-7 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))
          : items.map((ticker) => {
              const base = baseOf(ticker.symbol);
              return (
                <Link
                  key={ticker.symbol}
                  href={tradeHref(ticker.symbol)}
                  className="flex items-center gap-3 rounded-lg px-1 py-0.5 transition-colors hover:bg-accent/60"
                >
                  <AssetAvatar base={base} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{base}</p>
                    <p className="font-tabular text-xs text-muted-foreground">
                      {formatMarketPrice(ticker.last)}
                    </p>
                  </div>
                  <ChangeBadge value={ticker.percentage} />
                </Link>
              );
            })}
      </div>
    </div>
  );
}

function SortableHead({
  label,
  sortKey,
  activeKey,
  dir,
  onSort,
  className,
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey;
  dir: SortDir;
  onSort: (key: SortKey) => void;
  className?: string;
}) {
  const active = activeKey === sortKey;
  const right = className?.includes("text-right");
  return (
    <TableHead className={className}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cn(
          "inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide transition-colors hover:text-foreground",
          right && "w-full justify-end",
          active ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
        {active ? (
          <span className="text-primary">{dir === "asc" ? "↑" : "↓"}</span>
        ) : null}
      </button>
    </TableHead>
  );
}

export function MarketsOverview() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("spot");
  const [zone, setZone] = useState<Zone>("all");
  const [sortKey, setSortKey] = useState<SortKey>("quoteVolume");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) setFavorites(JSON.parse(raw) as string[]);
    } catch {
      // ignore
    }
  }, []);

  const tickersQuery = useQuery({
    queryKey: ["market-tickers", "binance"],
    queryFn: async () => {
      const response = await fetch("/api/market/tickers?exchange=binance&limit=100");
      if (!response.ok) throw new Error("Failed to fetch tickers");
      return response.json() as Promise<{ tickers: Ticker[] }>;
    },
    refetchInterval: 20_000,
  });

  const tickers = tickersQuery.data?.tickers ?? [];
  const loading = tickersQuery.isLoading;

  const highlights = useMemo(() => {
    const hot = [...tickers].slice(0, 3);
    const topVolume = [...tickers]
      .sort((a, b) => b.quoteVolume - a.quoteVolume)
      .slice(0, 3);
    const topGainer = [...tickers]
      .filter((t) => Number.isFinite(t.percentage))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);
    const newest = tickers
      .filter((t) => NEW_BASES.has(baseOf(t.symbol)))
      .sort((a, b) => b.quoteVolume - a.quoteVolume)
      .slice(0, 3);
    return { hot, newest, topGainer, topVolume };
  }, [tickers]);

  const filtered = useMemo(() => {
    let rows = tickers;

    if (category === "favorites") {
      rows = rows.filter((t) => favorites.includes(t.symbol));
    }

    if (zone !== "all") {
      const bases = ZONE_BASES[zone];
      rows = rows.filter((t) => bases.has(baseOf(t.symbol)));
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (t) =>
          t.symbol.toLowerCase().includes(q) ||
          baseOf(t.symbol).toLowerCase().includes(q),
      );
    }

    const sorted = [...rows].sort((a, b) => {
      const av =
        sortKey === "symbol" ? baseOf(a.symbol) : (a[sortKey] as number);
      const bv =
        sortKey === "symbol" ? baseOf(b.symbol) : (b[sortKey] as number);
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc"
        ? Number(av) - Number(bv)
        : Number(bv) - Number(av);
    });

    return sorted;
  }, [tickers, category, zone, search, sortKey, sortDir, favorites]);

  function toggleFavorite(symbol: string) {
    setFavorites((prev) => {
      const next = prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  }

  function onSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir(key === "symbol" ? "asc" : "desc");
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <nav className="flex gap-6 border-b border-border text-sm">
        <span className="border-b-2 border-primary pb-2.5 font-medium text-foreground">
          Overview
        </span>
        <Link
          href="/trade/BTCUSDT"
          className="pb-2.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          Trading
        </Link>
      </nav>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <HighlightCard title="Hot" items={highlights.hot} loading={loading} />
        <HighlightCard
          title="New"
          items={highlights.newest}
          loading={loading}
        />
        <HighlightCard
          title="Top Gainer"
          items={highlights.topGainer}
          loading={loading}
        />
        <HighlightCard
          title="Top Volume"
          items={highlights.topVolume}
          loading={loading}
        />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1">
            {(
              [
                { id: "favorites", label: "Favorites" },
                { id: "spot", label: "Spot" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  category === item.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search markets"
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {ZONES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setZone(item.id)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                zone === item.id
                  ? "bg-foreground text-background"
                  : "bg-accent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Top Tokens by Volume
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Live Binance USDT spot pairs with 24h price, change, and volume.
          </p>
        </div>

        {tickersQuery.isError ? (
          <div className="rounded-xl border border-loss/30 bg-loss/5 px-4 py-6 text-center text-sm text-loss">
            Could not load markets.{" "}
            <button
              type="button"
              className="underline"
              onClick={() => tickersQuery.refetch()}
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-10" />
                  <SortableHead
                    label="Name"
                    sortKey="symbol"
                    activeKey={sortKey}
                    dir={sortDir}
                    onSort={onSort}
                  />
                  <SortableHead
                    label="Price"
                    sortKey="last"
                    activeKey={sortKey}
                    dir={sortDir}
                    onSort={onSort}
                    className="text-right"
                  />
                  <SortableHead
                    label="24h Change"
                    sortKey="percentage"
                    activeKey={sortKey}
                    dir={sortDir}
                    onSort={onSort}
                    className="text-right"
                  />
                  <SortableHead
                    label="24h High"
                    sortKey="high"
                    activeKey={sortKey}
                    dir={sortDir}
                    onSort={onSort}
                    className="hidden text-right md:table-cell"
                  />
                  <SortableHead
                    label="24h Volume"
                    sortKey="quoteVolume"
                    activeKey={sortKey}
                    dir={sortDir}
                    onSort={onSort}
                    className="hidden text-right lg:table-cell"
                  />
                  <TableHead className="text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={7}>
                          <Skeleton className="h-10 w-full" />
                        </TableCell>
                      </TableRow>
                    ))
                  : filtered.map((ticker) => {
                      const base = baseOf(ticker.symbol);
                      const fav = favorites.includes(ticker.symbol);
                      return (
                        <TableRow
                          key={ticker.symbol}
                          className="group transition-colors"
                        >
                          <TableCell className="pr-0">
                            <button
                              type="button"
                              aria-label={
                                fav ? "Remove favorite" : "Add favorite"
                              }
                              onClick={() => toggleFavorite(ticker.symbol)}
                              className="rounded p-1 text-muted-foreground transition-colors hover:text-primary"
                            >
                              <Star
                                className={cn(
                                  "size-3.5",
                                  fav && "fill-primary text-primary",
                                )}
                              />
                            </button>
                          </TableCell>
                          <TableCell>
                            <Link
                              href={tradeHref(ticker.symbol)}
                              className="flex items-center gap-3"
                            >
                              <AssetAvatar base={base} />
                              <div>
                                <p className="font-medium">{base}</p>
                                <p className="text-xs text-muted-foreground">
                                  {ticker.symbol}
                                </p>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell className="text-right font-tabular font-medium">
                            {formatMarketPrice(ticker.last)}
                          </TableCell>
                          <TableCell className="text-right">
                            <ChangeBadge value={ticker.percentage} />
                          </TableCell>
                          <TableCell className="hidden text-right font-tabular text-muted-foreground md:table-cell">
                            {formatMarketPrice(ticker.high)}
                          </TableCell>
                          <TableCell className="hidden text-right font-tabular lg:table-cell">
                            {formatCompactUsd(ticker.quoteVolume)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="inline-flex items-center gap-1">
                              <Button
                                size="icon-sm"
                                variant="ghost"
                                aria-label={`Chart ${base}`}
                                render={
                                  <Link href={tradeHref(ticker.symbol)} />
                                }
                              >
                                <ChartLine className="size-3.5" />
                              </Button>
                              <Button
                                size="icon-sm"
                                variant="ghost"
                                className="text-muted-foreground"
                                aria-label={`Alerts ${base}`}
                                render={
                                  <Link href={tradeHref(ticker.symbol)} />
                                }
                              >
                                <Bell className="size-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                render={
                                  <Link href={tradeHref(ticker.symbol)} />
                                }
                              >
                                Trade
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {!loading && filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      {category === "favorites"
                        ? "No favorites yet — star a pair to pin it here."
                        : "No markets match your filters."}
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}
