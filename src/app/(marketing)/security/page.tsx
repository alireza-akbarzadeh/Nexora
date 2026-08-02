import type { Metadata } from "next"

import { MarketingProductPage } from "@/components/product/marketing-product-page"
import { SECURITY_PAGE } from "@/lib/product/catalog"

export const metadata: Metadata = {
  title: "Security · Nexora",
  description: SECURITY_PAGE.subtitle,
}

export default function SecurityRoutePage() {
  return <MarketingProductPage content={SECURITY_PAGE} />
}
