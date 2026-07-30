# WebSocket Market Data

> 26 nodes · cohesion 0.15

## Key Concepts

- **SignalingManager** (16 connections) — `src/lib/websocket/signaling-manager.ts`
- **signaling-manager.ts** (14 connections) — `src/lib/websocket/signaling-manager.ts`
- **Ticker** (9 connections) — `src/types/exchange.ts`
- **OrderBook** (8 connections) — `src/types/exchange.ts`
- **.connect()** (7 connections) — `src/lib/websocket/signaling-manager.ts`
- **toBinanceSymbol()** (6 connections) — `src/lib/utils.ts`
- **.subscribe()** (6 connections) — `src/lib/websocket/signaling-manager.ts`
- **.subscribeOrderBook()** (5 connections) — `src/lib/websocket/signaling-manager.ts`
- **.subscribeTicker()** (5 connections) — `src/lib/websocket/signaling-manager.ts`
- **.fetchDepthFallback()** (4 connections) — `src/lib/websocket/signaling-manager.ts`
- **.fetchTickerFallback()** (4 connections) — `src/lib/websocket/signaling-manager.ts`
- **.handlePayload()** (4 connections) — `src/lib/websocket/signaling-manager.ts`
- **.normalizeOrderBook()** (3 connections) — `src/lib/websocket/signaling-manager.ts`
- **.normalizeTicker()** (3 connections) — `src/lib/websocket/signaling-manager.ts`
- **.syncSubscriptions()** (3 connections) — `src/lib/websocket/signaling-manager.ts`
- **TickerBarProps** (2 connections) — `src/components/trading/ticker-bar.tsx`
- **.inferStream()** (2 connections) — `src/lib/websocket/signaling-manager.ts`
- **.notifyConnection()** (2 connections) — `src/lib/websocket/signaling-manager.ts`
- **.scheduleReconnect()** (2 connections) — `src/lib/websocket/signaling-manager.ts`
- **.stopPolling()** (2 connections) — `src/lib/websocket/signaling-manager.ts`
- **OrderBookLevel** (2 connections) — `src/types/exchange.ts`
- **BinanceDepthMessage** (1 connections) — `src/lib/websocket/signaling-manager.ts`
- **BinanceTickerMessage** (1 connections) — `src/lib/websocket/signaling-manager.ts`
- **.onConnectionChange()** (1 connections) — `src/lib/websocket/signaling-manager.ts`
- **StreamCallback** (1 connections) — `src/lib/websocket/signaling-manager.ts`
- *... and 1 more nodes in this community*

## Relationships

- [Dashboard Pages](Dashboard_Pages.md) (15 shared connections)
- [Exchange API Routes](Exchange_API_Routes.md) (1 shared connections)

## Source Files

- `src/components/trading/ticker-bar.tsx`
- `src/lib/utils.ts`
- `src/lib/websocket/signaling-manager.ts`
- `src/types/exchange.ts`

## Audit Trail

- EXTRACTED: 114 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*