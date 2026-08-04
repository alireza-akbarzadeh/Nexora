"use client";

import { motion } from "motion/react";

import { HeroBackdrop } from "./hero-backdrop";
import { HeroCopy } from "./hero-copy";
import { HeroDashboard } from "./hero-dashboard";
import { useHeroScroll } from "./use-hero-scroll";

/**
 * Landing hero.
 *
 * Depth comes from three stacked effects: a parallax backdrop, a scroll-linked
 * recession on the dashboard, and cursor tilt within it. The section owns the
 * shared perspective; children only supply their own transforms.
 */
export function HeroSection() {
  const { ref, stageStyle, copyStyle } = useHeroScroll();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-40 pb-24"
      style={{ perspective: "1600px" }}
    >
      <HeroBackdrop />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div className="mx-auto max-w-4xl text-center" style={copyStyle}>
          <HeroCopy />
        </motion.div>

        <motion.div
          className="relative mt-20 [transform-style:preserve-3d]"
          style={stageStyle}
        >
          <HeroDashboard />
        </motion.div>
      </div>
    </section>
  );
}
