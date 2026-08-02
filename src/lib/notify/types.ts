export type NotifyVariant =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "order"

export type NotifySound =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "order"
  | "fill"
  | "none"

export interface NotifyOptions {
  /** Secondary line under the title */
  description?: string
  /** Visual + default sound variant. Default: info */
  variant?: NotifyVariant
  /** Override auto sound. Pass "none" for silent. */
  sound?: NotifySound
  /** Auto-dismiss ms. Default 4500. Pass 0 to keep until dismissed. */
  duration?: number
  /** Optional action button */
  action?: {
    label: string
    onClick: () => void
  }
}

export interface NotifyToast {
  id: string
  title: string
  description?: string
  variant: NotifyVariant
  sound: NotifySound
  duration: number
  createdAt: number
  action?: NotifyOptions["action"]
}

export interface OrderNotifyInput {
  side: "buy" | "sell"
  symbol: string
  amount: string | number
  type?: "market" | "limit"
  price?: string | number
  /** "placed" (default) or "filled" */
  status?: "placed" | "filled" | "cancelled" | "rejected"
}
