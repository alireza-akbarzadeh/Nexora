"use client";

import { motion } from "motion/react";

import { EASE_OUT } from "@/lib/motion/easing";

import { ASKS, BEAT, BIDS, SPREAD_LABEL } from "./constants";
import type { OrderSide } from "./types";

/** Depth-bar width as a percentage of the row, per unit of size. */
const DEPTH_SCALE = 40;

export function OrderBookCard() {
  return (
    <div className="rounded-2xl border border-white/[0.04] bg-card-elevated p-4">
      <div className="mb-2 text-xs text-muted-foreground">Order Book</div>
      <div className="space-y-1 font-mono text-[11px]">
        {ASKS.map((row) => (
          <OrderBookRow key={row.price} {...row} side="sell" />
        ))}

        <div className="py-1 text-center font-semibold text-lime">
          {SPREAD_LABEL}
        </div>

        {BIDS.map((row) => (
          <OrderBookRow key={row.price} {...row} side="buy" />
        ))}
      </div>
    </div>
  );
}

function OrderBookRow({
  price,
  size,
  side,
}: {
  price: number;
  size: number;
  side: OrderSide;
}) {
  const tint = side === "buy" ? "var(--buy)" : "var(--sell)";
  const width = `${size * DEPTH_SCALE}%`;

  return (
    <div className="relative flex justify-between px-2 py-0.5">
      {/* Scales rather than animating width, so it stays off the layout path */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 origin-right"
        style={{ width, background: `color-mix(in srgb, ${tint} 12%, transparent)` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: BEAT.orderBook, ease: EASE_OUT }}
      />
      <span className={`relative ${side === "buy" ? "text-buy" : "text-sell"}`}>
        {price.toFixed(2)}
      </span>
      <span className="relative text-muted-foreground">{size.toFixed(3)}</span>
    </div>
  );
}
