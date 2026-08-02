"use client";

import type { OrderBook } from "@/types/exchange";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderBookPanelProps {
  orderBook: OrderBook | null;
}

export function OrderBookPanel({ orderBook }: OrderBookPanelProps) {
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

  return (
    <div className="flex h-full flex-col text-xs">
      <div className="grid grid-cols-3 border-b border-border px-3 py-2 text-muted-foreground">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Total</span>
      </div>

      <div className="flex flex-1 flex-col-reverse overflow-y-auto px-1 py-2 scrollbar-thin">
        {orderBook.asks.slice(0, 12).reverse().map((level, index) => (
          <OrderBookRow
            key={`ask-${index}`}
            price={level.price}
            amount={level.amount}
            maxTotal={maxTotal}
            side="sell"
          />
        ))}
      </div>

      <div className="border-y border-border px-3 py-2 text-center font-tabular text-sm font-semibold">
        Spread
      </div>

      <div className="flex-1 overflow-y-auto px-1 py-2 scrollbar-thin">
        {orderBook.bids.slice(0, 12).map((level, index) => (
          <OrderBookRow
            key={`bid-${index}`}
            price={level.price}
            amount={level.amount}
            maxTotal={maxTotal}
            side="buy"
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
}: {
  price: number;
  amount: number;
  maxTotal: number;
  side: "buy" | "sell";
}) {
  const width = `${(amount / maxTotal) * 100}%`;
  const total = price * amount;

  return (
    <div className="relative grid grid-cols-3 px-2 py-0.5 font-tabular">
      <div
        className="absolute inset-y-0 right-0 opacity-20"
        style={{
          width,
          backgroundColor: side === "buy" ? "var(--buy)" : "var(--sell)",
        }}
      />
      <span className={side === "buy" ? "text-buy" : "text-sell"}>
        {formatPrice(price, 2)}
      </span>
      <span className="relative text-right">{formatPrice(amount, 4)}</span>
      <span className="relative text-right text-muted-foreground">
        {formatPrice(total, 2)}
      </span>
    </div>
  );
}
