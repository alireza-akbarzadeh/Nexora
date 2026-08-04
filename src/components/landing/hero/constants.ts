import { Building2, Lock, ShieldCheck } from "lucide-react";

import type { HeroStat, OrderRow, TrustMark } from "./types";

export const TRUST_MARKS: TrustMark[] = [
  { icon: ShieldCheck, label: "SOC 2 Type II" },
  { icon: Lock, label: "ISO 27001" },
  { icon: Building2, label: "Regulated in 40+ jurisdictions" },
];

export const HERO_STATS: HeroStat[] = [
  { label: "24h Volume", value: "$18.2B", delta: "+12%" },
  { label: "Open Positions", value: "7", delta: "+2.4%" },
  { label: "Win Rate", value: "68.4%", delta: "+3.1%" },
  { label: "Est. APY", value: "14.2%", delta: "Compound" },
];

export const ASKS: OrderRow[] = [
  { price: 68415.2, size: 0.842 },
  { price: 68414.1, size: 1.204 },
  { price: 68413.8, size: 0.331 },
];

export const BIDS: OrderRow[] = [
  { price: 68411.9, size: 0.552 },
  { price: 68410.4, size: 1.891 },
  { price: 68409.2, size: 0.677 },
];

export const SPREAD_LABEL = "68,412.30 ↑";

/**
 * Entrance choreography, in seconds. Kept together so the cascade can be
 * retuned in one place rather than hunting delays across components.
 */
export const BEAT = {
  badge: 0,
  headlineTop: 0.1,
  headlineBottom: 0.2,
  subhead: 0.32,
  actions: 0.42,
  trustMarks: 0.52,
  dashboard: 0.5,
  chartLine: 0.8,
  portfolioBar: 1.2,
  orderBook: 1.4,
  chartArea: 1.5,
  chipPrimary: 1.1,
  chipSecondary: 1.25,
  chartMarker: 2.2,
} as const;
