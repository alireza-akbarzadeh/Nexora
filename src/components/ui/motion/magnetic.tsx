"use client";

import { motion, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";

import { usePointerOffset } from "@/hooks/use-pointer-offset";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SPRING } from "@/lib/motion/easing";
import { cn } from "@/lib/utils";

/** Max pull in px at strength 1, measured from the element's centre. */
const PULL = 100;

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** 0–1. Fraction of `PULL` the cursor can drag the element. */
  strength?: number;
};

/** Wraps a control so it leans toward the cursor, then springs back. */
export function Magnetic({
  children,
  className,
  strength = 0.25,
}: MagneticProps) {
  const reduced = usePrefersReducedMotion();
  const pointer = usePointerOffset();
  const pull = reduced ? 0 : PULL * strength;

  const x = useSpring(
    useTransform(pointer.x, [-0.5, 0.5], [-pull, pull]),
    SPRING.responsive,
  );
  const y = useSpring(
    useTransform(pointer.y, [-0.5, 0.5], [-pull, pull]),
    SPRING.responsive,
  );

  return (
    <motion.div
      className={cn("inline-flex", className)}
      style={{ x, y }}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
    >
      {children}
    </motion.div>
  );
}
