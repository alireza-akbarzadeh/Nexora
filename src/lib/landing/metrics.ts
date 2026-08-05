/** Parsing helpers for the formatted metric strings in landing constants. */

export type ParsedMetric = {
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
};

/**
 * Splits a display metric into its animatable parts.
 *
 * `"$180B+"` → `{ prefix: "$", value: 180, suffix: "B+", decimals: 0 }`
 * `"99.99%"` → `{ prefix: "",  value: 99.99, suffix: "%", decimals: 2 }`
 *
 * Returns `null` for anything without a leading number, so callers can fall
 * back to rendering the string as-is.
 */
export function parseMetric(display: string): ParsedMetric | null {
  const match = /^(\D*?)([\d.]+)(.*)$/.exec(display);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const value = Number(digits);
  if (!Number.isFinite(value)) return null;

  return {
    prefix,
    value,
    suffix,
    decimals: digits.includes(".") ? digits.split(".")[1].length : 0,
  };
}

/** Rebuilds the display string at an intermediate value during a count-up. */
export function formatMetric(metric: ParsedMetric, value: number): string {
  return `${metric.prefix}${value.toFixed(metric.decimals)}${metric.suffix}`;
}
