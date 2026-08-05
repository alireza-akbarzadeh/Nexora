import { getEnv } from "@/lib/env";

export const SITE_NAME = "Nexora";

export const SITE_DESCRIPTION =
  "Institutional-grade digital asset exchange. Lightning-fast execution, deep liquidity, and enterprise security trusted by 10M+ traders.";

/** Absolute origin, no trailing slash. Backs `metadataBase` and every canonical/OG URL. */
export function siteUrl(): string {
  return getEnv().NEXT_PUBLIC_APP_URL.replace(/\/+$/, "");
}

/** Served by the src/app/opengraph-image.tsx route convention. */
export const OG_IMAGE_PATH = "/opengraph-image";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
