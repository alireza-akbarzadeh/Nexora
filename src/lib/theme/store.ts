import { readStoredTheme, writeStoredTheme } from "./apply";
import { DEFAULT_THEME, type Theme } from "./constants";

/**
 * Tiny external store for the theme preference.
 *
 * Exists so `ThemeProvider` can read it with `useSyncExternalStore` instead of
 * `useState` + a mount effect — the latter is a synchronous setState inside an
 * effect, which cascades renders and trips `react-hooks/set-state-in-effect`.
 */

const listeners = new Set<() => void>();

/**
 * Cached so `getSnapshot` is referentially stable between notifications.
 * `useSyncExternalStore` re-renders whenever the snapshot differs, so reading
 * localStorage fresh on every call would loop.
 */
let cached: Theme | null = null;

function emit(): void {
  for (const listener of listeners) listener();
}

export function subscribeToTheme(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  // Keep other tabs in sync.
  const onStorage = () => {
    cached = null;
    onStoreChange();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function getThemeSnapshot(): Theme {
  cached ??= readStoredTheme();
  return cached;
}

/** The server cannot read localStorage, so it renders the default. */
export function getThemeServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

export function setStoredTheme(theme: Theme): void {
  cached = theme;
  writeStoredTheme(theme);
  emit();
}
