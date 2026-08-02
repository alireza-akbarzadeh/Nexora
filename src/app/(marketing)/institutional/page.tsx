import type { Metadata } from "next"

import { MarketingProductPage } from "@/components/product/marketing-product-page"
import { INSTITUTIONAL_PAGE } from "@/lib/product/catalog"

export const metadata: Metadata = {
  title: "Institutional · Nexora",
  description: INSTITUTIONAL_PAGE.subtitle,
}

export default function InstitutionalRoutePage() {
  return <MarketingProductPage content={INSTITUTIONAL_PAGE} />
}
