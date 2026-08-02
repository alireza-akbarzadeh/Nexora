import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ProductCard, ProductPageContent } from "@/lib/product/catalog"
import { cn } from "@/lib/utils"

function ProductCardLink({ card }: { card: ProductCard }) {
  const Icon = card.icon

  return (
    <Link
      href={card.href}
      className="group flex flex-col rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:bg-card"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="text-sm font-semibold tracking-tight">{card.title}</h3>
            {card.badge ? (
              <Badge className="h-4 rounded px-1.5 text-[10px] font-semibold">
                {card.badge}
              </Badge>
            ) : null}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {card.description}
          </p>
        </div>
      </div>
      {card.cta ? (
        <span className="mt-4 text-xs font-medium text-primary group-hover:underline">
          {card.cta} →
        </span>
      ) : null}
    </Link>
  )
}

export function ProductHubContent({
  content,
  children,
  className,
}: {
  content: ProductPageContent
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 overflow-auto p-4 md:p-6", className)}>
      <section className="rounded-2xl border border-border bg-card/40 p-6 md:p-8">
        <p className="font-mono text-[11px] tracking-widest text-primary uppercase">
          {content.eyebrow}
        </p>
        <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
          {content.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          {content.subtitle}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {content.body}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {content.primaryCta ? (
            <Button render={<Link href={content.primaryCta.href} />}>
              {content.primaryCta.label}
            </Button>
          ) : null}
          {content.secondaryCta ? (
            <Button
              variant="outline"
              render={<Link href={content.secondaryCta.href} />}
            >
              {content.secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </section>

      {children}

      {content.cards.length > 0 ? (
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {content.cards.map((card) => (
            <ProductCardLink key={`${card.title}-${card.href}`} card={card} />
          ))}
        </section>
      ) : null}
    </div>
  )
}

export function MarketingProductShell({
  content,
  children,
}: {
  content: ProductPageContent
  children?: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-28">
      <ProductHubContent content={content}>{children}</ProductHubContent>
    </div>
  )
}

export type { LucideIcon }
