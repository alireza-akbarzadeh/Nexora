"use client"

import { playNotifySound } from "@/lib/notify/sounds"
import type {
  NotifyOptions,
  NotifySound,
  NotifyToast,
  NotifyVariant,
  OrderNotifyInput,
} from "@/lib/notify/types"
import { useNotifyStore } from "@/stores/notify-store"

const DEFAULT_DURATION = 4500

const variantSound: Record<NotifyVariant, NotifySound> = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
  order: "order",
}

function createId() {
  return `ntf_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function emit(title: string, options: NotifyOptions = {}): string {
  const variant = options.variant ?? "info"
  const sound = options.sound ?? variantSound[variant]
  const duration = options.duration ?? DEFAULT_DURATION

  const toast: NotifyToast = {
    id: createId(),
    title,
    description: options.description,
    variant,
    sound,
    duration,
    createdAt: Date.now(),
    action: options.action,
  }

  const { push, soundEnabled } = useNotifyStore.getState()
  push(toast)

  if (soundEnabled && sound !== "none") {
    playNotifySound(sound)
  }

  return toast.id
}

function formatOrderTitle(input: OrderNotifyInput): string {
  const status = input.status ?? "placed"
  const side = input.side.toUpperCase()
  switch (status) {
    case "filled":
      return `${side} filled · ${input.symbol}`
    case "cancelled":
      return `Order cancelled · ${input.symbol}`
    case "rejected":
      return `Order rejected · ${input.symbol}`
    default:
      return `${side} order placed · ${input.symbol}`
  }
}

function formatOrderDescription(input: OrderNotifyInput): string {
  const parts = [
    `${input.amount} ${String(input.symbol).split("/")[0] ?? ""}`.trim(),
    input.type ? input.type.toUpperCase() : null,
    input.price != null && input.price !== "" ? `@ ${input.price}` : null,
  ].filter(Boolean)
  return parts.join(" · ")
}

/**
 * Imperative notification API — safe to call from mutations, handlers, stores.
 *
 * @example
 * notify.success("Saved")
 * notify.error("Failed", { description: err.message })
 * notify.order({ side: "buy", symbol: "BTC/USDT", amount: 0.01, type: "limit", price: 64000 })
 */
export const notify = Object.assign(
  (title: string, options?: NotifyOptions) => emit(title, options),
  {
    success: (title: string, options?: Omit<NotifyOptions, "variant">) =>
      emit(title, { ...options, variant: "success" }),
    error: (title: string, options?: Omit<NotifyOptions, "variant">) =>
      emit(title, { ...options, variant: "error" }),
    warning: (title: string, options?: Omit<NotifyOptions, "variant">) =>
      emit(title, { ...options, variant: "warning" }),
    info: (title: string, options?: Omit<NotifyOptions, "variant">) =>
      emit(title, { ...options, variant: "info" }),
    order: (input: OrderNotifyInput, options?: Omit<NotifyOptions, "variant">) => {
      const status = input.status ?? "placed"
      const sound: NotifySound =
        options?.sound ??
        (status === "filled" ? "fill" : status === "rejected" ? "error" : "order")
      return emit(formatOrderTitle(input), {
        ...options,
        variant: status === "rejected" ? "error" : "order",
        sound,
        description: options?.description ?? formatOrderDescription(input),
      })
    },
    dismiss: (id: string) => useNotifyStore.getState().dismiss(id),
    dismissAll: () => useNotifyStore.getState().dismissAll(),
    markAllRead: () => useNotifyStore.getState().markAllRead(),
    clearHistory: () => useNotifyStore.getState().clearHistory(),
    setSoundEnabled: (enabled: boolean) =>
      useNotifyStore.getState().setSoundEnabled(enabled),
  },
)

export type { NotifyOptions, NotifyVariant, NotifySound, OrderNotifyInput }
