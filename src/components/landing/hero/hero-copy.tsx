"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { Magnetic } from "@/components/ui/motion";
import { EASE_OUT } from "@/lib/motion/easing";

import { BEAT, TRUST_MARKS } from "./constants";

/**
 * Above-the-fold copy. Uses `animate` rather than `whileInView` — the hero is
 * already visible on load, so a viewport trigger would never fire.
 */
export function HeroCopy() {
  // Shared entrance, offset per element to build the cascade. MotionConfig
  // strips the transform channels for reduced-motion users; the fade remains.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 30, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  });

  return (
    <>
      <motion.div
        className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
        {...rise(BEAT.badge)}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-profit" />
        Nexora v4 — AI copilot for spot &amp; derivatives is live
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </motion.div>

      <h1 className="text-5xl leading-[0.95] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        <motion.span className="gradient-text block" {...rise(BEAT.headlineTop)}>
          Trade the Future
        </motion.span>
        <motion.span
          className="block text-foreground"
          {...rise(BEAT.headlineBottom)}
        >
          of Finance.
        </motion.span>
      </h1>

      <motion.p
        className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        {...rise(BEAT.subhead)}
      >
        Buy, sell and manage digital assets with institutional-grade security,
        lightning-fast execution, and industry-leading liquidity.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
        {...rise(BEAT.actions)}
      >
        <Magnetic>
          <Link
            href="/register"
            className="group gradient-primary glow-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
          >
            Start Trading
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </Magnetic>

        <Magnetic strength={0.18}>
          <a
            href="#demo"
            className="glass-strong inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-medium text-foreground transition-colors duration-200 hover:bg-white/[0.04] active:scale-[0.97]"
          >
            Explore Markets
          </a>
        </Magnetic>
      </motion.div>

      <motion.div
        className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
        {...rise(BEAT.trustMarks)}
      >
        {TRUST_MARKS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5 text-profit" aria-hidden />
            {label}
          </div>
        ))}
      </motion.div>
    </>
  );
}
