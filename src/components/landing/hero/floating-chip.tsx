"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { EASE_OUT } from "@/lib/motion/easing";
import { cn } from "@/lib/utils";

/** How far in front of the dashboard the chips sit, in px. */
const CHIP_Z = 80;

type FloatingChipProps = {
  icon: LucideIcon;
  /** Any CSS colour or custom property, used for the icon tile tint. */
  tint: string;
  label: string;
  value: string;
  /** Entrance delay in seconds. */
  delay: number;
  /** Offsets the idle float so chips do not bob in unison. */
  floatDelay?: string;
  className?: string;
};

/**
 * A stat chip pinned in front of the hero dashboard. Desktop only — there is
 * no room beside the panel below `lg`, and overlapping it would hurt reading.
 *
 * The idle bob is the CSS `animate-float` utility, which globals.css disables
 * under `prefers-reduced-motion`.
 */
export function FloatingChip({
  icon: Icon,
  tint,
  label,
  value,
  delay,
  floatDelay,
  className,
}: FloatingChipProps) {
  return (
    <motion.div
      className={cn("glass-strong absolute hidden rounded-2xl p-4 lg:block", className)}
      style={{ transform: `translateZ(${CHIP_Z}px)` }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      <div
        className="animate-float"
        style={floatDelay ? { animationDelay: floatDelay } : undefined}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `color-mix(in srgb, ${tint} 15%, transparent)` }}
          >
            <Icon className="h-5 w-5" style={{ color: tint }} aria-hidden />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="text-sm font-semibold">{value}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
