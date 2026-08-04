import type { Metadata } from "next"

import { MarketingProductPage } from "@/components/product/marketing-product-page"
import { COMMUNITY_PAGE } from "@/lib/product/catalog"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Community",
  description: COMMUNITY_PAGE.subtitle,
  path: "/community",
})

export default function CommunityRoutePage() {
  return <MarketingProductPage content={COMMUNITY_PAGE} />
}
