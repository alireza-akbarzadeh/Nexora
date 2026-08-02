"use client"

import Link from "next/link"
import { Activity } from "lucide-react"

import { Header } from "@/components/layout/header"
import { PaperTradeSimulator } from "@/components/trading/paper-trade-simulator"
import { Button } from "@/components/ui/button"
import { STARTING_CASH } from "@/lib/landing/constants"
import { fmtUSD } from "@/lib/landing/format"

export function DemoTradingPage() {
  return (
    <>
      <Header
        title="Demo Trading"
        subtitle="Paper portfolio · zero risk · live simulated prices"
      />
      <div className="flex flex-1 flex-col gap-6 overflow-auto p-4 md:p-6">
        <section className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-border bg-card/40 p-5 md:p-6">
          <div className="max-w-xl">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground">
              <Activity className="size-3.5 text-profit" />
              Starting cash {fmtUSD(STARTING_CASH)} · resets anytime
            </div>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Practice before you go live
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Simulated fills against drifting prices. Fills also show in your
              notification bell. When you are ready, connect Binance and trade
              for real.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button render={<Link href="/buy" />}>Buy & Sell</Button>
            <Button variant="outline" render={<Link href="/trade/BTCUSDT" />}>
              Live terminal
            </Button>
          </div>
        </section>

        <PaperTradeSimulator useNotify />
      </div>
    </>
  )
}
