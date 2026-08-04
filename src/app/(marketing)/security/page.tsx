import type { Metadata } from "next"

import { MarketingProductPage } from "@/components/product/marketing-product-page"
import { SECURITY_PAGE } from "@/lib/product/catalog"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Security",
  description: SECURITY_PAGE.subtitle,
  path: "/security",
})

export default function SecurityRoutePage() {
  return <MarketingProductPage content={SECURITY_PAGE} />
}
