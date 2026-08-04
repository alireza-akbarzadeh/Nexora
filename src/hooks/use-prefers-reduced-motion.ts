"use client";

import { useMediaQuery } from "./use-media-query";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Whether the user asked the OS to reduce motion.
 *
 * Assumes `false` on the server so the markup matches the default animated
 * render, then corrects after hydration.
 *
 * Use this for *values* (transform ranges, durations). Never branch the shape
 * of the tree on it — render the same elements either way, and let
 * `<MotionConfig reducedMotion="user">` strip the animation.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery(QUERY);
}
