import Link from "next/link";

import { coinPricePath, getAllCoins, type CoinInfo } from "@/lib/coins/catalog";

const MAX_COINS = 6;

/** Falls back to the head of the catalog when nothing is flagged hot. */
function hotCoins(): CoinInfo[] {
  const all = getAllCoins();
  const hot = all.filter((coin) => coin.hot);
  return (hot.length > 0 ? hot : all).slice(0, MAX_COINS);
}

/** Price shortcuts pinned to the bottom of the Markets flyout. */
export function PopularPrices() {
  return (
    <div className="border-t border-border p-2">
      <p className="px-2.5 pt-1 pb-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
        Popular prices
      </p>

      <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-3">
        {hotCoins().map((coin) => (
          <Link
            key={coin.slug}
            href={coinPricePath(coin)}
            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors duration-200 hover:bg-muted/70"
          >
            <span
              className="flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
              style={{ background: `${coin.color}22`, color: coin.color }}
            >
              {coin.symbol.slice(0, 2)}
            </span>
            <span className="truncate font-medium text-foreground">
              {coin.symbol}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
