"use client";

import { CloudOff, Wifi, WifiOff } from "lucide-react";

import { useNetworkStatus } from "@/hooks/use-network-status";
import { cn } from "@/lib/utils";

export function NetworkStatusToast() {
  const { status, isHydrated } = useNetworkStatus();

  if (!isHydrated || status === "online") return null;

  const offline = status === "offline";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center p-4 sm:bottom-6 sm:p-0"
    >
      <div
        className={cn(
          "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl px-4 py-3.5 shadow-[var(--shadow-elevated)] ring-1 backdrop-blur-xl",
          "animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
          offline
            ? "bg-card/95 ring-destructive/25"
            : "bg-card/95 ring-profit/30",
        )}
      >
        <div
          className={cn(
            "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg",
            offline
              ? "bg-destructive/15 text-destructive"
              : "bg-profit/15 text-profit",
          )}
        >
          {offline ? (
            <WifiOff className="size-4" aria-hidden />
          ) : (
            <Wifi className="size-4" aria-hidden />
          )}
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium tracking-tight text-foreground">
            {offline ? "You're offline" : "Back online"}
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {offline
              ? "Live prices and orders pause until your connection returns."
              : "Connection restored. Syncing your markets again."}
          </p>
        </div>

        {offline ? (
          <CloudOff
            className="mt-1 size-3.5 shrink-0 text-muted-foreground/60"
            aria-hidden
          />
        ) : (
          <span
            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-profit animate-pulse"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
