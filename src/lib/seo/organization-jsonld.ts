import { SITE_DESCRIPTION, SITE_NAME, siteUrl } from "./site";

/** Organization structured data, rendered once on the root layout. */
export function organizationJsonLd(): Record<string, unknown> {
  const url = siteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url,
    description: SITE_DESCRIPTION,
    logo: `${url}/opengraph-image`,
  };
}
