---
name: exchange-ccxt
description: >-
  Nexora CCXT exchange layer (connections, encrypted keys, orders, markets). Use
  when working on trading APIs, CCXT, binance/coinbase, order book, balances, or
  src/lib/exchange/** and src/app/api/exchange/**.
---

# Nexora Exchange (CCXT)

## Layout

- Client factories: `src/lib/exchange/client.ts` — public + authenticated CCXT
- Service: `src/lib/exchange/service.ts` — balances, markets, orders, tickers, OHLCV
- Secrets: `src/lib/exchange/encryption.ts` — AES via `ENCRYPTION_KEY` (64 hex chars)
- Types: `src/types/exchange.ts`
- Validation: `src/lib/validations/exchange.ts`
- Routes: `src/app/api/exchange/{connections,balance,markets,orders}/route.ts`
- Public market data: `src/app/api/market/route.ts`
- UI state: `src/stores/trading-store.ts` (Zustand)

## Rules

- Supported exchanges only: `binance`, `coinbase` (`isSupportedExchange`)
- Never store plaintext API keys — encrypt before insert into `exchange_connections`
- Authenticated calls: load connection by `userId` + exchange + `isActive`, decrypt, then CCXT
- Always `enableRateLimit: true` on CCXT instances
- Private routes: `requireSession()` + Zod parse body/query
- Map CCXT tickers/orders to app types in the service layer — keep route handlers thin
- UI form/order chrome state belongs in Zustand; server data via TanStack Query / route handlers

## Security

- `ENCRYPTION_KEY` must stay server-only
- Never log decrypted secrets or raw CCXT credentials
- Validate credentials with `validateExchangeCredentials` before persisting a connection
