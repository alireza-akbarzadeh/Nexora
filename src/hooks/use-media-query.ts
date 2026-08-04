"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query.
 *
 * Uses `useSyncExternalStore` rather than `useState` + `useEffect`: React
 * renders `serverValue` on the server and through hydration, then swaps to the
 * live value in a follow-up render. That is hydration-safe by construction —
 * reading `matchMedia` during render is not, because the server has no window
 * and the markup would not match.
 *
 * @param serverValue what to assume before the client can measure
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
