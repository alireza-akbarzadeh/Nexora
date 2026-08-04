"use client";

import { TrendingUp } from "lucide-react";
import { motion } from "motion/react";

import { CHART_HEIGHT, CHART_WIDTH, HERO_CHART } from "@/lib/landing/hero-chart";
import { EASE_OUT } from "@/lib/motion/easing";

import { BEAT } from "./constants";

const TIMEFRAMES = ["1H", "4H", "1D", "1W", "1M"] as const;
const ACTIVE_TIMEFRAME = "1D";
const GRIDLINES = [0.25, 0.5, 0.75];

export function ChartPanel() {
  return (
    <div className="rounded-2xl border border-white/[0.04] bg-card-elevated p-5">
      <ChartHeader />
      <PriceChart />
    </div>
  );
}

function ChartHeader() {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-md bg-white/5 px-2 py-0.5">BTC / USD</span>
          <span>Bitcoin</span>
        </div>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold tracking-tight tabular-nums">
            $68,412.30
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-profit">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden /> +2.84%
          </span>
        </div>
      </div>

      <div className="hidden gap-1 text-xs sm:flex">
        {TIMEFRAMES.map((frame) => {
          const active = frame === ACTIVE_TIMEFRAME;
          return (
            <button
              key={frame}
              type="button"
              aria-pressed={active}
              className={`cursor-pointer rounded-md px-2.5 py-1 transition-colors duration-200 ${
                active
                  ? "bg-violet/20 text-violet"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {frame}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PriceChart() {
  const { line, area, last } = HERO_CHART;

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="h-56 w-full"
      role="img"
      aria-label="BTC to USD price, trending up 2.84% over the last day"
    >
      <defs>
        <linearGradient id="hero-chart-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--lime)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--lime)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {GRIDLINES.map((fraction) => (
        <line
          key={fraction}
          x1="0"
          x2={CHART_WIDTH}
          y1={CHART_HEIGHT * fraction}
          y2={CHART_HEIGHT * fraction}
          stroke="var(--chart-grid)"
          strokeDasharray="2 4"
        />
      ))}

      <motion.path
        d={area}
        fill="url(#hero-chart-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: BEAT.chartArea, ease: "easeOut" }}
      />

      {/* The line draws itself left-to-right, as if printing live */}
      <motion.path
        d={line}
        stroke="var(--lime)"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: BEAT.chartLine, ease: EASE_OUT }}
      />

      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: BEAT.chartMarker, ease: EASE_OUT }}
        style={{ transformOrigin: `${last.x}px ${last.y}px` }}
      >
        <circle
          cx={last.x}
          cy={last.y}
          r="8"
          fill="color-mix(in srgb, var(--lime) 20%, transparent)"
          className="animate-pulse"
        />
        <circle cx={last.x} cy={last.y} r="3" fill="var(--lime)" />
      </motion.g>
    </svg>
  );
}
