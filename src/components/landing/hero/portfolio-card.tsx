"use client";

import { motion } from "motion/react";

import { EASE_OUT } from "@/lib/motion/easing";

import { BEAT } from "./constants";

/** Share of the allocation bar that is filled. */
const ALLOCATION = "66%";

export function PortfolioCard() {
  return (
    <div className="rounded-2xl border border-white/[0.04] bg-card-elevated p-4">
      <div className="text-xs text-muted-foreground">Portfolio Value</div>
      <div className="mt-1 font-display text-2xl font-bold tabular-nums">
        $284,591.20
      </div>
      <div className="mt-0.5 text-xs text-profit">+$4,218.90 (1.48%) today</div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
        {/* Scales rather than animating width, so it stays off the layout path */}
        <motion.div
          aria-hidden
          className="gradient-primary h-full origin-left"
          style={{ width: ALLOCATION }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: BEAT.portfolioBar, ease: EASE_OUT }}
        />
      </div>
    </div>
  );
}
