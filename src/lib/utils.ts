import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, decimals = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatCompactUsd(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "$0";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1e12) return `${sign}$${(abs / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(2)}K`;
  return `${sign}$${abs.toFixed(2)}`;
}

export function formatMarketPrice(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "—";
  if (value >= 1000) return `$${formatPrice(value, 2)}`;
  if (value >= 1) return `$${formatPrice(value, 2)}`;
  if (value >= 0.01) return `$${formatPrice(value, 4)}`;
  return `$${formatPrice(value, 6)}`;
}

export function toBinanceSymbol(symbol: string): string {
  return symbol.replace("/", "").toUpperCase();
}

export function fromBinanceSymbol(symbol: string): string {
  const upper = symbol.toUpperCase();
  if (upper.endsWith("USDT")) {
    return `${upper.slice(0, -4)}/USDT`;
  }
  return upper;
}
