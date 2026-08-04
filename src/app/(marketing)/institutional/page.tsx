import type { Metadata } from "next"

import { MarketingProductPage } from "@/components/product/marketing-product-page"
import { INSTITUTIONAL_PAGE } from "@/lib/product/catalog"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Institutional",
  description: INSTITUTIONAL_PAGE.subtitle,
  path: "/institutional",
})

export default function InstitutionalRoutePage() {
  return <MarketingProductPage content={INSTITUTIONAL_PAGE} />
}
