"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  KeyRound,
  LineChart,
  Radio,
  Wallet,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { MarketOverview } from "@/components/trading/market-overview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useWsConnection } from "@/hooks/use-ticker";
import { cn, formatPrice } from "@/lib/utils";
import type { Balance, ExchangeConnectionSummary } from "@/types/exchange";

export function DashboardOverview() {
  const connected = useWsConnection();

  const connectionsQuery = useQuery({
    queryKey: ["exchange-connections"],
    queryFn: async () => {
      const response = await fetch("/api/exchange/connections");
      if (!response.ok) throw new Error("Failed to load connections");
      return response.json() as Promise<{
        connections: ExchangeConnectionSummary[];
      }>;
    },
  });

  const connections = connectionsQuery.data?.connections ?? [];
  const hasActiveBinance = connections.some(
    (connection) => connection.exchange === "binance" && connection.isActive,
  );
  const activeConnections = connections.filter((connection) => connection.isActive);

  const balanceQuery = useQuery({
    queryKey: ["exchange-balance", "binance"],
    queryFn: async () => {
      const response = await fetch("/api/exchange/balance?exchange=binance");
      if (!response.ok) throw new Error("Failed to fetch balances");
      return response.json() as Promise<{ balances: Balance[] }>;
    },
    enabled: hasActiveBinance,
  });

  const usdtBalance = balanceQuery.data?.balances.find(
    (balance) => balance.currency === "USDT",
  );

  const portfolioValue = hasActiveBinance
    ? usdtBalance
      ? `${formatPrice(usdtBalance.free, 2)} USDT`
      : balanceQuery.isLoading
        ? "…"
        : "0.00 USDT"
    : "—";

  const apiKeysValue =
    activeConnections.length > 0
      ? activeConnections
          .map((connection) => connection.exchange)
          .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
          .join(", ")
      : connectionsQuery.isLoading
        ? "…"
        : "Not connected";

  const quickStartSteps = [
    {
      id: 1,
      title: "Create your Nexora account",
      description: "Sign up and verify your email to get started.",
      done: true,
      href: "/dashboard",
    },
    {
      id: 2,
      title: "Connect Binance API keys",
      description: "Add read/trade keys securely in Settings.",
      done: hasActiveBinance,
      href: "/settings",
    },
    {
      id: 3,
      title: "Buy crypto instantly",
      description: "Simple Buy & Sell convert, or open the full terminal.",
      done: false,
      href: "/buy",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Market Feed"
          value={connected ? "Connected" : "Offline"}
          description="Binance WebSocket stream"
          icon={Radio}
          accent={connected ? "text-profit" : "text-muted-foreground"}
        />
        <StatCard
          title="Featured Pairs"
          value="4"
          description="BTC, ETH, SOL, BNB"
          icon={LineChart}
        />
        <StatCard
          title="Portfolio"
          value={portfolioValue}
          description={
            hasActiveBinance
              ? "USDT free balance"
              : "Connect exchange to view balances"
          }
          icon={Wallet}
          href="/portfolio"
        />
        <StatCard
          title="API Keys"
          value={apiKeysValue}
          description={
            activeConnections.length > 0
              ? "Active encrypted connection"
              : "Secure encrypted storage"
          }
          icon={KeyRound}
          href="/settings"
          accent={activeConnections.length > 0 ? "text-profit" : undefined}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader className="border-b border-border/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>Featured Markets</CardTitle>
                <CardDescription>
                  Live prices from Binance — click a pair to trade
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" render={<Link href="/markets" />}>
                View all
                <ArrowUpRight className="size-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <MarketOverview />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Get up and running in three steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickStartSteps.map((step, index) => (
              <div key={step.id}>
                <Link
                  href={step.href}
                  className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  {step.done ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  ) : (
                    <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                  )}
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm font-medium leading-none">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto shrink-0 text-[10px]">
                    {index + 1}
                  </Badge>
                </Link>
                {index < quickStartSteps.length - 1 ? (
                  <Separator className="my-3" />
                ) : null}
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t border-border/60 bg-muted/20">
            <Button className="w-full" render={<Link href="/buy" />}>
              Buy & Sell Crypto
            </Button>
            <Button
              variant="outline"
              className="w-full"
              render={<Link href="/trade/BTCUSDT" />}
            >
              Open Trading Terminal
            </Button>
          </CardFooter>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your trades and orders will appear here once you connect an exchange
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/10 px-6 py-12 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-secondary">
              <LineChart className="size-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">No activity yet</p>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              Connect your Binance API keys in Settings to view balances, open orders,
              and trade history.
            </p>
            <Button
              className="mt-4"
              size="sm"
              variant="outline"
              render={<Link href={hasActiveBinance ? "/portfolio" : "/settings"} />}
            >
              {hasActiveBinance ? "View Portfolio" : "Go to Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  accent,
  href,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: string;
  href?: string;
}) {
  const content = (
    <Card className="group relative overflow-hidden transition-colors hover:border-primary/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardDescription>{title}</CardDescription>
          <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            <Icon className="size-4" />
          </div>
        </div>
        <CardTitle className={cn("text-xl font-semibold tabular-nums", accent)}>
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
