import type { Metadata } from "next"

import { MarketingProductPage } from "@/components/product/marketing-product-page"
import { ACADEMY_PAGE } from "@/lib/product/catalog"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Academy",
  description: ACADEMY_PAGE.subtitle,
  path: "/academy",
})

export default function AcademyRoutePage() {
  return <MarketingProductPage content={ACADEMY_PAGE} />
}

