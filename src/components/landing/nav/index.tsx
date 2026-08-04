"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useState } from "react";

import { useScrolled } from "@/hooks/use-scrolled";
import { authClient } from "@/lib/auth/client";
import { MEGA_SECTIONS } from "@/lib/landing/nav-menu";
import { EASE_OUT } from "@/lib/motion/easing";
import { cn } from "@/lib/utils";

import { NexoraLogo } from "../shared/nexora-logo";
import { MegaFlyout } from "./mega-flyout";
import { MobileNav } from "./mobile-nav";
import { NavActions } from "./nav-actions";

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = Boolean(session?.user);

  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <ScrollProgress />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className={cn(
            "flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500",
            scrolled && "glass-strong shadow-[var(--shadow-elevated)]",
          )}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <NexoraLogo />

          <nav className="hidden items-center gap-6 lg:flex">
            {MEGA_SECTIONS.map((section) => (
              <MegaFlyout key={section.id} section={section} />
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <NavActions isAuthenticated={isAuthenticated} isPending={isPending} />
            <MobileNav
              open={mobileOpen}
              onOpenChange={setMobileOpen}
              isAuthenticated={isAuthenticated}
              isPending={isPending}
            />
          </div>
        </motion.div>
      </div>
    </header>
  );
}

/** Hairline reading-progress bar pinned to the top of the viewport. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="gradient-primary absolute inset-x-0 top-0 h-px origin-left"
      style={{ scaleX }}
    />
  );
}
