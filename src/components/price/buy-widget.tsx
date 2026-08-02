"use client";

import Link from "next/link";
import { ArrowDownUp } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CoinInfo } from "@/lib/coins/catalog";
import { cn, formatMarketPrice, formatPrice } from "@/lib/utils";

interface BuyWidgetProps {
  coin: CoinInfo;
  price: number | null;
}

export function BuyWidget({ coin, price }: BuyWidgetProps) {
  const [tab, setTab] = useState<"buy" | "trade">("buy");
  const [spendUsd, setSpendUsd] = useState("100");

  const amount = useMemo(() => {
    const usd = Number(spendUsd);
    if (!price || !Number.isFinite(usd) || usd <= 0) return null;
    return usd / price;
  }, [price, spendUsd]);

  const tradeHref = `/trade/${coin.symbol}USDT`;

  return (
    <aside className="rounded-2xl border border-border bg-card p-5">
      <div className="flex gap-6 border-b border-border">
        {(
          [
            { id: "buy", label: `Buy ${coin.symbol}` },
            { id: "trade", label: `Trade ${coin.symbol}` },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              tab === item.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
            {tab === item.id ? (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
            ) : null}
          </button>
        ))}
      </div>

      {tab === "buy" ? (
        <div className="mt-5 space-y-4">
          <Field
            label="You buy"
            addon={
              <span className="flex items-center gap-2 text-sm font-medium">
                <CoinDot color={coin.color} label={coin.symbol.slice(0, 2)} />
                {coin.symbol}
              </span>
            }
            value={
              amount != null
                ? amount >= 1
                  ? formatPrice(amount, 6)
                  : amount.toFixed(8)
                : ""
            }
            readOnly
            placeholder="0.00"
          />

          <div className="flex justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
              <ArrowDownUp className="h-3.5 w-3.5" />
            </div>
          </div>

          <Field
            label="You spend"
            addon={
              <span className="text-sm font-medium text-muted-foreground">USD</span>
            }
            value={spendUsd}
            onChange={setSpendUsd}
            placeholder="10 – 50,000"
            inputMode="decimal"
          />

          <p className="text-xs text-muted-foreground">
            1 {coin.symbol} ≈{" "}
            {price != null ? formatMarketPrice(price) : "—"}
          </p>

          <Button
            className="h-11 w-full text-sm font-semibold"
            render={<Link href="/register" />}
          >
            Buy {coin.symbol}
          </Button>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Open the full trading terminal for {coin.name} with live order book,
            advanced orders, and professional charting.
          </p>
          <Button
            className="h-11 w-full text-sm font-semibold"
            render={<Link href={tradeHref} />}
          >
            Trade {coin.symbol}/USDT
          </Button>
          <Button
            variant="outline"
            className="h-11 w-full text-sm"
            render={<Link href="/login" />}
          >
            Sign in to trade
          </Button>
        </div>
      )}
    </aside>
  );
}

function CoinDot({ color, label }: { color: string; label: string }) {
  return (
    <span
      className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
      style={{ background: `${color}22`, color }}
    >
      {label}
    </span>
  );
}

function Field({
  label,
  addon,
  value,
  onChange,
  placeholder,
  readOnly,
  inputMode,
}: {
  label: string;
  addon: ReactNode;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  inputMode?: "decimal";
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 px-3 py-2.5">
      <div className="mb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
      <div className="flex items-center gap-3">
        {addon}
        <Input
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={readOnly}
          placeholder={placeholder}
          inputMode={inputMode}
          className="h-9 border-0 bg-transparent px-0 text-right font-mono text-base shadow-none focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
