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
