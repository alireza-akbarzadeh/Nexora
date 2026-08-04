"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { EASE_OUT } from "@/lib/motion/easing";
import { REVEAL_VIEWPORT } from "@/lib/motion/variants";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Stagger siblings by ~0.08 for a legible cascade. */
  delay?: number;
  /** Travel distance in px. Larger reads as "further away". */
  y?: number;
  /** Entry blur in px — the core depth cue. 0 disables it. */
  blur?: number;
  /** Entry scale. Below 1 pushes the element back in z. */
  scale?: number;
  duration?: number;
};

/**
 * Scroll-triggered depth entrance for a single element.
 *
 * Reduced motion is handled by the app-level `<MotionConfig reducedMotion="user">`,
 * which drops the transform channels and keeps the opacity fade. Nothing here
 * branches on the preference, so the tree hydrates identically.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  blur = 8,
  scale = 0.98,
  duration = 0.9,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
