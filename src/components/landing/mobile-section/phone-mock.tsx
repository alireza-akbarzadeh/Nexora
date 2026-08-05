import { useMemo } from "react";

import { ASSETS } from "@/lib/landing/constants";
import { hashSeed, mulberry32 } from "@/lib/landing/seeded-random";

type PhoneMockProps = {
  variant: "portfolio" | "trade";
};

export function PhoneMock({ variant }: PhoneMockProps) {
  const candles = useMemo(() => {
    const random = mulberry32(hashSeed(variant));
    return Array.from({ length: 20 }, (_, i) => ({
      key: i,
      up: random() > 0.5,
      h: 20 + random() * 40,
      y: 30 + random() * 20,
    }));
  }, [variant]);

  return (
    <div className="h-[520px] w-64 rounded-[3rem] border border-white/10 bg-gradient-to-b from-card-elevated to-background p-2 shadow-[0_40px_80px_-20px_oklch(0_0_0/0.8)]">
      <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-background">
        <div className="absolute top-2 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="px-5 pt-12">
          {variant === "portfolio" ? (
            <>
              <div className="text-xs text-muted-foreground">Total balance</div>
              <div className="mt-1 font-display text-3xl font-bold">$28,412.90</div>
              <div className="text-xs text-profit">+$482.10 (1.72%)</div>
              <div className="relative mt-4 h-24 overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[color-mix(in_srgb,var(--violet)_20%,transparent)] to-transparent">
                <svg viewBox="0 0 200 80" className="h-full w-full">
                  <path
                    d="M0,60 L20,50 L40,55 L60,40 L80,45 L100,30 L120,35 L140,20 L160,25 L180,15 L200,10"
                    stroke="var(--violet)"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="mt-4 space-y-2">
                {ASSETS.slice(0, 4).map((a) => (
                  <div key={a.sym} className="flex items-center gap-2 rounded-lg p-2 hover:bg-white/5">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ background: `${a.color}22`, color: a.color }}
                    >
                      {a.sym.slice(0, 2)}
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold">{a.sym}</div>
                      <div className="text-[10px] text-muted-foreground">{a.name}</div>
                    </div>
                    <div className="ml-auto text-right text-xs">
                      <div className="font-mono">
                        ${a.price < 10 ? a.price.toFixed(2) : a.price.toLocaleString()}
                      </div>
                      <div
                        className={
                          a.ch > 0
                            ? "text-[10px] text-profit"
                            : "text-[10px] text-loss"
                        }
                      >
                        {a.ch > 0 ? "+" : ""}
                        {a.ch.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">BTC / USD</div>
                  <div className="font-display text-2xl font-bold">$68,412</div>
                </div>
                <div className="rounded-md bg-[color-mix(in_srgb,var(--profit)_10%,transparent)] px-2 py-1 text-xs text-profit">
                  +2.84%
                </div>
              </div>
              <div className="mt-4 h-32 rounded-xl border border-white/5 bg-black/40 p-2">
                <svg viewBox="0 0 200 100" className="h-full w-full">
                  {candles.map((c) => (
                    <rect
                      key={c.key}
                      x={c.key * 10 + 2}
                      y={c.y}
                      width="6"
                      height={c.h}
                      fill={c.up ? "var(--profit)" : "var(--loss)"}
                      rx="1"
                    />
                  ))}
                </svg>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button type="button" className="rounded-xl bg-buy py-3 text-sm font-semibold text-primary-foreground">
                  Buy
                </button>
                <button type="button" className="rounded-xl bg-sell py-3 text-sm font-semibold text-white">
                  Sell
                </button>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">Recent</div>
              {[
                ["Buy BTC", "+0.024"],
                ["Sell ETH", "-1.20"],
                ["Buy SOL", "+12.5"],
              ].map(([a, b]) => (
                <div key={a} className="flex justify-between border-b border-white/5 py-1.5 text-xs">
                  <span>{a}</span>
                  <span className="font-mono text-muted-foreground">{b}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
