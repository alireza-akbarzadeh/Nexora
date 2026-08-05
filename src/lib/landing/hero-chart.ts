/**
 * Deterministic price series for the hero dashboard.
 *
 * Generated from a seeded PRNG at module scope so the server render and the
 * client hydration produce byte-identical SVG paths. `Math.random()` here
 * would be a hydration mismatch.
 */

import { mulberry32 } from "./seeded-random";

export type ChartPoint = { x: number; y: number };

export type HeroChart = {
  points: ChartPoint[];
  /** SVG `d` attribute for the price line. */
  line: string;
  /** SVG `d` attribute for the filled area beneath the line. */
  area: string;
  last: ChartPoint;
};

export const CHART_WIDTH = 600;
export const CHART_HEIGHT = 220;

const SEED = 0x9e3779b9;
const SAMPLES = 60;
const BASE_PRICE = 62_000;

function buildSeries(): number[] {
  const random = mulberry32(SEED);
  let price = BASE_PRICE;

  return Array.from({ length: SAMPLES }, (_, i) => {
    // Sine gives a readable trend; the noise term keeps it from looking synthetic.
    price += Math.sin(i / 4) * 300 + (random() - 0.45) * 400;
    return price;
  });
}

function toPoints(series: number[]): ChartPoint[] {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;

  return series.map((price, i) => ({
    x: (i / (series.length - 1)) * CHART_WIDTH,
    y: CHART_HEIGHT - ((price - min) / range) * CHART_HEIGHT,
  }));
}

function buildChart(): HeroChart {
  const points = toPoints(buildSeries());
  const line = points
    .map((pt, i) => `${i === 0 ? "M" : "L"}${pt.x},${pt.y}`)
    .join(" ");

  return {
    points,
    line,
    area: `${line} L${CHART_WIDTH},${CHART_HEIGHT} L0,${CHART_HEIGHT} Z`,
    last: points[points.length - 1],
  };
}

export const HERO_CHART: HeroChart = buildChart();
