"use client";

import { ParallaxLayer, Spotlight } from "@/components/ui/motion";

/**
 * The hero's depth field: three layers moving at different scroll speeds,
 * plus a cursor-tracked ambient glow. Purely decorative — all `aria-hidden`
 * and behind the content in z.
 */
export function HeroBackdrop() {
  return (
    <>
      {/* Furthest: the grid recedes fastest against the scroll */}
      <ParallaxLayer
        speed={-0.35}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          aria-hidden
          className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        />
      </ParallaxLayer>

      {/* Fixed: the base wash stays locked to the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Mid: brand blobs */}
      <ParallaxLayer
        speed={-0.18}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          aria-hidden
          className="animate-pulse-glow absolute top-40 left-10 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--lime)_12%,transparent)] blur-3xl"
        />
        <div
          aria-hidden
          className="animate-pulse-glow absolute right-10 bottom-20 h-96 w-96 rounded-full bg-[color-mix(in_srgb,var(--violet)_14%,transparent)] blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />
      </ParallaxLayer>

      {/* Nearest: drifts with the scroll, so it reads as in front of the grid */}
      <ParallaxLayer
        speed={0.12}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          aria-hidden
          className="animate-pulse-glow absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--profit)_7%,transparent)] blur-3xl"
          style={{ animationDelay: "0.8s" }}
        />
      </ParallaxLayer>

      <Spotlight size={560} color="var(--violet)" opacity={0.09} />
    </>
  );
}
