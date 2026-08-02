import { Header } from "@/components/layout/header";
import { MarketsOverview } from "@/components/markets/markets-overview";

export default function MarketsPage() {
  return (
    <>
      <Header title="Markets" subtitle="Live USDT spot pairs on Binance" />
      <MarketsOverview />
    </>
  );
}
