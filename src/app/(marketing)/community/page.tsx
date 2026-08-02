import type { Metadata } from "next"

import { MarketingProductPage } from "@/components/product/marketing-product-page"
import { COMMUNITY_PAGE } from "@/lib/product/catalog"

export const metadata: Metadata = {
  title: "Community · Nexora",
  description: COMMUNITY_PAGE.subtitle,
}

export default function CommunityRoutePage() {
  return <MarketingProductPage content={COMMUNITY_PAGE} />
}
