"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import {
  applyTheme,
  readStoredTheme,
  resolveTheme,
  writeStoredTheme,
} from "@/lib/theme/apply";
import {
  COLOR_SCHEME_QUERY,
  DEFAULT_THEME,
  type ResolvedTheme,
  type Theme,
} from "@/lib/theme/constants";

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
 * Deliberately hand-rolled rather than using next-themes, which injects a
 * script from inside a client component — React 19 warns about that on every
 * render and the warning buries real errors. The no-flash script lives in the
 * server layout instead, where an inline script is legitimate.
 *
 * Both `theme` and `resolvedTheme` start at the defaults so the first client
 * render matches the server HTML; the stored value is read in an effect.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    resolveTheme(DEFAULT_THEME),
  );

  // Adopt the persisted preference after mount.
  useEffect(() => {
    const stored = readStoredTheme();
    setThemeState(stored);
    setResolvedTheme(resolveTheme(stored));
  }, []);

  // Keep the document in sync with whatever is currently resolved.
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // Follow the OS while the preference is `system`.
  useEffect(() => {
    if (theme !== "system") return;

    const query = window.matchMedia(COLOR_SCHEME_QUERY);
    const onChange = (e: MediaQueryListEvent) =>
      setResolvedTheme(e.matches ? "dark" : "light");

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    setResolvedTheme(resolveTheme(next));
    writeStoredTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
