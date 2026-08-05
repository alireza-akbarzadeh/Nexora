"use client";

import { useEffect, useRef } from "react";
import {
  CandlestickSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from "lightweight-charts";

import type { OHLCV } from "@/types/exchange";
import { cn } from "@/lib/utils";

interface TradingChartProps {
  symbol: string;
  candles: OHLCV[];
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export function TradingChart({
  symbol,
  candles,
  loading,
  error,
  className,
}: TradingChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  // Always mount the container first — never gate chart creation behind `loading`,
  // or the empty-deps init effect runs once with a null ref and never recovers.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#8d96a3",
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: 11,
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: "#1b2129" },
        horzLines: { color: "#1b2129" },
      },
      rightPriceScale: {
        borderColor: "#252c36",
        scaleMargins: { top: 0.08, bottom: 0.12 },
      },
      timeScale: {
        borderColor: "#252c36",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: "#8b7cff66",
          labelBackgroundColor: "#151a21",
        },
        horzLine: {
          color: "#8b7cff66",
          labelBackgroundColor: "#151a21",
        },
      },
      width: container.clientWidth,
      height: Math.max(container.clientHeight, 1),
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#63e6be",
      downColor: "#ff6b7a",
      borderUpColor: "#63e6be",
      borderDownColor: "#ff6b7a",
      wickUpColor: "#63e6be",
      wickDownColor: "#ff6b7a",
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
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;

    if (candles.length === 0) {
      seriesRef.current.setData([]);
      return;
    }

    seriesRef.current.setData(
      candles.map((candle) => ({
        time: Math.floor(candle.timestamp / 1000) as UTCTimestamp,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
      })),
    );

    chartRef.current?.timeScale().fitContent();
  }, [candles, symbol]);

  const showLoading = Boolean(loading);
  const showError = Boolean(error) && candles.length === 0 && !loading;
  const showEmpty = !loading && !error && candles.length === 0;

  return (
    <div
      className={cn(
        "relative h-full min-h-[320px] w-full overflow-hidden bg-card",
        className,
      )}
    >
      <div ref={containerRef} className="absolute inset-0" />

      {showLoading || showError || showEmpty ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/80 backdrop-blur-[1px]">
          {showLoading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-violet" />
              <p className="text-xs text-muted-foreground">Loading chart…</p>
            </div>
          ) : showError ? (
            <div className="max-w-xs px-4 text-center">
              <p className="text-sm font-medium text-destructive">
                Chart unavailable
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{error}</p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No candle data</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
