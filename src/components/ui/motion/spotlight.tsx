"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

import { useFinePointer } from "@/hooks/use-fine-pointer";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SPRING } from "@/lib/motion/easing";
import { cn } from "@/lib/utils";

const OFFSCREEN = -9999;

type SpotlightProps = {
  className?: string;
  /** Diameter of the glow in px. */
  size?: number;
  /** Any CSS colour or custom property. */
  color?: string;
  /** 0–1. Above ~0.15 it stops reading as ambient light. */
  opacity?: number;
};

/**
 * A radial glow that trails the pointer with spring lag.
 *
 * Both gates (`useFinePointer`, `usePrefersReducedMotion`) start `false` on the
 * server and on the first client render, so this consistently renders nothing
 * during hydration and mounts on the following pass.
 */
export function Spotlight({
  className,
  size = 520,
  color = "var(--violet)",
  opacity = 0.1,
}: SpotlightProps) {
  const hasFinePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const active = hasFinePointer && !reduced;

  const x = useMotionValue(OFFSCREEN);
  const y = useMotionValue(OFFSCREEN);
  const smoothX = useSpring(x, SPRING.trail);
  const smoothY = useSpring(y, SPRING.trail);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${smoothX}px ${smoothY}px, color-mix(in srgb, ${color} ${opacity * 100}%, transparent), transparent 70%)`;

  useEffect(() => {
    if (!active) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, x, y]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-30", className)}
      style={{ background }}
    />
  );
}
