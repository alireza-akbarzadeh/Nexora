"use client";

import type { OrderBook } from "@/types/exchange";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useTradingStore } from "@/stores/trading-store";

interface OrderBookPanelProps {
  orderBook: OrderBook | null;
}

export function OrderBookPanel({ orderBook }: OrderBookPanelProps) {
  const setOrderPrice = useTradingStore((state) => state.setOrderPrice);
  const setOrderType = useTradingStore((state) => state.setOrderType);

  function handlePriceClick(price: number) {
    setOrderType("limit");
    setOrderPrice(String(price));
  }

  if (!orderBook) {
    return (
      <div className="flex h-full flex-col gap-2 p-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
      </div>
    );
  }

  const maxTotal = Math.max(
    ...orderBook.bids.map((level) => level.amount),
    ...orderBook.asks.map((level) => level.amount),
    1,
  );

  const bestAsk = orderBook.asks[0]?.price;
  const bestBid = orderBook.bids[0]?.price;
  const spread =
    bestAsk != null && bestBid != null ? bestAsk - bestBid : null;

  return (
    <div className="flex h-full flex-col text-xs">
      <div className="grid grid-cols-3 gap-1 border-b border-border/80 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Total</span>
      </div>

      <div className="flex flex-1 flex-col-reverse overflow-y-auto px-1 py-1.5 scrollbar-thin">
        {orderBook.asks
          .slice(0, 12)
          .map((level, index) => (
            <OrderBookRow
              key={`ask-${index}`}
              price={level.price}
              amount={level.amount}
              maxTotal={maxTotal}
              side="sell"
              onPriceClick={handlePriceClick}
            />
          ))}
      </div>

      <div className="border-y border-border bg-muted/40 px-3 py-2 text-center font-tabular text-sm font-semibold">
        {spread != null ? (
          <span className="text-muted-foreground">
            Spread{" "}
            <span className="text-foreground">{formatPrice(spread, 2)}</span>
          </span>
        ) : (
          <span className="text-muted-foreground">Spread</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-1 py-1.5 scrollbar-thin">
        {orderBook.bids.slice(0, 12).map((level, index) => (
          <OrderBookRow
            key={`bid-${index}`}
            price={level.price}
            amount={level.amount}
            maxTotal={maxTotal}
            side="buy"
            onPriceClick={handlePriceClick}
          />
        ))}
      </div>
    </div>
  );
}

function OrderBookRow({
  price,
  amount,
  maxTotal,
  side,
  onPriceClick,
}: {
  price: number;
  amount: number;
  maxTotal: number;
  side: "buy" | "sell";
  onPriceClick: (price: number) => void;
}) {
  const width = `${(amount / maxTotal) * 100}%`;
  const total = price * amount;

  return (
    <button
      type="button"
      className="relative grid w-full grid-cols-3 gap-1 rounded-sm px-2 py-1 font-tabular transition-colors outline-none hover:bg-accent/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      onClick={() => onPriceClick(price)}
    >
      <div
        className="pointer-events-none absolute inset-y-0.5 right-0 rounded-sm opacity-25"
        style={{
          width,
          backgroundColor: side === "buy" ? "var(--profit)" : "var(--sell)",
        }}
      />
      <span
        className={
          side === "buy" ? "relative text-profit" : "relative text-sell"
        }
      >
        {formatPrice(price, 2)}
      </span>
      <span className="relative text-right text-foreground/90">
        {formatPrice(amount, 4)}
      </span>
      <span className="relative text-right text-muted-foreground">
        {formatPrice(total, 2)}
      </span>
    </button>
  );
}
