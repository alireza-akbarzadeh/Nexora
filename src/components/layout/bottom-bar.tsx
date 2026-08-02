"use client";

import {cn} from "@/lib/utils";
import {Wifi, WifiOff} from "lucide-react";

export interface TickerItem {
    symbol: string;
    pair?: string;
    changePercent: number;
    price: string;
}

interface BottomBarProps {
    connected: boolean;
    tickers: TickerItem[];
    links?: { label: string; href: string }[];
    className?: string;
}

const DEFAULT_LINKS = [
    {label: "Announcements", href: "/announcements"},
    {label: "Cookie Preference", href: "/legal/cookies"},
    {label: "Online Support", href: "/support"},
];

export function BottomBar({
                              connected,
                              tickers,
                              links = DEFAULT_LINKS,
                              className,
                          }: BottomBarProps) {
    // Duplicate the list so the marquee loops seamlessly (scrolls exactly
    // one copy's width, then resets with no visible seam).
    const marqueeItems = [...tickers, ...tickers];

    return (
        <footer
            className={cn(
                "sticky bottom-0 z-30 flex h-14 shrink-0 items-center gap-2 border-t",
                "border-b border-border bg-card/60 px-4 backdrop-blur-md",
                "supports-backdrop-filter:bg-card/40",
                className,
            )}
        >
            {/* Connection status */}
            <div className="flex shrink-0 items-center gap-1.5">
                {connected ? (
                    <Wifi className="size-3.5 text-emerald-500"/>
                ) : (
                    <WifiOff className="size-3.5 text-destructive"/>
                )}
                <span className={cn(!connected && "text-destructive")}>
          {connected ? "Connected" : "Disconnected"}
        </span>
            </div>

            <div className="h-4 w-px shrink-0 bg-border"/>

            {/* Scrolling ticker marquee */}
            <div className="group relative min-w-0 flex-1 overflow-hidden">
                <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-card to-transparent"/>
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-card to-transparent"/>

                <div
                    className="animate-marquee flex w-max items-center gap-6 group-hover:[animation-play-state:paused]">
                    {marqueeItems.map((t, i) => (
                        <TickerEntry key={`${t.symbol}-${i}`} item={t}/>
                    ))}
                </div>
            </div>

            <div className="h-4 w-px shrink-0 bg-border"/>

            {/* Footer links */}
            <nav className="flex shrink-0 items-center gap-3">
                {links.map((link, i) => (
                    <span key={link.href} className="flex items-center gap-3">
            {i > 0 && <span className="text-border">|</span>}
                        <a
                            href={link.href}
                            className="whitespace-nowrap transition-colors hover:text-foreground"
                        >
              {link.label}
            </a>
          </span>
                ))}
            </nav>

            <style jsx>{`
                @keyframes marquee {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }

                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </footer>
    );
}

function TickerEntry({item}: { item: TickerItem }) {
    const positive = item.changePercent >= 0;
    return (
        <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
      <span className="font-medium text-foreground">
        {item.pair ?? item.symbol}
      </span>
            <span className={positive ? "text-emerald-500" : "text-red-500"}>
        {positive ? "+" : ""}
                {item.changePercent.toFixed(2)}%
      </span>
            <span>{item.price}</span>
        </div>
    );
}
