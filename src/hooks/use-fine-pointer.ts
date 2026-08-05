"use client";

import { useMediaQuery } from "./use-media-query";

const QUERY = "(pointer: fine)";

/**
 * Whether the device has a precise pointer (mouse/trackpad).
 *
 * Assumes `false` on the server, so cursor-tracked effects mount on the pass
 * after hydration rather than risking a mismatch.
 */
export function useFinePointer(): boolean {
  return useMediaQuery(QUERY);
}
