import type { Metadata } from "next";

import { LandingPage } from "@/components/landing";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_DESCRIPTION } from "@/lib/seo/site";

export const metadata: Metadata = buildMetadata({
  title: "Trade the Future of Finance",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return <LandingPage />;
}
