import ccxt, { type Exchange } from "ccxt";

import type { ExchangeId } from "@/types/exchange";

const SUPPORTED_EXCHANGES: ExchangeId[] = ["binance", "coinbase"];

export function isSupportedExchange(exchange: string): exchange is ExchangeId {
  return SUPPORTED_EXCHANGES.includes(exchange as ExchangeId);
}

export function createPublicExchange(exchangeId: ExchangeId = "binance"): Exchange {
  const ExchangeClass = ccxt[exchangeId];
  if (!ExchangeClass) {
    throw new Error(`Unsupported exchange: ${exchangeId}`);
  }

  return new ExchangeClass({
    enableRateLimit: true,
  });
}

export function createAuthenticatedExchange(
  exchangeId: ExchangeId,
  apiKey: string,
  apiSecret: string,
): Exchange {
  const ExchangeClass = ccxt[exchangeId];
  if (!ExchangeClass) {
    throw new Error(`Unsupported exchange: ${exchangeId}`);
  }

  return new ExchangeClass({
    apiKey,
    secret: apiSecret,
    enableRateLimit: true,
  });
}

export async function validateExchangeCredentials(
  exchangeId: ExchangeId,
  apiKey: string,
  apiSecret: string,
): Promise<void> {
  const exchange = createAuthenticatedExchange(exchangeId, apiKey, apiSecret);
  await exchange.loadMarkets();
  await exchange.fetchBalance();
}
