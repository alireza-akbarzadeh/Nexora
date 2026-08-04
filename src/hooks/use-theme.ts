"use client";

import { useContext } from "react";

import { ThemeContext, type ThemeContextValue } from "@/components/theme-provider";

/**
 * Reads and sets the active theme.
 *
 * ```tsx
 * const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
 * ```
 *
 * Throws outside a `ThemeProvider` rather than returning a silent default —
 * a missing provider is a wiring bug, not a runtime condition to handle.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }

  return context;
}
