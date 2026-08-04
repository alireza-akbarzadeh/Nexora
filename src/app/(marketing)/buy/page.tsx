import type { Metadata } from "next";

import { LandingFooter } from "@/components/landing/footer";
import { LandingNav } from "@/components/landing/nav";
import { BuySellPage } from "@/components/trading/buy-sell-page";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Buy & Sell Crypto",
  description: "Buy and sell digital assets with simple market orders.",
  path: "/buy",
});

/**
 * Public buy/sell page.
 *
 * Wears marketing chrome rather than the dashboard shell. `BuySellPage` used
 * to render the dashboard `Header`, whose `SidebarTrigger` needs a
 * `SidebarProvider` that only exists inside `(dashboard)` — moving this route
 * to `(marketing)` broke prerendering. Chrome is now the route's job, so the
 * same body renders under either shell.
 */
export default function BuyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      {/* Offsets the fixed nav */}
      <main className="flex-1 pt-24">
        <BuySellPage />
      </main>
      <LandingFooter />
    </div>
  );
}
