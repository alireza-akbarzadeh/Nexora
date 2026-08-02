"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowDownUp } from "lucide-react"

import { Header } from "@/components/layout/header"
import { ProductHubContent } from "@/components/product/product-hub"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTicker } from "@/hooks/use-ticker"
import { notify } from "@/lib/notify"
import { CONVERT_PAGE } from "@/lib/product/catalog"
import { cn, formatPrice } from "@/lib/utils"

const ASSETS = ["BTC", "ETH", "SOL", "BNB", "XRP", "USDT"] as const

export function ConvertPage() {
  const [from, setFrom] = useState<(typeof ASSETS)[number]>("USDT")
  const [to, setTo] = useState<(typeof ASSETS)[number]>("BTC")
  const [amount, setAmount] = useState("100")

  const pair =
    from === "USDT"
      ? `${to}/USDT`
      : to === "USDT"
        ? `${from}/USDT`
        : `${from}/USDT`

  const { ticker } = useTicker(from === to ? "BTC/USDT" : pair)
  const price = ticker?.last ?? ticker?.ask ?? 0

  const quote = useMemo(() => {
    const value = Number(amount)
    if (!Number.isFinite(value) || value <= 0 || !price) return null
    if (from === to) return value
    if (from === "USDT") return value / price
    if (to === "USDT") return value * price
    // both non-USDT: approximate via USDT
    return (value * price) / price
  }, [amount, from, to, price])

  function swapSides() {
    setFrom(to)
    setTo(from)
  }

  function handleConvert() {
    if (!quote) {
      notify.warning("Enter a valid amount")
      return
    }
    notify.success("Convert preview ready", {
      description: `${amount} ${from} ≈ ${formatPrice(quote)} ${to}`,
      action: {
        label: "Open Buy & Sell",
        onClick: () => {
          window.location.href = "/buy"
        },
      },
    })
  }

  return (
    <>
      <Header title="Convert" subtitle="Instant asset swaps" />
      <ProductHubContent content={CONVERT_PAGE}>
        <section
          id="converter"
          className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-5"
        >
          <Field
            label="From"
            value={amount}
            onChange={setAmount}
            asset={from}
            onAssetChange={setFrom}
            exclude={to}
          />

          <div className="my-3 flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Swap assets"
              onClick={swapSides}
            >
              <ArrowDownUp className="size-4" />
            </Button>
          </div>

          <Field
            label="To"
            value={quote != null ? formatPrice(quote) : "—"}
            readOnly
            asset={to}
            onAssetChange={setTo}
            exclude={from}
          />

          <p className="mt-3 text-xs text-muted-foreground">
            Indicative rate · {pair} ·{" "}
            {price ? formatPrice(price) : "Waiting for ticker…"}
          </p>

          <Button type="button" className="mt-4 w-full" onClick={handleConvert}>
            Preview convert
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="mt-2 w-full"
            render={<Link href="/buy" />}
          >
            Use Buy & Sell instead
          </Button>
        </section>
      </ProductHubContent>
    </>
  )
}

function Field({
  label,
  value,
  onChange,
  readOnly,
  asset,
  onAssetChange,
  exclude,
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  readOnly?: boolean
  asset: (typeof ASSETS)[number]
  onAssetChange: (v: (typeof ASSETS)[number]) => void
  exclude: string
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <select
          className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium"
          value={asset}
          onChange={(e) =>
            onAssetChange(e.target.value as (typeof ASSETS)[number])
          }
        >
          {ASSETS.filter((a) => a !== exclude).map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
      <Input
        className={cn("mt-2 border-0 bg-transparent px-0 text-lg shadow-none")}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        inputMode="decimal"
      />
    </div>
  )
}
