import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { Providers } from "@/components/providers";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd } from "@/lib/seo/organization-jsonld";
import { SITE_NAME, siteUrl } from "@/lib/seo/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme/apply";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_TITLE = `${SITE_NAME} — Trade the Future of Finance`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  ...buildMetadata({ title: DEFAULT_TITLE, path: "/" }),
  // Overrides buildMetadata's plain-string title: every page's own title
  // (also a plain string) fills "%s" here automatically via Next's metadata
  // title-template resolution — pages don't need to know the site name.
  title: {
    default: DEFAULT_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        {/* Applies the stored theme before hydration, so there is no flash.
            Uses next/script rather than a raw <script>: React 19 warns on any
            script element rendered from a component, since it would not
            execute on a client navigation. next/script injects it outside the
            React tree, which is what beforeInteractive is for. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        {/* Organization structured data. next/script (not a raw <script>) for
            the same reason as theme-init — React 19 warns on any inline
            script element rendered by a component, JSON-LD included. */}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(organizationJsonLd())}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
