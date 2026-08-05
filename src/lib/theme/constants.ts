/** Theme vocabulary and storage contract. No React, no DOM. */

/** What the user picks. `system` defers to the OS preference. */
export type Theme = "light" | "dark" | "system";

/** What actually gets applied to the document. Never `system`. */
export type ResolvedTheme = "light" | "dark";

export const THEMES: readonly Theme[] = ["light", "dark", "system"] as const;

export const STORAGE_KEY = "nexora-theme";

export const DEFAULT_THEME: Theme = "dark";

/** Class toggled on `<html>`. Matches the `dark:` variant in globals.css. */
export const DARK_CLASS = "dark";

export const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && THEMES.includes(value as Theme);
}
