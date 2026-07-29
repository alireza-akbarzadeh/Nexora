import { NextResponse } from "next/server";

import { jsonError, requireSession } from "@/lib/api/auth-guard";
import { isSupportedExchange } from "@/lib/exchange/client";
import { fetchMarkets } from "@/lib/exchange/service";

export async function GET(request: Request) {
  const { response } = await requireSession();
  if (response) return response;

  const { searchParams } = new URL(request.url);
  const exchange = searchParams.get("exchange") ?? "binance";

  if (!isSupportedExchange(exchange)) {
    return jsonError("Unsupported exchange", 400);
  }

  try {
    const markets = await fetchMarkets(exchange);
    return NextResponse.json({ markets });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch markets";
    return jsonError(message, 500);
  }
}
