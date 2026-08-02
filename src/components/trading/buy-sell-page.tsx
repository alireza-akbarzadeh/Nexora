"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDownUp, ChevronDown } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTicker } from "@/hooks/use-ticker";
import { notify } from "@/lib/notify";
import { cn, formatPrice, toBinanceSymbol } from "@/lib/utils";
import type { Balance } from "@/types/exchange";

const ASSETS = [
  { base: "BTC", name: "Bitcoin" },
  { base: "ETH", name: "Ethereum" },
  { base: "SOL", name: "Solana" },
  { base: "BNB", name: "BNB" },
  { base: "XRP", name: "XRP" },
  { base: "ADA", name: "Cardano" },
  { base: "APT", name: "Aptos" },
  { base: "DOGE", name: "Dogecoin" },
] as const;

const QUOTE = "USDT";

type Side = "buy" | "sell";

export function BuySellPage() {
  const queryClient = useQueryClient();
  const [side, setSide] = useState<Side>("buy");
  const [base, setBase] = useState<(typeof ASSETS)[number]["base"]>("BTC");
  const [spend, setSpend] = useState("");
  const [assetPickerOpen, setAssetPickerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const symbol = `${base}/${QUOTE}`;
  const asset = ASSETS.find((item) => item.base === base) ?? ASSETS[0];
  const { ticker } = useTicker(symbol);
  const price = ticker?.last ?? ticker?.ask ?? ticker?.bid ?? 0;

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
    const currency = side === "buy" ? QUOTE : base;
    return balances.find((balance) => balance.currency === currency)?.free ?? 0;
  }, [balanceQuery.data?.balances, side, base]);

  const spendValue = Number(spend);
  const receiveValue = useMemo(() => {
    if (!price || !spendValue || spendValue <= 0) return 0;
    return side === "buy" ? spendValue / price : spendValue * price;
  }, [price, spendValue, side]);

  const orderAmount = useMemo(() => {
    if (!spendValue || spendValue <= 0) return 0;
    return side === "buy" ? receiveValue : spendValue;
  }, [side, spendValue, receiveValue]);

  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/exchange/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          side,
          type: "market",
          amount: orderAmount,
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
      setSpend("");
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["exchange-orders"] });
      void queryClient.invalidateQueries({ queryKey: ["exchange-balance"] });
      notify.order({
        side,
        symbol,
        amount: orderAmount,
        type: "market",
        status: "placed",
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

  function handleContinue() {
    setError(null);

    if (!hasConnection) {
      setError("Connect your Binance API keys in Settings before trading.");
      return;
    }
    if (!spendValue || spendValue <= 0) {
      setError("Enter an amount to continue.");
      return;
    }
    if (!price || orderAmount <= 0) {
      setError("Wait for a live price before placing an order.");
      return;
    }
    setConfirmOpen(true);
  }

  function applyMax() {
    if (availableBalance <= 0) return;
    setSpend(trimAmount(availableBalance));
  }

  const headline =
    side === "buy"
      ? `Buy ${base} with ${QUOTE}`
      : `Sell ${base} for ${QUOTE}`;

  const spendAsset = side === "buy" ? QUOTE : base;
  const receiveAsset = side === "buy" ? base : QUOTE;

  return (
    <>
      <Header title="Buy & Sell" subtitle="Simple market orders" />

      <div className="border-b border-border bg-card/40 px-4">
        <nav className="flex gap-6 text-sm">
          <span className="border-b-2 border-primary py-3 font-medium text-foreground">
            Buy & Sell
          </span>
          <Link
            href={`/trade/${toBinanceSymbol(symbol)}`}
            className="py-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            Advanced Trade
          </Link>
          <Link
            href="/portfolio"
            className="py-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            Portfolio
          </Link>
        </nav>
      </div>

      <main className="relative flex flex-1 overflow-auto">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_20%,color-mix(in_srgb,var(--violet)_14%,transparent),transparent_60%)]"
        />

        <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-16">
          <section className="space-y-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Instant convert
            </p>
            <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {headline}
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Convert at the live market price. Pick an asset, enter how much
              you want to spend, and confirm — no order book required.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {ASSETS.map((item) => (
                <button
                  key={item.base}
                  type="button"
                  onClick={() => {
                    setBase(item.base);
                    setSpend("");
                    setError(null);
                  }}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    base === item.base
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border bg-card/60 text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  {item.base}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  Live price
                </p>
                <p className="mt-1 font-tabular text-lg font-semibold">
                  {price > 0 ? `$${formatPrice(price, price >= 1 ? 2 : 6)}` : "—"}
                </p>
              </div>
              {ticker ? (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    24h change
                  </p>
                  <p
                    className={cn(
                      "mt-1 font-tabular text-lg font-semibold",
                      ticker.percentage >= 0 ? "text-profit" : "text-loss",
                    )}
                  >
                    {ticker.percentage >= 0 ? "+" : ""}
                    {ticker.percentage.toFixed(2)}%
                  </p>
                </div>
              ) : null}
            </div>
          </section>

          <section className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_80px_-24px_rgb(0_0_0_/_0.55)]">
              <div className="grid grid-cols-2 border-b border-border bg-muted/40 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setSide("buy");
                    setSpend("");
                    setError(null);
                  }}
                  className={cn(
                    "rounded-xl py-2.5 text-sm font-semibold transition-colors",
                    side === "buy"
                      ? "bg-card text-profit shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSide("sell");
                    setSpend("");
                    setError(null);
                  }}
                  className={cn(
                    "rounded-xl py-2.5 text-sm font-semibold transition-colors",
                    side === "sell"
                      ? "bg-card text-sell shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Sell
                </button>
              </div>

              <div className="space-y-3 p-4">
                <AmountField
                  label="Spend"
                  value={spend}
                  onChange={setSpend}
                  asset={spendAsset}
                  assetName={side === "buy" ? "Tether" : asset.name}
                  onPickAsset={
                    side === "sell"
                      ? () => setAssetPickerOpen((open) => !open)
                      : undefined
                  }
                />

                <div className="flex justify-center">
                  <button
                    type="button"
                    aria-label="Switch buy and sell"
                    onClick={() => {
                      setSide((current) => (current === "buy" ? "sell" : "buy"));
                      setSpend("");
                      setError(null);
                    }}
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowDownUp className="size-4" />
                  </button>
                </div>

                <AmountField
                  label="Receive"
                  value={
                    receiveValue > 0
                      ? trimAmount(receiveValue)
                      : spend
                        ? "0"
                        : ""
                  }
                  readOnly
                  asset={receiveAsset}
                  assetName={side === "buy" ? asset.name : "Tether"}
                  onPickAsset={
                    side === "buy"
                      ? () => setAssetPickerOpen((open) => !open)
                      : undefined
                  }
                  placeholder="0"
                />

                {assetPickerOpen ? (
                  <div className="grid grid-cols-4 gap-1.5 rounded-xl border border-border bg-muted/40 p-2">
                    {ASSETS.map((item) => (
                      <button
                        key={item.base}
                        type="button"
                        onClick={() => {
                          setBase(item.base);
                          setAssetPickerOpen(false);
                          setSpend("");
                        }}
                        className={cn(
                          "rounded-lg px-2 py-2 text-xs font-medium transition-colors",
                          base === item.base
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
                        )}
                      >
                        {item.base}
                      </button>
                    ))}
                  </div>
                ) : null}

                {hasConnection ? (
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>
                      Available{" "}
                      <span className="font-tabular text-foreground">
                        {formatPrice(
                          availableBalance,
                          side === "buy" ? 2 : 6,
                        )}{" "}
                        {spendAsset}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={applyMax}
                      className="font-medium text-violet hover:underline"
                    >
                      Max
                    </button>
                  </div>
                ) : (
                  <p className="rounded-lg border border-border/80 bg-muted/40 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
                    Connect Binance API keys in{" "}
                    <Link
                      href="/settings"
                      className="font-medium text-foreground underline-offset-2 hover:underline"
                    >
                      Settings
                    </Link>{" "}
                    to enable live trading.
                  </p>
                )}

                {error ? (
                  <p className="text-xs text-destructive">{error}</p>
                ) : null}

                <Button
                  type="button"
                  onClick={handleContinue}
                  className={cn(
                    "h-11 w-full text-sm font-semibold",
                    side === "buy"
                      ? "bg-profit text-primary-foreground hover:bg-profit/90"
                      : "bg-sell text-white hover:bg-sell/90",
                  )}
                >
                  {side === "buy" ? `Buy ${base}` : `Sell ${base}`}
                </Button>

                <p className="text-center text-[11px] text-muted-foreground">
                  Market order · fee may apply on your exchange
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm {side === "buy" ? "Buy" : "Sell"}</DialogTitle>
            <DialogDescription>
              Review this market order before submitting to Binance.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Pair:</span> {symbol}
            </p>
            <p>
              <span className="text-muted-foreground">Spend:</span>{" "}
              {trimAmount(spendValue)} {spendAsset}
            </p>
            <p>
              <span className="text-muted-foreground">Receive ≈</span>{" "}
              {trimAmount(receiveValue)} {receiveAsset}
            </p>
            <p>
              <span className="text-muted-foreground">Ref. price:</span> $
              {formatPrice(price, price >= 1 ? 2 : 6)}
            </p>
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
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function AmountField({
  label,
  value,
  onChange,
  readOnly,
  asset,
  assetName,
  onPickAsset,
  placeholder = "Enter Amount",
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  asset: string;
  assetName: string;
  onPickAsset?: () => void;
  placeholder?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </span>
        {onPickAsset ? (
          <button
            type="button"
            onClick={onPickAsset}
            className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-xs font-semibold text-foreground ring-1 ring-border transition-colors hover:bg-accent"
          >
            {asset}
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
        ) : (
          <span className="rounded-full bg-card px-2.5 py-1 text-xs font-semibold ring-1 ring-border">
            {asset}
          </span>
        )}
      </div>
      <Input
        type="number"
        step="any"
        min="0"
        readOnly={readOnly}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="h-11 border-0 bg-transparent px-0 font-tabular text-xl shadow-none focus-visible:ring-0"
      />
      <p className="mt-1 text-[11px] text-muted-foreground">{assetName}</p>
    </div>
  );
}

function trimAmount(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "";
  if (value >= 1000) return value.toFixed(2).replace(/\.?0+$/, "");
  if (value >= 1) return value.toFixed(6).replace(/\.?0+$/, "");
  return value.toFixed(8).replace(/\.?0+$/, "");
}
