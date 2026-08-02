import { NextResponse } from "next/server";
import { z } from "zod";

import { jsonError, requireSession } from "@/lib/api/auth-guard";
import { isSupportedExchange } from "@/lib/exchange/client";
import {
  cancelUserOrder,
  fetchUserOrders,
  placeUserOrder,
} from "@/lib/exchange/service";

const orderSchema = z.object({
  symbol: z.string().min(1),
  side: z.enum(["buy", "sell"]),
  type: z.enum(["market", "limit"]),
  amount: z.number().positive(),
  price: z.number().positive().optional(),
  exchange: z.enum(["binance", "coinbase"]).default("binance"),
});

const cancelSchema = z.object({
  orderId: z.string().min(1),
  symbol: z.string().min(1),
  exchange: z.enum(["binance", "coinbase"]).default("binance"),
});

export async function GET(request: Request) {
  const { session, response } = await requireSession();
  if (!session) return response!;

  const { searchParams } = new URL(request.url);
  const exchange = searchParams.get("exchange") ?? "binance";
  const symbol = searchParams.get("symbol") ?? undefined;

  if (!isSupportedExchange(exchange)) {
    return jsonError("Unsupported exchange", 400);
  }

  try {
    const orders = await fetchUserOrders(session.user.id, symbol, exchange);
    return NextResponse.json({ orders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    return jsonError(message, 500);
  }
}

export async function POST(request: Request) {
  const { session, response } = await requireSession();
  if (!session) return response!;

  const body = await request.json();
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Invalid order payload");
  }

  const { exchange, ...order } = parsed.data;

  if (!isSupportedExchange(exchange)) {
    return jsonError("Unsupported exchange", 400);
  }

  if (order.type === "limit" && !order.price) {
    return jsonError("Limit orders require a price");
  }

  try {
    const created = await placeUserOrder(session.user.id, {
      ...order,
      exchangeId: exchange,
    });
    return NextResponse.json({ order: created }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to place order";
    return jsonError(message, 500);
  }
}

export async function DELETE(request: Request) {
  const { session, response } = await requireSession();
  if (!session) return response!;

  const body = await request.json();
  const parsed = cancelSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Invalid cancel payload");
  }

  const { orderId, symbol, exchange } = parsed.data;

  if (!isSupportedExchange(exchange)) {
    return jsonError("Unsupported exchange", 400);
  }

  try {
    const cancelled = await cancelUserOrder(session.user.id, {
      orderId,
      symbol,
      exchangeId: exchange,
    });
    return NextResponse.json({ order: cancelled });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to cancel order";
    return jsonError(message, 500);
  }
}
