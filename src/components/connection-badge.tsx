"use client";

import {cn} from "@/lib/utils";

interface ConnectionBadgeProps {
    connected: boolean;
    className?: string;
}

/**
 * Live/Reconnecting status badge.
 *
 * - Dot: a solid core with a "ping" ring behind it. Ring color + speed
 *   changes with state (slow calm pulse when live, faster amber pulse
 *   while reconnecting) so the two states read differently at a glance.
 * - Label: both strings are stacked in the same grid cell and crossfaded
 *   via opacity, so the badge never "jumps" width and the text change
 *   feels like a transition rather than a swap.
 * - Background/border/text colors transition with `transition-colors`
 *   instead of snapping instantly.
 */
export function ConnectionBadge({connected, className}: ConnectionBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex select-none items-center gap-1.5 rounded-full border px-2.5 py-0.5",
                "text-xs font-medium transition-colors duration-500 ease-out",
                connected
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-transparent bg-secondary text-secondary-foreground",
                className,
            )}
        >
      <span className="relative flex size-1.5 items-center justify-center">
        <span
            className={cn(
                "absolute inline-flex size-full rounded-full opacity-60",
                connected
                    ? "animate-[ping_2.4s_ease-in-out_infinite] bg-primary-foreground"
                    : "animate-[ping_0.9s_ease-in-out_infinite] bg-amber-500",
            )}
        />
        <span
            className={cn(
                "relative inline-flex size-1.5 rounded-full transition-colors duration-500",
                connected ? "bg-primary-foreground" : "bg-amber-500",
            )}
        />
      </span>

      <span className="grid">
        <span
            aria-hidden={!connected}
            className={cn(
                "col-start-1 row-start-1 whitespace-nowrap transition-opacity duration-300",
                connected ? "opacity-100" : "opacity-0",
            )}
        >
          Live
        </span>
        <span
            aria-hidden={connected}
            className={cn(
                "col-start-1 row-start-1 whitespace-nowrap transition-opacity duration-300",
                !connected ? "opacity-100" : "opacity-0",
            )}
        >
          Reconnecting
        </span>
      </span>

      <span role="status" aria-live="polite" className="sr-only">
        {connected ? "Connected" : "Reconnecting"}
      </span>
    </span>
    );
}
