"use client";

import { useScroll, useSpring, useTransform, type MotionStyle } from "motion/react";
import { useRef, type RefObject } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SPRING } from "@/lib/motion/easing";

type HeroScroll = {
  ref: RefObject<HTMLElement | null>;
  /** Applied to the dashboard stage: tips back and sinks on scroll. */
  stageStyle: MotionStyle;
  /** Applied to the copy block: drifts up and fades ahead of the stage. */
  copyStyle: MotionStyle;
};

/**
 * Scroll-linked recession for the hero.
 *
 * As the hero leaves, the dashboard rotates away and shrinks while the copy
 * lifts faster — the parallax difference is what sells the depth.
 *
 * Reduced motion collapses each transform's output range rather than dropping
 * the style object, so the element tree stays identical across hydration.
 */
export function useHeroScroll(): HeroScroll {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, SPRING.scroll);

  const rotateX = useTransform(progress, (p) => (reduced ? 0 : p * 14));
  const scale = useTransform(progress, (p) => (reduced ? 1 : 1 - p * 0.12));
  const stageOpacity = useTransform(progress, (p) =>
    reduced ? 1 : Math.max(0, 1 - p / 0.75),
  );
  const copyY = useTransform(progress, (p) => (reduced ? 0 : p * -90));
  const copyOpacity = useTransform(progress, (p) =>
    reduced ? 1 : Math.max(0, 1 - p / 0.55),
  );

  return {
    ref,
    stageStyle: { rotateX, scale, opacity: stageOpacity },
    copyStyle: { y: copyY, opacity: copyOpacity },
  };
}
