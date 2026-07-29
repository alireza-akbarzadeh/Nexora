import { TradeTerminal } from "@/components/trading/trade-terminal";

interface TradePageProps {
  params: Promise<{ symbol: string }>;
}

export default async function TradePage({ params }: TradePageProps) {
  const { symbol } = await params;
  return <TradeTerminal symbolSlug={symbol} />;
}
