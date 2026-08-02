import Link from "next/link"

import { Header } from "@/components/layout/header"
import { ProductHubContent } from "@/components/product/product-hub"
import { Button } from "@/components/ui/button"
import type { ProductPageContent } from "@/lib/product/catalog"

export function DashboardProductPage({
  content,
}: {
  content: ProductPageContent
}) {
  return (
    <>
      <Header title={content.title} subtitle={content.subtitle} />
      <ProductHubContent content={content} />
    </>
  )
}

export function DashboardProductEmptyHint({
  title,
  href,
  label,
}: {
  title: string
  href: string
  label: string
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center">
      <p className="text-sm text-muted-foreground">{title}</p>
      <Button className="mt-3" render={<Link href={href} />}>
        {label}
      </Button>
    </div>
  )
}
