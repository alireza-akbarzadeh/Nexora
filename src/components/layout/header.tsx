"use client";

import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserMenu } from "@/components/layout/user-menu";
import { useWsConnection } from "@/hooks/use-ticker";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Header({ title, subtitle, children }: HeaderProps) {
  const connected = useWsConnection();

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card/60 px-4 backdrop-blur-md">
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

      <div className="flex items-center gap-2">
        <Badge
          variant={connected ? "default" : "secondary"}
          className="hidden sm:inline-flex"
        >
          <span
            className={`mr-1.5 size-1.5 rounded-full ${connected ? "animate-pulse bg-primary-foreground" : "bg-muted-foreground"}`}
          />
          {connected ? "Live" : "Reconnecting"}
        </Badge>

        <UserMenu variant="header" />
      </div>
    </header>
  );
}
