"use client"

import { LandingFooter } from "@/components/landing/footer"
import { LandingNav } from "@/components/landing/nav"
import { MarketingProductShell } from "@/components/product/product-hub"
import type { ProductPageContent } from "@/lib/product/catalog"

export function MarketingProductPage({
  content,
}: {
  content: ProductPageContent
}) {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main>
        <MarketingProductShell content={content} />
      </main>
      <LandingFooter />
    </div>
  )
}
