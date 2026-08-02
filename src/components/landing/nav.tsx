"use client";

import Link from "next/link";
import { ChevronDown, LayoutDashboard, Menu } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { NotificationBell } from "@/components/notify/notification-bell";
import { UserMenu } from "@/components/layout/user-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth/client";
import {
  coinPricePath,
  getAllCoins,
  type CoinInfo,
} from "@/lib/coins/catalog";
import {
  MEGA_SECTIONS,
  type MegaNavItem,
  type MegaNavSection,
} from "@/lib/landing/nav-menu";
import { cn } from "@/lib/utils";

import { NexoraLogo } from "./shared/nexora-logo";

function hotCoins(): CoinInfo[] {
  const all = getAllCoins();
  const hot = all.filter((c) => c.hot);
  return (hot.length > 0 ? hot : all).slice(0, 6);
}

function MegaListItem({
  item,
  onNavigate,
}: {
  item: MegaNavItem;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group/item flex gap-3 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-muted/70"
    >
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {item.title}
          </span>
          {item.badge ? (
            <Badge
              variant="default"
              className="h-4 rounded px-1.5 text-[10px] font-semibold"
            >
              {item.badge}
            </Badge>
          ) : null}
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
          {item.description}
        </span>
      </span>
    </Link>
  );
}

function MegaFlyout({ section }: { section: MegaNavSection }) {
  const panelId = useId();

  return (
    <div className="group relative">
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 text-sm transition-colors",
          "text-muted-foreground hover:text-foreground",
          "group-hover:text-primary group-focus-within:text-primary",
        )}
        aria-haspopup="true"
        aria-controls={panelId}
      >
        {section.label}
        <ChevronDown
          className={cn(
            "size-3.5 opacity-70 transition-transform duration-200",
            "group-hover:rotate-180 group-focus-within:rotate-180",
          )}
        />
      </button>

      {/* Bridge so the pointer can move into the panel without closing */}
      <div
        id={panelId}
        role="menu"
        className={cn(
          "invisible absolute top-full left-0 z-50 pt-3 opacity-0",
          "transition-[opacity,visibility] duration-150",
          "group-hover:visible group-hover:opacity-100",
          "group-focus-within:visible group-focus-within:opacity-100",
        )}
      >
        <div
          className={cn(
            "overflow-hidden rounded-xl bg-card/95 text-card-foreground shadow-(--shadow-elevated) ring-1 ring-border backdrop-blur-xl",
            section.wide ? "w-[min(92vw,36rem)]" : "w-[min(92vw,22rem)]",
          )}
        >
          <div
            className={cn(
              "grid gap-1 p-2",
              section.wide && section.columns.length > 1
                ? "sm:grid-cols-2"
                : "grid-cols-1",
            )}
          >
            {section.columns.map((column, colIdx) => (
              <div
                key={`${section.id}-${column.heading ?? colIdx}`}
                className={cn(
                  colIdx > 0 && section.wide && "sm:border-l sm:border-border",
                )}
              >
                {column.heading ? (
                  <p className="px-2.5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {column.heading}
                  </p>
                ) : null}
                <div className="space-y-0.5">
                  {column.items.map((item) => (
                    <MegaListItem key={`${item.title}-${item.href}`} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {section.id === "markets" ? (
            <div className="border-t border-border p-2">
              <p className="px-2.5 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Popular prices
              </p>
              <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-3">
                {hotCoins().map((coin) => (
                  <Link
                    key={coin.slug}
                    href={coinPricePath(coin)}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-muted/70"
                  >
                    <span
                      className="flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                      style={{
                        background: `${coin.color}22`,
                        color: coin.color,
                      }}
                    >
                      {coin.symbol.slice(0, 2)}
                    </span>
                    <span className="truncate font-medium text-foreground">
                      {coin.symbol}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MobileNav({
  open,
  onOpenChange,
  isAuthenticated,
  isPending,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAuthenticated: boolean;
  isPending: boolean;
}) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        }
      />
      <SheetContent side="right" className="w-[min(100vw,22rem)] gap-0 p-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigate Nexora</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-2 py-3">
          {MEGA_SECTIONS.map((section) => (
            <div key={section.id} className="mb-4">
              <p className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {section.label}
              </p>
              {section.columns.map((column, colIdx) => (
                <div key={`${section.id}-m-${colIdx}`}>
                  {column.heading ? (
                    <p className="px-2.5 py-1 text-[10px] font-medium text-muted-foreground/80">
                      {column.heading}
                    </p>
                  ) : null}
                  {column.items.map((item) => (
                    <MegaListItem
                      key={`m-${item.title}-${item.href}`}
                      item={item}
                      onNavigate={close}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-2 border-t border-border p-4">
          {isPending ? (
            <div className="h-9 animate-pulse rounded-xl bg-muted" />
          ) : isAuthenticated ? (
            <Link
              href="/dashboard"
              onClick={close}
              className="flex items-center justify-center gap-2 rounded-xl bg-muted px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted/80"
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                onClick={close}
                className="flex items-center justify-center rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={close}
                className="gradient-primary glow-primary flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = Boolean(session?.user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-5 py-3 transition-all",
            scrolled && "glass-strong",
          )}
        >
          <NexoraLogo />

          <nav className="hidden items-center gap-6 lg:flex">
            {MEGA_SECTIONS.map((section) => (
              <MegaFlyout key={section.id} section={section} />
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {isPending ? (
              <div className="h-9 w-24 animate-pulse rounded-xl bg-white/5" />
            ) : isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
                <NotificationBell />
                <UserMenu variant="header" />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="gradient-primary glow-primary hidden rounded-xl px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.02] hover:opacity-90 sm:inline-flex"
                >
                  Get Started
                </Link>
              </>
            )}

            <MobileNav
              open={mobileOpen}
              onOpenChange={setMobileOpen}
              isAuthenticated={isAuthenticated}
              isPending={isPending}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
