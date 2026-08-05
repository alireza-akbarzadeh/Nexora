import type { LucideIcon } from "lucide-react";

export type TrustMark = {
  icon: LucideIcon;
  label: string;
};

export type HeroStat = {
  label: string;
  value: string;
  delta: string;
};

export type OrderRow = {
  price: number;
  size: number;
};

export type OrderSide = "buy" | "sell";
