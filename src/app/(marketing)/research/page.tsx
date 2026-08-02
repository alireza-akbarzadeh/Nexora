import type { Metadata } from "next"

import { MarketingProductPage } from "@/components/product/marketing-product-page"
import { RESEARCH_PAGE } from "@/lib/product/catalog"

export const metadata: Metadata = {
  title: "Research · Nexora",
  description: RESEARCH_PAGE.subtitle,
}

export default function ResearchRoutePage() {
  return <MarketingProductPage content={RESEARCH_PAGE} />
}
