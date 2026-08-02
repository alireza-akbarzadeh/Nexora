import type { Metadata } from "next"

import { MarketingProductPage } from "@/components/product/marketing-product-page"
import { ACADEMY_PAGE } from "@/lib/product/catalog"

export const metadata: Metadata = {
  title: "Academy · Nexora",
  description: ACADEMY_PAGE.subtitle,
}

export default function AcademyRoutePage() {
  return <MarketingProductPage content={ACADEMY_PAGE} />
}
