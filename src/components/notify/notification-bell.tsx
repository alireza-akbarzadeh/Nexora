"use client"

import {useRouter} from "next/navigation"
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Info,
  Settings,
  Trash2,
  TrendingUp,
  Volume2,
  VolumeX,
  X,
  XCircle,
} from "lucide-react"

import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import type {NotifyVariant} from "@/lib/notify/types"
import {cn} from "@/lib/utils"
import {type NotifyHistoryItem, useNotifyStore,} from "@/stores/notify-store"

const variantMeta: Record<
    NotifyVariant,
    { iconWrap: string; Icon: typeof Info }
> = {
    success: {
        iconWrap: "bg-profit/15 text-profit",
        Icon: CheckCircle2,
    },
    error: {
        iconWrap: "bg-destructive/15 text-destructive",
        Icon: XCircle,
    },
    warning: {
        iconWrap: "bg-amber-400/15 text-amber-300",
        Icon: AlertTriangle,
    },
    info: {
        iconWrap: "bg-violet/15 text-violet",
        Icon: Info,
    },
    order: {
        iconWrap: "bg-lime/15 text-lime",
        Icon: TrendingUp,
    },
}

function formatRelativeTime(createdAt: number) {
    const seconds = Math.max(0, Math.floor((Date.now() - createdAt) / 1000))
    if (seconds < 60) return "Just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
}

function HistoryRow({
                        item,
                        onRead,
                        onRemove,
                    }: {
    item: NotifyHistoryItem
    onRead: (id: string) => void
    onRemove: (id: string) => void
}) {
    const meta = variantMeta[item.variant]
    const Icon = meta.Icon

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onRead(item.id)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onRead(item.id)
                }
            }}
            className={cn(
                "group flex w-full items-start gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors",
                "hover:bg-muted/60",
                !item.read && "bg-primary/5",
            )}
        >
            <div
                className={cn(
                    "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg",
                    meta.iconWrap,
                )}
            >
                <Icon className="size-3.5" aria-hidden/>
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-start gap-2">
                    <p className="min-w-0 flex-1 text-sm font-medium leading-snug tracking-tight">
                        {item.title}
                    </p>
                    {!item.read ? (
                        <span
                            className="mt-1 size-1.5 shrink-0 rounded-full bg-primary"
                            aria-label="Unread"
                        />
                    ) : null}
                </div>
                {item.description ? (
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                    </p>
                ) : null}
                <p className="mt-1 text-[10px] text-muted-foreground/80">
                    {formatRelativeTime(item.createdAt)}
                </p>
            </div>

            <button
                type="button"
                aria-label="Remove notification"
                className="mt-0.5 rounded-md p-1 text-muted-foreground/0 transition-colors group-hover:text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={(e) => {
                    e.stopPropagation()
                    onRemove(item.id)
                }}
            >
                <X className="size-3.5" aria-hidden/>
            </button>
        </div>
    )
}

export function NotificationBell() {
    const router = useRouter()
    const history = useNotifyStore((s) => s.history)
    const unreadCount = useNotifyStore((s) => s.unreadCount)
    const soundEnabled = useNotifyStore((s) => s.soundEnabled)
    const markAllRead = useNotifyStore((s) => s.markAllRead)
    const markRead = useNotifyStore((s) => s.markRead)
    const removeFromHistory = useNotifyStore((s) => s.removeFromHistory)
    const clearHistory = useNotifyStore((s) => s.clearHistory)
    const setSoundEnabled = useNotifyStore((s) => s.setSoundEnabled)

    const badgeLabel =
        unreadCount > 99 ? "99+" : unreadCount > 0 ? String(unreadCount) : null

    return (
        <DropdownMenu
            onOpenChange={(open) => {
                if (open && unreadCount > 0) markAllRead()
            }}
        >
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={
                            unreadCount > 0
                                ? `Notifications, ${unreadCount} unread`
                                : "Notifications"
                        }
                        className={cn(
                            "size-9 border-border/60 bg-background/60 shadow-sm relative",
                            "transition-all hover:bg-accent hover:border-border",
                            "focus-visible:ring-1 focus-visible:ring-primary/30",
                        )}
                    >
                        <Bell className="size-4"/>
                        {badgeLabel ? (
                            <span
                                className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground tabular-nums shadow-sm ring-2 ring-card">
                {badgeLabel}
              </span>
                        ) : null}
                    </Button>
                }
            />

            <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-[min(100vw-1.5rem,22rem)] p-0"
            >
                <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2.5">
                    <div>
                        <p className="text-sm font-semibold tracking-tight">Notifications</p>
                        <p className="text-[11px] text-muted-foreground">
                            {history.length === 0
                                ? "You're all caught up"
                                : `${history.length} recent · alerts stay here after toasts`}
                        </p>
                    </div>
                    <div className="flex items-center gap-0.5">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={soundEnabled ? "Mute alert sounds" : "Unmute alert sounds"}
                            onClick={() => setSoundEnabled(!soundEnabled)}
                        >
                            {soundEnabled ? (
                                <Volume2 className="size-3.5"/>
                            ) : (
                                <VolumeX className="size-3.5"/>
                            )}
                        </Button>
                        {history.length > 0 ? (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                aria-label="Clear all notifications"
                                onClick={clearHistory}
                            >
                                <Trash2 className="size-3.5"/>
                            </Button>
                        ) : null}
                    </div>
                </div>

                <div className="max-h-80 overflow-y-auto p-1.5">
                    {history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
                            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                                <Bell className="size-4 text-muted-foreground"/>
                            </div>
                            <p className="text-sm font-medium">No notifications yet</p>
                            <p className="text-xs text-muted-foreground">
                                Order fills, errors, and system alerts will show up here.
                            </p>
                        </div>
                    ) : (
                        history.map((item) => (
                            <HistoryRow
                                key={item.id}
                                item={item}
                                onRead={markRead}
                                onRemove={removeFromHistory}
                            />
                        ))
                    )}
                </div>

                <div className="border-t border-border p-1.5">
                    <Button
                        type="button"
                        variant="ghost"
                        className="h-8 w-full justify-start gap-2 text-xs"
                        onClick={() => router.push("/settings")}
                    >
                        <Settings className="size-3.5"/>
                        Notification settings
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
