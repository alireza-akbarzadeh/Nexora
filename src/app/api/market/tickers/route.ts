import { NextResponse } from "next/server";

import { jsonError } from "@/lib/api/auth-guard";
import { isSupportedExchange } from "@/lib/exchange/client";
import { fetchPublicTickers } from "@/lib/exchange/service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const exchange = searchParams.get("exchange") ?? "binance";
  const limit = Math.min(
    Math.max(Number(searchParams.get("limit") ?? "100") || 100, 1),
    200,
  );

  if (!isSupportedExchange(exchange)) {
    return jsonError("Unsupported exchange", 400);
  }

  try {
    const tickers = await fetchPublicTickers(exchange, limit);
    return NextResponse.json({ tickers });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch tickers";
    return jsonError(message, 500);
  }
}
