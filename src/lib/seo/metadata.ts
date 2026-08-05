import type { Metadata } from "next";

import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "./site";

type BuildMetadataOptions = {
  title: string;
  description?: string;
  /** Route path, e.g. "/academy". Defaults to "/" (site root). */
  path?: string;
  /** Absolute or root-relative image URL. Defaults to the shared OG image. */
  image?: string;
};

/**
 * Full `Metadata` object with `openGraph`/`twitter`/`alternates.canonical`
 * filled in, so every page gets the same shape instead of hand-rolling a
 * partial one. Requires `metadataBase` to be set on the root layout —
 * `path`/`image` are resolved relative to it by Next.js.
 */
export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = OG_IMAGE_PATH,
}: BuildMetadataOptions): Metadata {
  const canonical = path;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: image,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
