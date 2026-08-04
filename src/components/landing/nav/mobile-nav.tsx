"use client";

import Link from "next/link";
import { LayoutDashboard, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MEGA_SECTIONS } from "@/lib/landing/nav-menu";

import { MegaListItem } from "./mega-list-item";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAuthenticated: boolean;
  isPending: boolean;
};

export function MobileNav({
  open,
  onOpenChange,
  isAuthenticated,
  isPending,
}: MobileNavProps) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
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
              <p className="mb-1 px-2.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                {section.label}
              </p>

              {section.columns.map((column, index) => (
                <div key={`${section.id}-m-${index}`}>
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

        <MobileNavFooter
          isAuthenticated={isAuthenticated}
          isPending={isPending}
          onNavigate={close}
        />
      </SheetContent>
    </Sheet>
  );
}

function MobileNavFooter({
  isAuthenticated,
  isPending,
  onNavigate,
}: {
  isAuthenticated: boolean;
  isPending: boolean;
  onNavigate: () => void;
}) {
  return (
    <div className="mt-auto space-y-2 border-t border-border p-4">
      {isPending ? (
        <div className="h-9 animate-pulse rounded-xl bg-muted" />
      ) : isAuthenticated ? (
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 rounded-xl bg-muted px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-muted/80"
        >
          <LayoutDashboard className="size-4" aria-hidden />
          Dashboard
        </Link>
      ) : (
        <>
          <Link
            href="/login"
            onClick={onNavigate}
            className="flex items-center justify-center rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            onClick={onNavigate}
            className="gradient-primary glow-primary flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Get Started
          </Link>
        </>
      )}
    </div>
  );
}
