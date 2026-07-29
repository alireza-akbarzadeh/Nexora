import Link from "next/link";

import { Header } from "@/components/layout/header";
import { MarketOverview } from "@/components/trading/market-overview";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" subtitle="Overview of your trading activity" />

      <main className="flex flex-1 flex-col gap-6 p-6">
        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Featured Markets</CardTitle>
              <Link
                href="/markets"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                View all
              </Link>
            </CardHeader>
            <CardContent>
              <MarketOverview />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>1. Create your Nexora account</p>
              <p>2. Connect Binance API keys in Settings</p>
              <p>3. Open the trading terminal and place orders</p>
              <Link
                href="/trade/BTCUSDT"
                className={cn(buttonVariants(), "w-full justify-center")}
              >
                Open Trading Terminal
              </Link>
              <Link
                href="/settings"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-center",
                )}
              >
                Connect Exchange
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
