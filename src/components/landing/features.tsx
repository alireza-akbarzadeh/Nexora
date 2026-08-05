import { Stagger, StaggerItem, TiltCard } from "@/components/ui/motion";
import { FEATURES } from "@/lib/landing/constants";

export function FeaturesSection() {
  return (
    <section id="trade" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="font-mono text-xs tracking-widest text-violet uppercase">
            Platform
          </div>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Everything a serious trader needs.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Institutional infrastructure with a consumer-grade interface. Built by traders, for
            traders.
          </p>
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <TiltCard max={5} className="group card-elevated h-full rounded-2xl transition-shadow duration-300 hover:shadow-[var(--shadow-glow)]">
                <div className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-gradient-to-br from-[color-mix(in_srgb,var(--violet)_20%,transparent)] to-[color-mix(in_srgb,var(--violet)_15%,transparent)] transition-transform group-hover:scale-110">
                    <f.icon className="h-5 w-5 text-violet" />
                  </div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
