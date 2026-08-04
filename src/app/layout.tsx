import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { Providers } from "@/components/providers";
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

export const metadata: Metadata = {
  title: "Nexora | Crypto Trading Platform",
  description: "Real-time crypto trading powered by exchange APIs",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
