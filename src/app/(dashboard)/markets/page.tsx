"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MarketInfo } from "@/types/exchange";

export default function MarketsPage() {
  const [search, setSearch] = useState("");

  const marketsQuery = useQuery({
    queryKey: ["markets"],
    queryFn: async () => {
      const response = await fetch("/api/exchange/markets?exchange=binance");
      if (!response.ok) throw new Error("Failed to fetch markets");
      return response.json() as Promise<{ markets: MarketInfo[] }>;
    },
  });

  const filteredMarkets = useMemo(() => {
    const markets = marketsQuery.data?.markets ?? [];
    if (!search) return markets;
    return markets.filter((market) =>
      market.symbol.toLowerCase().includes(search.toLowerCase()),
    );
  }, [marketsQuery.data?.markets, search]);

  return (
    <>
      <Header title="Markets" subtitle="Browse USDT trading pairs on Binance" />

      <main className="flex flex-1 flex-col gap-4 p-6">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search markets (e.g. BTC/USDT)"
          className="max-w-md"
        />

        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Base</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMarkets.map((market) => (
                <TableRow key={market.symbol}>
                  <TableCell className="font-medium">{market.symbol}</TableCell>
                  <TableCell>{market.base}</TableCell>
                  <TableCell>{market.quote}</TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/trade/${market.symbol.replace("/", "")}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Trade
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
