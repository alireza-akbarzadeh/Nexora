"use client";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

import { authClient } from "@/lib/auth/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useWsConnection } from "@/hooks/use-ticker";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Header({ title, subtitle, children }: HeaderProps) {
  const router = useRouter();
  const connected = useWsConnection();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

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
            className={`mr-1.5 size-1.5 rounded-full ${connected ? "bg-primary-foreground animate-pulse" : "bg-muted-foreground"}`}
          />
          {connected ? "Live" : "Reconnecting"}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" className="rounded-full">
                <Avatar className="size-7">
                  <AvatarFallback className="bg-secondary text-xs">
                    <User className="size-3.5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <User className="h-4 w-4" />
              Account settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
