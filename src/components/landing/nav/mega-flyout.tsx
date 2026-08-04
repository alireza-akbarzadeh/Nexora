"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type FocusEvent, type KeyboardEvent } from "react";

import type { MegaNavSection } from "@/lib/landing/nav-menu";
import { EASE_OUT } from "@/lib/motion/easing";
import { cn } from "@/lib/utils";

import { MegaListItem } from "./mega-list-item";
import { PopularPrices } from "./popular-prices";

export function MegaFlyout({ section }: { section: MegaNavSection }) {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  // Focus events bubble in React, so this covers keyboard traversal into and
  // back out of the panel without per-item handlers.
  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") setOpen(false);
  };

  return (
    <div
      className="relative"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex cursor-pointer items-center gap-1 text-sm transition-colors duration-200",
          open ? "text-primary" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {section.label}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-3.5 opacity-70 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          /* pt-3 bridges the gap so the pointer can reach the panel */
          <motion.div
            id={panelId}
            role="menu"
            className="absolute top-full left-0 z-50 pt-3"
            style={{ transformOrigin: "top left" }}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
          >
            <FlyoutPanel section={section} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function FlyoutPanel({ section }: { section: MegaNavSection }) {
  const multiColumn = section.wide && section.columns.length > 1;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-card/95 text-card-foreground shadow-(--shadow-elevated) ring-1 ring-border backdrop-blur-xl",
        section.wide ? "w-[min(92vw,36rem)]" : "w-[min(92vw,22rem)]",
      )}
    >
      <div
        className={cn("grid gap-1 p-2", multiColumn ? "sm:grid-cols-2" : "grid-cols-1")}
      >
        {section.columns.map((column, index) => (
          <div
            key={`${section.id}-${column.heading ?? index}`}
            className={cn(index > 0 && section.wide && "sm:border-l sm:border-border")}
          >
            {column.heading ? (
              <p className="px-2.5 pt-2 pb-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
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

      {section.id === "markets" ? <PopularPrices /> : null}
    </div>
  );
}
