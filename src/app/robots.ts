import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo/site";

/** Mirrors the noindex boundary set on (dashboard)/layout.tsx and (auth)/layout.tsx. */
const DISALLOWED_PREFIXES = [
  "/dashboard",
  "/portfolio",
  "/convert",
  "/bots",
  "/copy-trading",
  "/earn",
  "/futures",
  "/margin",
  "/settings",
  "/developers",
  "/demo",
  "/markets",
  "/trade",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/two-factor",
  "/api",
];

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOWED_PREFIXES,
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
