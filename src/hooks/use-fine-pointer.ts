"use client";

import { useEffect, useState } from "react";

/**
 * True only on devices with a precise pointer (mouse/trackpad).
 *
 * Starts `false` so the server render and first client render agree; cursor-
 * tracked effects mount on the second pass, which is invisible to the user.
 */
export function useFinePointer(): boolean {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    setIsFine(query.matches);

    const onChange = (e: MediaQueryListEvent) => setIsFine(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return isFine;
}
