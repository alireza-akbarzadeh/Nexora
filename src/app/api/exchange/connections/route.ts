import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "crypto";

import { jsonError, requireSession } from "@/lib/api/auth-guard";
import { db, exchangeConnections } from "@/lib/db";
import {
  isSupportedExchange,
  validateExchangeCredentials,
} from "@/lib/exchange/client";
import { encryptSecret } from "@/lib/exchange/encryption";

const connectionSchema = z.object({
  exchange: z.enum(["binance", "coinbase"]),
  apiKey: z.string().min(1),
  apiSecret: z.string().min(1),
  label: z.string().optional(),
});

export async function GET() {
  const { session, response } = await requireSession();
  if (!session) return response!;

  const connections = await db
    .select({
      id: exchangeConnections.id,
      exchange: exchangeConnections.exchange,
      label: exchangeConnections.label,
      isActive: exchangeConnections.isActive,
      createdAt: exchangeConnections.createdAt,
    })
    .from(exchangeConnections)
    .where(eq(exchangeConnections.userId, session.user.id));

  return NextResponse.json({
    connections: connections.map((connection) => ({
      ...connection,
      createdAt: connection.createdAt.toISOString(),
    })),
  });
}

export async function POST(request: Request) {
  const { session, response } = await requireSession();
  if (!session) return response!;

  const body = await request.json();
  const parsed = connectionSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Invalid connection payload");
  }

  const { exchange, apiKey, apiSecret, label } = parsed.data;

  if (!isSupportedExchange(exchange)) {
    return jsonError("Unsupported exchange", 400);
  }

  try {
    await validateExchangeCredentials(exchange, apiKey, apiSecret);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid exchange credentials";
    return jsonError(message, 400);
  }

  const existing = await db
    .select()
    .from(exchangeConnections)
    .where(eq(exchangeConnections.userId, session.user.id));

  const sameExchange = existing.find((item) => item.exchange === exchange);

  if (sameExchange) {
    await db
      .update(exchangeConnections)
      .set({
        encryptedApiKey: encryptSecret(apiKey),
        encryptedApiSecret: encryptSecret(apiSecret),
        label: label ?? sameExchange.label,
        isActive: true,
        updatedAt: new Date(),
      })
      .where(eq(exchangeConnections.id, sameExchange.id));
  } else {
    await db.insert(exchangeConnections).values({
      id: randomUUID(),
      userId: session.user.id,
      exchange,
      encryptedApiKey: encryptSecret(apiKey),
      encryptedApiSecret: encryptSecret(apiSecret),
      label: label ?? `${exchange} connection`,
      isActive: true,
    });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function PATCH(request: Request) {
  const { session, response } = await requireSession();
  if (!session) return response!;

  const body = await request.json();
  const parsed = z
    .object({
      id: z.string().min(1),
      isActive: z.boolean(),
    })
    .safeParse(body);

  if (!parsed.success) {
    return jsonError("Invalid update payload");
  }

  const [connection] = await db
    .select()
    .from(exchangeConnections)
    .where(eq(exchangeConnections.id, parsed.data.id))
    .limit(1);

  if (!connection || connection.userId !== session.user.id) {
    return jsonError("Connection not found", 404);
  }

  await db
    .update(exchangeConnections)
    .set({
      isActive: parsed.data.isActive,
      updatedAt: new Date(),
    })
    .where(eq(exchangeConnections.id, parsed.data.id));

  return NextResponse.json({ success: true });
}
