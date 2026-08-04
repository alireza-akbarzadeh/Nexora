"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * SSR-safe replacement for motion's `useReducedMotion`.
 *
 * Always returns `false` on the server AND on the first client render, then
 * resolves the real preference in an effect. That ordering matters: motion's
 * own hook reads `matchMedia` during render, so a user with reduce-motion
 * enabled gets `false` on the server and `true` on the client — and any tree
 * that branches on it hydrates into a mismatch.
 *
 * Use this for *values* (transform ranges, durations). Never branch the shape
 * of the tree on it — render the same elements either way.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    setReduced(query.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
