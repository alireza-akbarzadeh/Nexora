"use client";

import { createContext, useCallback, useEffect, useMemo, useSyncExternalStore } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { applyTheme } from "@/lib/theme/apply";
import { COLOR_SCHEME_QUERY, type ResolvedTheme, type Theme } from "@/lib/theme/constants";
import {
  getThemeServerSnapshot,
  getThemeSnapshot,
  setStoredTheme,
  subscribeToTheme,
} from "@/lib/theme/store";

export type ThemeContextValue = {
  /** The user's preference, which may be `system`. */
  theme: Theme;
  /** What is actually applied right now. Never `system`. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  /** Flips between light and dark, resolving `system` first. */
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Theme state, applied to `<html>`.
 *
 * Hand-rolled rather than next-themes, which injects a script from inside a
 * client component — React 19 warns about that on every render and the warning
 * buries real errors. The no-flash script lives in the server layout instead.
 *
 * Preference and OS colour scheme are both read through external stores, so
 * the server and hydration render the defaults and React corrects afterwards.
 * Nothing here calls setState from an effect.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  // Server assumes dark, matching DEFAULT_THEME, so hydration is consistent.
  const prefersDark = useMediaQuery(COLOR_SCHEME_QUERY, true);
  const resolvedTheme: ResolvedTheme =
    theme === "system" ? (prefersDark ? "dark" : "light") : theme;

  // Writing to the DOM is exactly what effects are for.
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((next: Theme) => setStoredTheme(next), []);

  const toggleTheme = useCallback(() => {
    setStoredTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
