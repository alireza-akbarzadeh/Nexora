"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
import { useTicker } from "@/hooks/use-ticker";
import { notify } from "@/lib/notify";
import { cn, formatPrice } from "@/lib/utils";
import { useTradingStore } from "@/stores/trading-store";
import type { Balance } from "@/types/exchange";

interface OrderFormProps {
  symbol: string;
}

const SIZE_PERCENTS = [25, 50, 75, 100] as const;

export function OrderForm({ symbol }: OrderFormProps) {
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ticker } = useTicker(symbol);

  const [baseAsset = "", quoteAsset = "USDT"] = symbol.split("/");

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

  const balanceQuery = useQuery({
    queryKey: ["exchange-balance", "binance"],
    queryFn: async () => {
      const response = await fetch("/api/exchange/balance?exchange=binance");
      if (!response.ok) throw new Error("Failed to fetch balances");
      return response.json() as Promise<{ balances: Balance[] }>;
    },
    enabled: hasConnection,
  });

  const availableBalance = useMemo(() => {
    const balances = balanceQuery.data?.balances ?? [];
    const currency = orderSide === "buy" ? quoteAsset : baseAsset;
    return balances.find((balance) => balance.currency === currency)?.free ?? 0;
  }, [balanceQuery.data?.balances, orderSide, quoteAsset, baseAsset]);

  const referencePrice = useMemo(() => {
    if (orderType === "limit" && Number(orderPrice) > 0) {
      return Number(orderPrice);
    }
    return ticker?.last ?? ticker?.ask ?? ticker?.bid ?? 0;
  }, [orderType, orderPrice, ticker]);

  const estimatedTotal = useMemo(() => {
    const amount = Number(orderAmount);
    if (!amount || amount <= 0 || !referencePrice) return null;
    return amount * referencePrice;
  }, [orderAmount, referencePrice]);

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
      const placedAmount = Number(orderAmount);
      const placedPrice =
        orderType === "limit" ? Number(orderPrice) : undefined;
      setConfirmOpen(false);
      resetOrderForm();
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["exchange-orders"] });
      void queryClient.invalidateQueries({ queryKey: ["exchange-balance"] });
      notify.order({
        side: orderSide,
        symbol,
        amount: placedAmount,
        type: orderType,
        price: placedPrice,
      });
    },
    onError: (mutationError) => {
      const message =
        mutationError instanceof Error
          ? mutationError.message
          : "Failed to place order";
      setError(message);
      notify.error("Order failed", { description: message });
    },
  });

  function applySizePercent(percent: number) {
    if (availableBalance <= 0) return;

    if (orderSide === "buy") {
      const price = referencePrice;
      if (!price || price <= 0) {
        setError("Wait for a live price before using size helpers.");
        return;
      }
      const quoteToSpend = availableBalance * (percent / 100);
      const amount = quoteToSpend / price;
      setOrderAmount(trimAmount(amount));
      return;
    }

    setOrderAmount(trimAmount(availableBalance * (percent / 100)));
  }

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

        {hasConnection ? (
          <p className="text-xs text-muted-foreground">
            Available:{" "}
            <span className="font-tabular text-foreground">
              {formatPrice(availableBalance, orderSide === "buy" ? 2 : 6)}{" "}
              {orderSide === "buy" ? quoteAsset : baseAsset}
            </span>
          </p>
        ) : null}

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
          <Label htmlFor="amount">Amount ({baseAsset})</Label>
          <Input
            id="amount"
            type="number"
            step="any"
            value={orderAmount}
            onChange={(event) => setOrderAmount(event.target.value)}
            placeholder="0.00"
          />
          {hasConnection ? (
            <div className="grid grid-cols-4 gap-1.5">
              {SIZE_PERCENTS.map((percent) => (
                <Button
                  key={percent}
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 text-[11px]"
                  onClick={() => applySizePercent(percent)}
                >
                  {percent === 100 ? "Max" : `${percent}%`}
                </Button>
              ))}
            </div>
          ) : null}
        </div>

        {estimatedTotal !== null ? (
          <p className="text-xs text-muted-foreground">
            Est. total:{" "}
            <span className="font-tabular text-foreground">
              {formatPrice(estimatedTotal, 2)} {quoteAsset}
            </span>
            {orderType === "market" ? " (approx)" : null}
          </p>
        ) : null}

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
              ? "bg-buy text-primary-foreground hover:bg-buy/90"
              : "bg-sell text-white hover:bg-sell/90",
          )}
        >
          {orderSide === "buy" ? "Buy" : "Sell"} {baseAsset}
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
              <span className="text-muted-foreground">Amount:</span> {orderAmount}{" "}
              {baseAsset}
            </p>
            {orderType === "limit" ? (
              <p>
                <span className="text-muted-foreground">Price:</span> {orderPrice}{" "}
                {quoteAsset}
              </p>
            ) : null}
            {estimatedTotal !== null ? (
              <p>
                <span className="text-muted-foreground">Est. total:</span>{" "}
                {formatPrice(estimatedTotal, 2)} {quoteAsset}
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => placeOrderMutation.mutate()}
              loading={placeOrderMutation.isPending}
              loadingText="Submitting"
            >
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function trimAmount(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "";
  return value.toFixed(8).replace(/\.?0+$/, "");
}
