import { NextResponse } from "next/server";

import { jsonError, requireSession } from "@/lib/api/auth-guard";
import { fetchUserBalances } from "@/lib/exchange/service";
import { isSupportedExchange } from "@/lib/exchange/client";

export async function GET(request: Request) {
  const { session, response } = await requireSession();
  if (!session) return response!;

  const { searchParams } = new URL(request.url);
  const exchange = searchParams.get("exchange") ?? "binance";

  if (!isSupportedExchange(exchange)) {
    return jsonError("Unsupported exchange", 400);
  }

  try {
    const balances = await fetchUserBalances(session.user.id, exchange);
    return NextResponse.json({ balances });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch balances";
    return jsonError(message, 500);
  }
}
