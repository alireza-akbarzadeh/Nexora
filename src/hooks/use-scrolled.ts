"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

/**
 * True once the page has scrolled past `threshold` px.
 *
 * Reads from motion's shared scroll listener rather than adding another
 * `scroll` handler, and only re-renders when the boolean actually flips.
 */
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > threshold;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return scrolled;
}
