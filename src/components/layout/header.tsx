"use client";

import {Separator} from "@/components/ui/separator";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {NotificationBell} from "@/components/notify/notification-bell";
import {UserMenu} from "@/components/layout/user-menu";
import {ThemeToggle} from "@/components/theme-toggle";
import {useWsConnection} from "@/hooks/use-ticker";
import {cn} from "@/lib/utils";
import React from "react";
import {ConnectionBadge} from "@/components/connection-badge";

interface HeaderProps {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
    className?: string;
}

export function Header({title, subtitle, children, className}: HeaderProps) {
    const connected = useWsConnection();

    return (
        <header
            className={cn(
                "sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2",
                "border-b border-border bg-card/60 px-4 backdrop-blur-md",
                "supports-backdrop-filter:bg-card/40",
                className,
            )}
        >
            <SidebarTrigger className="-ml-1"/>
            <Separator orientation="vertical" className="mr-1 h-4"/>

            <div className="flex min-w-0 flex-1 items-center gap-3">
                {title ? (
                    <div className="min-w-0">
                        <h1 className="truncate text-sm font-semibold tracking-tight">
                            {title}
                        </h1>
                        {subtitle ? (
                            <p className="truncate text-xs text-muted-foreground">
                                {subtitle}
                            </p>
                        ) : null}
                    </div>
                ) : null}
                {children}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
                <ConnectionBadge connected={connected} className="hidden sm:inline-flex"/>
                <UserMenu/>
                <ThemeToggle/>
                <NotificationBell/>
                <Separator orientation="vertical" className="mx-0.5 h-4"/>
            </div>
        </header>
    );
}
