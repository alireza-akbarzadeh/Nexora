"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";

import { formatMetric, parseMetric } from "@/lib/landing/metrics";

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

type Options = {
  /** Seconds. */
  duration?: number;
  /** Seconds to wait after entering the viewport. */
  delay?: number;
};

type CountUpResult = {
  ref: RefObject<HTMLSpanElement | null>;
  /** The string to paint this frame. Settles on the original `display`. */
  text: string;
};

/** Expo-out, matched to EASE_OUT so counters settle with everything else. */
function easeOut(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Counts a formatted metric up to its value once scrolled into view.
 *
 * `display` is rendered during SSR and hydration; the count only starts after
 * the element intersects, which is necessarily post-mount. Unparseable strings
 * and reduced-motion users therefore never animate at all.
 *
 * The animated number lives in state but is only ever written from inside a
 * rAF callback — never synchronously in the effect body, which would cascade
 * renders.
 */
export function useCountUp(
  display: string,
  { duration = 1.6, delay = 0 }: Options = {},
): CountUpResult {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const [animated, setAnimated] = useState<number | null>(null);
  const metric = parseMetric(display);

  useEffect(() => {
    const target = parseMetric(display);
    if (!inView || reduced || !target) return;

    const startedAt = performance.now();
    const delayMs = delay * 1000;
    const durationMs = duration * 1000;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt - delayMs;
      const progress = elapsed < 0 ? 0 : Math.min(elapsed / durationMs, 1);

      setAnimated(target.value * easeOut(progress));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, display, duration, delay]);

  const text =
    animated === null || !metric ? display : formatMetric(metric, animated);

  return { ref, text };
}
