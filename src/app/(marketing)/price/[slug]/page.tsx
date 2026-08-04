import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CoinPricePage } from "@/components/price/coin-price-page";
import { getAllCoins, getCoinBySlug } from "@/lib/coins/catalog";
import { buildMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCoins().map((coin) => ({ slug: coin.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const coin = getCoinBySlug(slug);
  if (!coin) {
    return { title: "Coin not found" };
  }

  return buildMetadata({
    title: `${coin.name} Price (${coin.symbol})`,
    description: `Live ${coin.name} (${coin.symbol}) price, chart, market stats, and trading on Nexora. ${coin.description.slice(0, 120)}`,
    path: `/price/${coin.slug}`,
  });
}

export default async function PriceSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const coin = getCoinBySlug(slug);
  if (!coin) notFound();

  return <CoinPricePage coin={coin} />;
}
