import type { MetadataRoute } from "next";

import { getAllCoins } from "@/lib/coins/catalog";
import { siteUrl } from "@/lib/seo/site";

/** Public marketing routes with a static page.tsx. Dashboard/auth are noindex — excluded. */
const STATIC_ROUTES = [
  "",
  "/academy",
  "/buy",
  "/community",
  "/institutional",
  "/research",
  "/security",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const coinEntries: MetadataRoute.Sitemap = getAllCoins().map((coin) => ({
    url: `${base}/price/${coin.slug}`,
    changeFrequency: "hourly",
    priority: 0.5,
  }));

  return [...staticEntries, ...coinEntries];
}
