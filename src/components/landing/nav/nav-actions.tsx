import Link from "next/link";

import { UserMenu } from "@/components/layout/user-menu";
import { NotificationBell } from "@/components/notify/notification-bell";

type NavActionsProps = {
  isAuthenticated: boolean;
  isPending: boolean;
};

/** Right-hand cluster of the desktop nav: session state or sign-in CTAs. */
export function NavActions({ isAuthenticated, isPending }: NavActionsProps) {
  if (isPending) {
    return <div className="h-9 w-24 animate-pulse rounded-xl bg-white/5" />;
  }

  if (isAuthenticated) {
    return (
      <>
        <NotificationBell />
        <UserMenu />
      </>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="hidden px-4 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground sm:inline-flex"
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className="gradient-primary glow-primary hidden rounded-xl px-4 py-2 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97] sm:inline-flex"
      >
        Get Started
      </Link>
    </>
  );
}
