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
 * Renders the final value during SSR and first hydration — the count only
 * begins after the element intersects, which is necessarily post-mount. That
 * ordering keeps the markup identical on both sides, and means unparseable
 * strings and reduced-motion users simply never animate.
 */
export function useCountUp(
  display: string,
  { duration = 1.6, delay = 0 }: Options = {},
): CountUpResult {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const [text, setText] = useState(display);

  useEffect(() => {
    const metric = parseMetric(display);
    if (!inView || reduced || !metric) {
      setText(display);
      return;
    }

    const startedAt = performance.now();
    const delayMs = delay * 1000;
    const durationMs = duration * 1000;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt - delayMs;

      if (elapsed < 0) {
        setText(formatMetric(metric, 0));
        frame = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / durationMs, 1);
      setText(formatMetric(metric, metric.value * easeOut(progress)));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, display, duration, delay]);

  return { ref, text };
}
