"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTradingStore } from "@/stores/trading-store";
import { cn } from "@/lib/utils";

interface OrderFormProps {
  symbol: string;
}

export function OrderForm({ symbol }: OrderFormProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    orderSide,
    orderType,
    orderAmount,
    orderPrice,
    setOrderSide,
    setOrderType,
    setOrderAmount,
    setOrderPrice,
    resetOrderForm,
  } = useTradingStore();

  const connectionsQuery = useQuery({
    queryKey: ["exchange-connections"],
    queryFn: async () => {
      const response = await fetch("/api/exchange/connections");
      if (!response.ok) throw new Error("Failed to load connections");
      return response.json() as Promise<{
        connections: Array<{ exchange: string; isActive: boolean }>;
      }>;
    },
  });

  const hasConnection = (connectionsQuery.data?.connections ?? []).some(
    (connection) => connection.exchange === "binance" && connection.isActive,
  );

  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/exchange/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          side: orderSide,
          type: orderType,
          amount: Number(orderAmount),
          price: orderType === "limit" ? Number(orderPrice) : undefined,
          exchange: "binance",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to place order");
      }
      return data;
    },
    onSuccess: () => {
      setConfirmOpen(false);
      resetOrderForm();
      setError(null);
    },
    onError: (mutationError) => {
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : "Failed to place order",
      );
    },
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!hasConnection) {
      setError("Connect your Binance API keys in Settings before trading.");
      return;
    }

    if (!orderAmount || Number(orderAmount) <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    if (orderType === "limit" && (!orderPrice || Number(orderPrice) <= 0)) {
      setError("Enter a valid limit price.");
      return;
    }

    setConfirmOpen(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4 p-4">
        <Tabs
          value={orderSide}
          onValueChange={(value) => setOrderSide(value as "buy" | "sell")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="data-active:text-buy">
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-active:text-sell">
              Sell
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={orderType === "limit" ? "secondary" : "ghost"}
            onClick={() => setOrderType("limit")}
          >
            Limit
          </Button>
          <Button
            type="button"
            variant={orderType === "market" ? "secondary" : "ghost"}
            onClick={() => setOrderType("market")}
          >
            Market
          </Button>
        </div>

        {orderType === "limit" ? (
          <div className="space-y-2">
            <Label htmlFor="price">Price (USDT)</Label>
            <Input
              id="price"
              type="number"
              step="any"
              value={orderPrice}
              onChange={(event) => setOrderPrice(event.target.value)}
              placeholder="0.00"
            />
          </div>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="any"
            value={orderAmount}
            onChange={(event) => setOrderAmount(event.target.value)}
            placeholder="0.00"
          />
        </div>

        {!hasConnection ? (
          <p className="text-xs text-muted-foreground">
            Connect Binance API keys in Settings to enable live trading.
          </p>
        ) : null}

        {error ? <p className="text-xs text-destructive">{error}</p> : null}

        <Button
          type="submit"
          className={cn(
            "mt-auto w-full",
            orderSide === "buy"
              ? "bg-buy text-background hover:bg-buy/90"
              : "bg-sell text-white hover:bg-sell/90",
          )}
        >
          {orderSide === "buy" ? "Buy" : "Sell"} {symbol.split("/")[0]}
        </Button>
      </form>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Order</DialogTitle>
            <DialogDescription>
              Review your order before submitting to Binance.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Symbol:</span> {symbol}
            </p>
            <p>
              <span className="text-muted-foreground">Side:</span>{" "}
              {orderSide.toUpperCase()}
            </p>
            <p>
              <span className="text-muted-foreground">Type:</span>{" "}
              {orderType.toUpperCase()}
            </p>
            <p>
              <span className="text-muted-foreground">Amount:</span> {orderAmount}
            </p>
            {orderType === "limit" ? (
              <p>
                <span className="text-muted-foreground">Price:</span> {orderPrice}
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => placeOrderMutation.mutate()}
              disabled={placeOrderMutation.isPending}
            >
              {placeOrderMutation.isPending ? "Submitting..." : "Confirm Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
