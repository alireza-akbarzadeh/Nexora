---
name: notify
description: >-
  Nexora toast + sound notification system. Use when adding user feedback for
  orders, fills, errors, success/warning alerts, exchange connect, or any
  client-side notify()/notify.order() call. Covers src/lib/notify/**,
  NotifyProvider, and sound prefs.
---

# Nexora Notify

Reusable in-app toasts with trading-terminal alert sounds (Web Audio, no asset files).

## Layout

| Piece | Path |
|-------|------|
| Public API | `src/lib/notify/index.ts` → `notify` |
| Types | `src/lib/notify/types.ts` |
| Sounds | `src/lib/notify/sounds.ts` |
| Store | `src/stores/notify-store.ts` (Zustand + persist sound pref) |
| UI | `src/components/notify/notify-provider.tsx`, `notify-toaster.tsx` |
| Prefs UI | `src/components/settings/notification-settings.tsx` |

`NotifyProvider` is already mounted in `src/components/providers.tsx`. Do **not** remount it per page.

## Usage (client only)

```ts
import { notify } from "@/lib/notify"

// Generic
notify("Hello", { description: "Optional detail", variant: "info" })

// Shortcuts
notify.success("Saved")
notify.error("Failed", { description: err.message })
notify.warning("Rate limited")
notify.info("Syncing balances…")

// Trading helper (preferred for orders)
notify.order({
  side: "buy",
  symbol: "BTC/USDT",
  amount: "0.01",
  type: "limit",
  price: "64000",
  status: "placed", // placed | filled | cancelled | rejected
})

// Controls
notify.dismiss(id)
notify.dismissAll()
notify.setSoundEnabled(false)
```

### Options

- `description` — secondary line
- `variant` — `success` | `error` | `warning` | `info` | `order`
- `sound` — override: `success` | `error` | `warning` | `info` | `order` | `fill` | `none`
- `duration` — ms (default `4500`; `0` = sticky)
- `action` — `{ label, onClick }`

## Rules

- Call from **client** code only (mutations, handlers, `"use client"` components). Never from RSC or API routes.
- Prefer `notify.order(...)` for place/fill/cancel/reject; use `notify.error` for API failures.
- Prefer notify over ad-hoc inline status text for transient feedback; keep form field errors for validation.
- Respect `soundEnabled` from the store — the API already does; do not call `playNotifySound` directly from features.
- Do not add Sonner/react-hot-toast — this is the project notification system.

## When implementing features

If a user action has a clear outcome (order, connect exchange, save settings, copy key, WS reconnect), fire a notify:

| Event | Call |
|-------|------|
| Order placed | `notify.order({ ..., status: "placed" })` |
| Order filled | `notify.order({ ..., status: "filled" })` → plays `fill` sound |
| Order rejected / API error | `notify.error(...)` or `status: "rejected"` |
| Exchange connected | `notify.success("Exchange connected", { description })` |
| Silent toast | `sound: "none"` |
