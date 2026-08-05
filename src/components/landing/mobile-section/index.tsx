"use client";

import { Check, Smartphone } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/ui/motion";
import { MOBILE_FEATURES } from "@/lib/landing/constants";

import { useReveal } from "../shared/use-reveal";
import { PhoneMock } from "./phone-mock";

export function MobileSection() {
  const { ref, seen } = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div
          ref={ref}
          className={`relative order-2 h-[600px] transition-all duration-700 lg:order-1 ${seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute h-80 w-80 rounded-full bg-[color-mix(in_srgb,var(--violet)_20%,transparent)] blur-3xl" />
          </div>
          <div className="animate-float absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6">
            <PhoneMock variant="portfolio" />
          </div>
          <div
            className="animate-float absolute top-[45%] left-[62%] -translate-y-1/2 rotate-6"
            style={{ animationDelay: "1s" }}
          >
            <PhoneMock variant="trade" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="font-mono text-xs tracking-widest text-violet uppercase">
            Nexora Mobile
          </div>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
            The exchange in your pocket.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Full trading power, biometric security, and real-time price alerts on iOS and Android.
            Rated 4.9 on both stores.
          </p>
          <Stagger className="mt-8 space-y-3" stagger={0.05}>
            {MOBILE_FEATURES.map((t) => (
              <StaggerItem key={t} className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--profit)_20%,transparent)]">
                  <Check className="h-3 w-3 text-profit" />
                </div>
                <span className="text-sm">{t}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              className="glass-strong inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm transition hover:bg-white/5"
            >
              <Smartphone className="h-4 w-4" /> Download for iOS
            </button>
            <button
              type="button"
              className="glass-strong inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm transition hover:bg-white/5"
            >
              <Smartphone className="h-4 w-4" /> Get on Android
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
