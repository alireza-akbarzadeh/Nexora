import { NextResponse } from "next/server";

import { fetchPublicOHLCV, fetchPublicTicker } from "@/lib/exchange/service";
import { isSupportedExchange } from "@/lib/exchange/client";
import { jsonError } from "@/lib/api/auth-guard";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  const exchange = searchParams.get("exchange") ?? "binance";
  const type = searchParams.get("type") ?? "ticker";
  const timeframe = searchParams.get("timeframe") ?? "1h";
  const limit = Number(searchParams.get("limit") ?? "100");

  if (!symbol) {
    return jsonError("Symbol is required");
  }

  if (!isSupportedExchange(exchange)) {
    return jsonError("Unsupported exchange", 400);
  }

  try {
    if (type === "ohlcv") {
      const candles = await fetchPublicOHLCV(symbol, timeframe, limit, exchange);
      return NextResponse.json({ candles });
    }

    const ticker = await fetchPublicTicker(symbol, exchange);
    return NextResponse.json({ ticker });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch market data";
    return jsonError(message, 500);
  }
}
