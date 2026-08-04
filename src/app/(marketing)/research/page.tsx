import type { Metadata } from "next"

import { MarketingProductPage } from "@/components/product/marketing-product-page"
import { RESEARCH_PAGE } from "@/lib/product/catalog"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Research",
  description: RESEARCH_PAGE.subtitle,
  path: "/research",
})

export default function ResearchRoutePage() {
  return <MarketingProductPage content={RESEARCH_PAGE} />
}
