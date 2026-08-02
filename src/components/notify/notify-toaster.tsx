"use client"

import { useEffect } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  TrendingUp,
  X,
  XCircle,
} from "lucide-react"

import type { NotifyToast, NotifyVariant } from "@/lib/notify/types"
import { cn } from "@/lib/utils"
import { useNotifyStore } from "@/stores/notify-store"

const variantStyles: Record<
  NotifyVariant,
  { ring: string; iconWrap: string; Icon: typeof Info }
> = {
  success: {
    ring: "ring-profit/30",
    iconWrap: "bg-profit/15 text-profit",
    Icon: CheckCircle2,
  },
  error: {
    ring: "ring-destructive/25",
    iconWrap: "bg-destructive/15 text-destructive",
    Icon: XCircle,
  },
  warning: {
    ring: "ring-amber-400/30",
    iconWrap: "bg-amber-400/15 text-amber-300",
    Icon: AlertTriangle,
  },
  info: {
    ring: "ring-violet/30",
    iconWrap: "bg-violet/15 text-violet",
    Icon: Info,
  },
  order: {
    ring: "ring-lime/30",
    iconWrap: "bg-lime/15 text-lime",
    Icon: TrendingUp,
  },
}

function NotifyToastItem({ toast }: { toast: NotifyToast }) {
  const dismiss = useNotifyStore((s) => s.dismiss)
  const style = variantStyles[toast.variant]
  const Icon = style.Icon

  useEffect(() => {
    if (toast.duration <= 0) return
    const timer = window.setTimeout(() => dismiss(toast.id), toast.duration)
    return () => window.clearTimeout(timer)
  }, [toast.duration, toast.id, dismiss])

  return (
    <div
      role="status"
      aria-live={toast.variant === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl px-4 py-3.5",
        "bg-card/95 shadow-[var(--shadow-elevated)] ring-1 backdrop-blur-xl",
        "animate-in fade-in-0 slide-in-from-top-3 duration-300",
        style.ring,
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg",
          style.iconWrap,
        )}
      >
        <Icon className="size-4" aria-hidden />
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-medium tracking-tight text-foreground">
          {toast.title}
        </p>
        {toast.description ? (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {toast.description}
          </p>
        ) : null}
        {toast.action ? (
          <button
            type="button"
            className="mt-2 text-xs font-medium text-primary underline-offset-2 hover:underline"
            onClick={() => {
              toast.action?.onClick()
              dismiss(toast.id)
            }}
          >
            {toast.action.label}
          </button>
        ) : null}
      </div>

      <button
        type="button"
        aria-label="Dismiss notification"
        className="mt-0.5 rounded-md p-1 text-muted-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
        onClick={() => dismiss(toast.id)}
      >
        <X className="size-3.5" aria-hidden />
      </button>
    </div>
  )
}

export function NotifyToaster() {
  const toasts = useNotifyStore((s) => s.toasts)

  if (toasts.length === 0) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[110] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <NotifyToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
