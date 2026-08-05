import {
  COLOR_SCHEME_QUERY,
  DARK_CLASS,
  DEFAULT_THEME,
  isTheme,
  STORAGE_KEY,
  type ResolvedTheme,
  type Theme,
} from "./constants";

/* Resolution of `system` lives in ThemeProvider, which subscribes to the
   colour-scheme media query through useMediaQuery. */

/** Reads the stored preference, falling back to the default. */
export function readStoredTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    // Private mode / storage disabled — fall back rather than throw.
    return DEFAULT_THEME;
  }
}

export function writeStoredTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Persistence is best-effort; the in-memory theme still applies.
  }
}

/**
 * Writes the resolved theme to `<html>`.
 *
 * Sets `color-scheme` too, so native form controls and scrollbars follow.
 */
export function applyTheme(resolved: ResolvedTheme): void {
  const root = document.documentElement;
  root.classList.toggle(DARK_CLASS, resolved === "dark");
  root.style.colorScheme = resolved;
}

/**
 * Runs before first paint to prevent a flash of the wrong theme.
 *
 * Injected as an inline script from the server layout — it must stay
 * dependency-free and synchronous. Kept as a string so it can be embedded
 * without shipping a separate request.
 */
export const THEME_INIT_SCRIPT = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
var t=(s==="light"||s==="dark"||s==="system")?s:${JSON.stringify(DEFAULT_THEME)};
var r=t==="system"?(matchMedia(${JSON.stringify(COLOR_SCHEME_QUERY)}).matches?"dark":"light"):t;
document.documentElement.classList.toggle(${JSON.stringify(DARK_CLASS)},r==="dark");
document.documentElement.style.colorScheme=r;
}catch(e){}})();`;
