"use client";

import {
  motion,
  useMotionTemplate,
  useSpring,
  useTransform,
  type MotionStyle,
} from "motion/react";
import type { ReactNode } from "react";

import { usePointerOffset } from "@/hooks/use-pointer-offset";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SPRING } from "@/lib/motion/easing";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. Above ~10 it stops reading as depth. */
  max?: number;
  /** Adds a sheen that tracks the pointer across the surface. */
  sheen?: boolean;
  style?: MotionStyle;
};

/**
 * A surface that tilts toward the cursor in 3D.
 *
 * Pointer-bound rather than animated, so the reduced-motion case is handled
 * here by collapsing the rotation range to zero rather than by MotionConfig.
 */
export function TiltCard({
  children,
  className,
  max = 6,
  sheen = true,
  style,
}: TiltCardProps) {
  const reduced = usePrefersReducedMotion();
  const pointer = usePointerOffset();
  const limit = reduced ? 0 : max;

  const rotateX = useSpring(
    useTransform(pointer.y, [-0.5, 0.5], [limit, -limit]),
    SPRING.responsive,
  );
  const rotateY = useSpring(
    useTransform(pointer.x, [-0.5, 0.5], [-limit, limit]),
    SPRING.responsive,
  );

  const sheenX = useTransform(pointer.x, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(pointer.y, [-0.5, 0.5], ["0%", "100%"]);
  const sheenBackground = useMotionTemplate`radial-gradient(420px circle at ${sheenX} ${sheenY}, color-mix(in srgb, var(--foreground) 7%, transparent), transparent 65%)`;

  return (
    <motion.div
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={{ ...style, rotateX, rotateY }}
    >
      {children}
      {sheen ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: sheenBackground }}
        />
      ) : null}
    </motion.div>
  );
}

/**
 * Lifts a child toward the viewer. Only meaningful inside a `TiltCard`.
 *
 * This is a static transform rather than an animation, so it is safe to apply
 * unconditionally — nothing moves unless the parent tilts.
 */
export function Depth({
  children,
  z = 40,
  className,
}: {
  children: ReactNode;
  z?: number;
  className?: string;
}) {
  return (
    <div className={className} style={{ transform: `translateZ(${z}px)` }}>
      {children}
    </div>
  );
}
