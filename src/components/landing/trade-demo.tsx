"use client";

import { Activity } from "lucide-react";

import { PaperTradeSimulator } from "@/components/trading/paper-trade-simulator";

import { useReveal } from "./shared/use-reveal";

export function TradeDemoSection() {
  const { ref, seen } = useReveal<HTMLDivElement>();

  return (
    <section id="demo" className="relative overflow-hidden py-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ${seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
            <Activity className="h-3.5 w-3.5" style={{ color: "var(--emerald-glow)" }} />
            <span className="text-muted-foreground">Live simulator · no signup required</span>
          </div>
          <h2 className="mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Try a trade. <span className="gradient-text">Watch your portfolio move.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A risk-free sandbox mirroring the real Nexora engine. Prices update live, orders fill
            instantly, and analytics recompute in real time.
          </p>
        </div>

        <PaperTradeSimulator />
      </div>
    </section>
  );
}
