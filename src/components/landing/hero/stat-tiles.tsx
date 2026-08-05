import { HERO_STATS } from "./constants";

/** The four summary tiles along the bottom of the hero dashboard. */
export function StatTiles() {
  return (
    <>
      {HERO_STATS.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-white/[0.04] bg-card-elevated p-3"
        >
          <div className="text-[11px] text-muted-foreground">{stat.label}</div>
          <div className="mt-0.5 font-display text-lg font-semibold tabular-nums">
            {stat.value}
          </div>
          <div className="text-[10px] text-profit">{stat.delta}</div>
        </div>
      ))}
    </>
  );
}
