"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SPRING } from "@/lib/motion/easing";

/** Total travel in px at |speed| === 1, split evenly either side of centre. */
const TRAVEL = 300;

type ParallaxLayerProps = {
  children?: ReactNode;
  className?: string;
  /**
   * Negative moves against the scroll (reads as far away), positive moves with
   * it (reads as near). Keep |speed| under ~0.4 or the layer visibly detaches.
   */
  speed?: number;
  style?: CSSProperties;
};

export function ParallaxLayer({
  children,
  className,
  speed = -0.2,
  style,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scroll-linked values are bound, not animated, so MotionConfig does not
  // neutralise them — the reduced case has to collapse the range by hand.
  // Same element either way, so hydration is unaffected.
  const offset = useTransform(scrollYProgress, (progress) =>
    reduced ? 0 : (progress - 0.5) * 2 * speed * TRAVEL,
  );
  const y = useSpring(offset, SPRING.scroll);

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}
