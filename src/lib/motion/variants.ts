import type { Variants } from "motion/react";

import { EASE_OUT } from "./easing";

/**
 * Depth entrance shared by every staggered section: the item arrives from
 * below, slightly small and blurred, so it reads as moving toward the viewer.
 */
export const depthChild: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

export const depthParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Viewport config used by every scroll-triggered reveal. */
export const REVEAL_VIEWPORT = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -80px 0px",
} as const;
