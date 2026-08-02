"use client";

import { useEffect, useRef } from "react";
import {
  AreaSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from "lightweight-charts";

import { cn } from "@/lib/utils";
import type { OHLCV } from "@/types/exchange";

interface PriceAreaChartProps {
  candles: OHLCV[];
  accentColor?: string;
  positive?: boolean;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export function PriceAreaChart({
  candles,
  accentColor = "#d9ff5a",
  positive = true,
  loading,
  error,
  className,
}: PriceAreaChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  const lineColor = positive ? accentColor : "#ff6b7a";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#8d96a3",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: 11,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "#1b2129", style: 1 },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.12, bottom: 0.08 },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: `${lineColor}66`,
          labelBackgroundColor: "#151a21",
        },
        horzLine: {
          color: `${lineColor}66`,
          labelBackgroundColor: "#151a21",
        },
      },
      width: container.clientWidth,
      height: Math.max(container.clientHeight, 1),
      handleScroll: { mouseWheel: true, pressedMouseMove: true },
      handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor,
      topColor: `${lineColor}55`,
      bottomColor: `${lineColor}00`,
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: true,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width <= 0 || height <= 0) return;
      chart.applyOptions({ width, height });
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
    // Recreate when accent flips so area fill matches trend.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- lineColor drives series styling on remount
  }, [lineColor]);

  useEffect(() => {
    const series = seriesRef.current;
    const chart = chartRef.current;
    if (!series || !chart) return;

    if (candles.length === 0) {
      series.setData([]);
      return;
    }

    series.setData(
      candles.map((candle) => ({
        time: Math.floor(candle.timestamp / 1000) as UTCTimestamp,
        value: candle.close,
      })),
    );
    chart.timeScale().fitContent();
  }, [candles]);

  const showError = Boolean(error) && candles.length === 0 && !loading;
  const showEmpty = !loading && !error && candles.length === 0;

  return (
    <div className={cn("relative h-full min-h-[280px] w-full", className)}>
      <div ref={containerRef} className="absolute inset-0" />
      {loading && candles.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/40">
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
        </div>
      ) : null}
      {showError ? (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          {error}
        </div>
      ) : null}
      {showEmpty ? (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          No chart data
        </div>
      ) : null}
    </div>
  );
}
