"use client";

import Link from "next/link";
import { ArrowRight, Building2, Lock, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useMemo } from "react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24">
      <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="animate-pulse-glow absolute top-40 left-10 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--lime)_12%,transparent)] blur-3xl" />
      <div
        className="animate-pulse-glow absolute right-10 bottom-20 h-96 w-96 rounded-full bg-[color-mix(in_srgb,var(--violet)_14%,transparent)] blur-3xl"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="animate-rise mx-auto max-w-4xl text-center">
          <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-profit" />
            Nexora v4 — AI copilot for spot & derivatives is live
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
          <h1 className="text-5xl leading-[0.95] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="gradient-text">Trade the Future</span>
            <br />
            <span className="text-foreground">of Finance.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Buy, sell and manage digital assets with institutional-grade security,
            lightning-fast execution, and industry-leading liquidity.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="group gradient-primary glow-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-medium text-primary-foreground transition-all hover:scale-[1.03]"
            >
              Start Trading
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#demo"
              className="glass-strong inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-medium text-foreground transition-all hover:bg-white/[0.04]"
            >
              Explore Markets
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-profit" /> SOC 2 Type II
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-profit" /> ISO 27001
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-profit" /> Regulated in 40+ jurisdictions
            </div>
          </div>
        </div>

        <HeroDashboard />
      </div>
    </section>
  );
}

function HeroDashboard() {
  const chart = useMemo(() => {
    let v = 62000;
    return Array.from({ length: 60 }, (_, i) => {
      v += Math.sin(i / 4) * 300 + (Math.random() - 0.45) * 400;
      return v;
    });
  }, []);

  const min = Math.min(...chart);
  const max = Math.max(...chart);
  const w = 600;
  const h = 220;
  const points = chart.map((p, i) => {
    const x = (i / (chart.length - 1)) * w;
    const y = h - ((p - min) / (max - min)) * h;
    return { x, y };
  });
  const path = points.map((pt, i) => `${i === 0 ? "M" : "L"}${pt.x},${pt.y}`).join(" ");

  return (
    <div className="animate-rise relative mt-20" style={{ animationDelay: "0.2s" }}>
      <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-r from-[color-mix(in_srgb,var(--violet)_30%,transparent)] via-[color-mix(in_srgb,var(--violet)_20%,transparent)] to-[color-mix(in_srgb,var(--profit)_20%,transparent)] blur-3xl" />
      <div className="card-elevated relative rounded-3xl p-4 shadow-[var(--shadow-elevated)] md:p-6">
        <div className="flex items-center justify-between border-b border-white/5 px-2 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--loss)_60%,transparent)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--lime)_60%,transparent)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--profit)_60%,transparent)]" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">nexora.app / trade / BTC-USD</span>
          </div>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-profit" />
            Live · 12ms
          </div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 rounded-2xl border border-white/[0.04] bg-card-elevated p-5 lg:col-span-8">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-md bg-white/5 px-2 py-0.5">BTC / USD</span>
                  <span>Bitcoin</span>
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-display text-3xl font-bold tracking-tight tabular-nums">$68,412.30</span>
                  <span className="flex items-center gap-1 text-sm font-medium text-profit">
                    <TrendingUp className="h-3.5 w-3.5" /> +2.84%
                  </span>
                </div>
              </div>
              <div className="hidden gap-1 text-xs sm:flex">
                {["1H", "4H", "1D", "1W", "1M"].map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    className={`rounded-md px-2.5 py-1 ${i === 2 ? "bg-violet/20 text-violet" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="h-56 w-full">
              <defs>
                <linearGradient id="hchart" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--lime)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--lime)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((f) => (
                <line
                  key={f}
                  x1="0"
                  x2={w}
                  y1={h * f}
                  y2={h * f}
                  stroke="var(--chart-grid)"
                  strokeDasharray="2 4"
                />
              ))}
              <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#hchart)" />
              <path d={path} stroke="var(--lime)" strokeWidth="1.75" fill="none" strokeLinecap="round" />
              {points.slice(-1).map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="8" fill="color-mix(in srgb, var(--lime) 20%, transparent)" className="animate-pulse" />
                  <circle cx={pt.x} cy={pt.y} r="3" fill="var(--lime)" />
                </g>
              ))}
            </svg>
          </div>

          <div className="col-span-12 space-y-3 lg:col-span-4">
            <div className="rounded-2xl border border-white/[0.04] bg-card-elevated p-4">
              <div className="text-xs text-muted-foreground">Portfolio Value</div>
              <div className="mt-1 font-display text-2xl font-bold tabular-nums">$284,591.20</div>
              <div className="mt-0.5 text-xs text-profit">+$4,218.90 (1.48%) today</div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className="gradient-primary h-full w-2/3" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.04] bg-card-elevated p-4">
              <div className="mb-2 text-xs text-muted-foreground">Order Book</div>
              <div className="space-y-1 font-mono text-[11px]">
                {[
                  { p: 68415.2, s: 0.842 },
                  { p: 68414.1, s: 1.204 },
                  { p: 68413.8, s: 0.331 },
                ].map((r, i) => (
                  <div key={i} className="relative flex justify-between px-2 py-0.5">
                    <div
                      className="absolute inset-y-0 right-0 bg-[color-mix(in_srgb,var(--sell)_12%,transparent)]"
                      style={{ width: `${r.s * 40}%` }}
                    />
                    <span className="relative text-sell">{r.p.toFixed(2)}</span>
                    <span className="relative text-muted-foreground">{r.s.toFixed(3)}</span>
                  </div>
                ))}
                <div className="py-1 text-center font-semibold text-lime">68,412.30 ↑</div>
                {[
                  { p: 68411.9, s: 0.552 },
                  { p: 68410.4, s: 1.891 },
                  { p: 68409.2, s: 0.677 },
                ].map((r, i) => (
                  <div key={i} className="relative flex justify-between px-2 py-0.5">
                    <div
                      className="absolute inset-y-0 right-0 bg-[color-mix(in_srgb,var(--buy)_12%,transparent)]"
                      style={{ width: `${r.s * 40}%` }}
                    />
                    <span className="relative text-buy">{r.p.toFixed(2)}</span>
                    <span className="relative text-muted-foreground">{r.s.toFixed(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 mt-1 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "24h Volume", v: "$18.2B", d: "+12%" },
              { label: "Open Positions", v: "7", d: "+2.4%" },
              { label: "Win Rate", v: "68.4%", d: "+3.1%" },
              { label: "Est. APY", v: "14.2%", d: "Compound" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/[0.04] bg-card-elevated p-3">
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
                <div className="mt-0.5 font-display text-lg font-semibold tabular-nums">{s.v}</div>
                <div className="text-[10px] text-profit">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-strong animate-float absolute top-1/3 -left-8 hidden rounded-2xl p-4 shadow-[var(--shadow-glow-emerald)] lg:block">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--profit)_15%,transparent)]">
            <Zap className="h-5 w-5 text-profit" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Execution</div>
            <div className="text-sm font-semibold">12ms avg</div>
          </div>
        </div>
      </div>
      <div
        className="glass-strong animate-float absolute -right-8 bottom-1/3 hidden rounded-2xl p-4 shadow-[var(--shadow-glow)] lg:block"
        style={{ animationDelay: "1s" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--violet)_15%,transparent)]">
            <Sparkles className="h-5 w-5 text-violet" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">AI signal</div>
            <div className="text-sm font-semibold">ETH bull cross</div>
          </div>
        </div>
      </div>
    </div>
  );
}
