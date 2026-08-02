"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationBell } from "@/components/notify/notification-bell";
import { UserMenu } from "@/components/layout/user-menu";
import { useWsConnection } from "@/hooks/use-ticker";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Header({ title, subtitle, children, className }: HeaderProps) {
  const connected = useWsConnection();

  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card/60 px-4 backdrop-blur-md",
        className,
      )}
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-4" />

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
        <Badge
          variant={connected ? "default" : "secondary"}
          className="hidden sm:inline-flex"
        >
          <span
            className={cn(
              "mr-1.5 size-1.5 rounded-full",
              connected
                ? "animate-pulse bg-primary-foreground"
                : "bg-muted-foreground",
            )}
          />
          {connected ? "Live" : "Reconnecting"}
        </Badge>

        <NotificationBell />
        <UserMenu variant="header" />
      </div>
    </header>
  );
}
