"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { depthChild, depthParent, REVEAL_VIEWPORT } from "@/lib/motion/variants";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. 0.03–0.05 for lists, 0.08 for cards. */
  stagger?: number;
  delayChildren?: number;
};

/** Parent for a group that assembles piece by piece as it enters view. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={depthParent(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/** Direct child of `Stagger`. Inherits its timing from the parent. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={depthChild}>
      {children}
    </motion.div>
  );
}
