"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { notify } from "@/lib/notify";
import { cn, formatPrice } from "@/lib/utils";
import type { ExchangeOrder } from "@/types/exchange";

interface OpenOrdersPanelProps {
  symbol: string;
}

export function OpenOrdersPanel({ symbol }: OpenOrdersPanelProps) {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ["exchange-orders", "binance", symbol],
    queryFn: async () => {
      const response = await fetch(
        `/api/exchange/orders?exchange=binance&symbol=${encodeURIComponent(symbol)}`,
      );
      if (!response.ok) throw new Error("Failed to fetch orders");
      return response.json() as Promise<{ orders: ExchangeOrder[] }>;
    },
    refetchInterval: 15_000,
  });

  const cancelMutation = useMutation({
    mutationFn: async (order: ExchangeOrder) => {
      const response = await fetch("/api/exchange/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          symbol: order.symbol,
          exchange: "binance",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to cancel order");
      }
      return { data, order };
    },
    onSuccess: ({ order }) => {
      void queryClient.invalidateQueries({ queryKey: ["exchange-orders"] });
      void queryClient.invalidateQueries({ queryKey: ["exchange-balance"] });
      notify.order({
        side: order.side,
        symbol: order.symbol,
        amount: order.amount,
        type: order.type === "market" ? "market" : "limit",
        price: order.price,
        status: "cancelled",
      });
    },
    onError: (error) => {
      notify.error("Cancel failed", {
        description:
          error instanceof Error ? error.message : "Failed to cancel order",
      });
    },
  });

  if (ordersQuery.isLoading) {
    return (
      <div className="flex h-full flex-col gap-2 p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-full" />
        ))}
      </div>
    );
  }

  const orders = ordersQuery.data?.orders ?? [];

  if (orders.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
        No open orders for {symbol}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-2 border-b border-border px-3 py-2 text-[11px] text-muted-foreground">
        <span>Side</span>
        <span className="text-right">Type</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Price</span>
        <span className="text-right"> </span>
      </div>
      <ul className="divide-y divide-border">
        {orders.map((order) => (
          <li
            key={order.id}
            className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-2 px-3 py-2 text-xs"
          >
            <span
              className={cn(
                "capitalize font-medium",
                order.side === "buy" ? "text-buy" : "text-sell",
              )}
            >
              {order.side}
            </span>
            <span className="capitalize text-muted-foreground">{order.type}</span>
            <span className="font-tabular text-right">
              {formatPrice(order.amount, 6)}
            </span>
            <span className="font-tabular text-right">
              {formatPrice(order.price, 2)}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-[11px]"
              loading={
                cancelMutation.isPending &&
                cancelMutation.variables?.id === order.id
              }
              loadingText="…"
              onClick={() => cancelMutation.mutate(order)}
            >
              Cancel
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
