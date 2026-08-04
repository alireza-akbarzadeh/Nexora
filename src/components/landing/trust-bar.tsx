"use client";

import { CountUp, Stagger, StaggerItem } from "@/components/ui/motion";
import { TRUST_STATS } from "@/lib/landing/constants";

export function TrustBar() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Stagger
          className="card-elevated grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-3 lg:grid-cols-6"
          stagger={0.07}
        >
          {TRUST_STATS.map((s) => (
            <StaggerItem
              key={s.l}
              className="group bg-card p-6 text-center transition-colors duration-200 hover:bg-card-elevated"
            >
              <div className="font-display gradient-text text-2xl font-bold tabular-nums md:text-3xl">
                <CountUp value={s.v} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
