"use client";

import { Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";

import { Depth, TiltCard } from "@/components/ui/motion";
import { EASE_OUT } from "@/lib/motion/easing";

import { ChartPanel } from "./chart-panel";
import { BEAT } from "./constants";
import { FloatingChip } from "./floating-chip";
import { OrderBookCard } from "./order-book";
import { PortfolioCard } from "./portfolio-card";
import { StatTiles } from "./stat-tiles";

/** The product shot: a tilting panel with its contents lifted in z. */
export function HeroDashboard() {
  return (
    <motion.div
      className="relative [transform-style:preserve-3d]"
      initial={{ opacity: 0, y: 90, rotateX: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: BEAT.dashboard, ease: EASE_OUT }}
    >
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[2rem] bg-gradient-to-r from-[color-mix(in_srgb,var(--violet)_30%,transparent)] via-[color-mix(in_srgb,var(--violet)_20%,transparent)] to-[color-mix(in_srgb,var(--profit)_20%,transparent)] blur-3xl"
      />

      <TiltCard
        max={5}
        className="card-elevated relative rounded-3xl p-4 shadow-[var(--shadow-elevated)] md:p-6"
      >
        <Depth z={30}>
          <WindowChrome />
        </Depth>

        <div className="mt-4 grid grid-cols-12 gap-4">
          <Depth z={45} className="col-span-12 lg:col-span-8">
            <ChartPanel />
          </Depth>

          <Depth z={35} className="col-span-12 space-y-3 lg:col-span-4">
            <PortfolioCard />
            <OrderBookCard />
          </Depth>

          <Depth
            z={25}
            className="col-span-12 mt-1 grid grid-cols-2 gap-3 md:grid-cols-4"
          >
            <StatTiles />
          </Depth>
        </div>
      </TiltCard>

      <FloatingChip
        className="top-1/3 -left-8 shadow-[var(--shadow-glow-emerald)]"
        icon={Zap}
        tint="var(--profit)"
        label="Execution"
        value="12ms avg"
        delay={BEAT.chipPrimary}
      />
      <FloatingChip
        className="-right-8 bottom-1/3 shadow-[var(--shadow-glow)]"
        icon={Sparkles}
        tint="var(--violet)"
        label="AI signal"
        value="ETH bull cross"
        delay={BEAT.chipSecondary}
        floatDelay="1s"
      />
    </motion.div>
  );
}

function WindowChrome() {
  return (
    <div className="flex items-center justify-between border-b border-white/5 px-2 pb-4">
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--loss)_60%,transparent)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--lime)_60%,transparent)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--profit)_60%,transparent)]" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          nexora.app / trade / BTC-USD
        </span>
      </div>

      <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-profit" />
        Live · 12ms
      </div>
    </div>
  );
}
