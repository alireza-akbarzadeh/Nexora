export type CoinInfo = {
  slug: string;
  symbol: string;
  name: string;
  color: string;
  /** CCXT / Binance pair used for live market data */
  pair: string;
  aliases: string[];
  description: string;
  category: string;
  circulatingSupply?: number;
  maxSupply?: number | null;
  hot?: boolean;
};

const COINS: CoinInfo[] = [
  {
    slug: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    color: "#F7931A",
    pair: "BTC/USDT",
    aliases: ["btc"],
    description:
      "Bitcoin is the first decentralized cryptocurrency. It enables peer-to-peer transfers without a central authority and is widely used as a store of value and digital settlement asset.",
    category: "Layer 1",
    circulatingSupply: 19_700_000,
    maxSupply: 21_000_000,
    hot: true,
  },
  {
    slug: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    color: "#627EEA",
    pair: "ETH/USDT",
    aliases: ["eth"],
    description:
      "Ethereum is a smart-contract platform that powers decentralized applications, DeFi, NFTs, and stablecoins. Ether (ETH) is used for gas fees and staking.",
    category: "Layer 1",
    circulatingSupply: 120_500_000,
    maxSupply: null,
    hot: true,
  },
  {
    slug: "solana",
    symbol: "SOL",
    name: "Solana",
    color: "#14F195",
    pair: "SOL/USDT",
    aliases: ["sol"],
    description:
      "Solana is a high-throughput Layer 1 blockchain optimized for speed and low fees, popular for DeFi, NFTs, and consumer crypto apps.",
    category: "Layer 1",
    circulatingSupply: 470_000_000,
    maxSupply: null,
    hot: true,
  },
  {
    slug: "bnb",
    symbol: "BNB",
    name: "BNB",
    color: "#F3BA2F",
    pair: "BNB/USDT",
    aliases: ["binance-coin"],
    description:
      "BNB is the native token of the BNB Chain ecosystem, used for trading fee discounts, gas, and participation across Binance products.",
    category: "Layer 1",
    circulatingSupply: 145_000_000,
    maxSupply: null,
  },
  {
    slug: "xrp",
    symbol: "XRP",
    name: "XRP",
    color: "#25A2DB",
    pair: "XRP/USDT",
    aliases: ["ripple"],
    description:
      "XRP is designed for fast, low-cost cross-border payments and liquidity bridging across financial institutions and payment providers.",
    category: "Payments",
    circulatingSupply: 56_000_000_000,
    maxSupply: 100_000_000_000,
  },
  {
    slug: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    color: "#C2A633",
    pair: "DOGE/USDT",
    aliases: ["doge"],
    description:
      "Dogecoin started as a meme coin and grew into a widely traded cryptocurrency used for tipping, payments, and community-driven campaigns.",
    category: "Meme",
    circulatingSupply: 146_000_000_000,
    maxSupply: null,
  },
  {
    slug: "cardano",
    symbol: "ADA",
    name: "Cardano",
    color: "#0033AD",
    pair: "ADA/USDT",
    aliases: ["ada"],
    description:
      "Cardano is a proof-of-stake blockchain focused on research-driven development, scalability, and sustainable decentralized applications.",
    category: "Layer 1",
    circulatingSupply: 35_000_000_000,
    maxSupply: 45_000_000_000,
  },
  {
    slug: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    color: "#E84142",
    pair: "AVAX/USDT",
    aliases: ["avax"],
    description:
      "Avalanche is a Layer 1 platform known for subnet architecture, fast finality, and EVM-compatible smart contracts.",
    category: "Layer 1",
    circulatingSupply: 420_000_000,
    maxSupply: 720_000_000,
  },
  {
    slug: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    color: "#2A5ADA",
    pair: "LINK/USDT",
    aliases: ["link"],
    description:
      "Chainlink is a decentralized oracle network that connects smart contracts to real-world data, APIs, and off-chain computation.",
    category: "DeFi",
    circulatingSupply: 650_000_000,
    maxSupply: 1_000_000_000,
  },
  {
    slug: "sui",
    symbol: "SUI",
    name: "Sui",
    color: "#4DA2FF",
    pair: "SUI/USDT",
    aliases: [],
    description:
      "Sui is a Layer 1 blockchain built for high throughput and low latency, with an object-centric data model suited for gaming and consumer apps.",
    category: "Layer 1",
    circulatingSupply: 3_200_000_000,
    maxSupply: 10_000_000_000,
    hot: true,
  },
];

const bySlug = new Map<string, CoinInfo>();

for (const coin of COINS) {
  bySlug.set(coin.slug, coin);
  for (const alias of coin.aliases) {
    bySlug.set(alias.toLowerCase(), coin);
  }
  bySlug.set(coin.symbol.toLowerCase(), coin);
}

export function getAllCoins(): CoinInfo[] {
  return COINS;
}

export function getCoinBySlug(slug: string): CoinInfo | undefined {
  return bySlug.get(slug.trim().toLowerCase());
}

export function coinPricePath(coin: Pick<CoinInfo, "slug">): string {
  return `/price/${coin.slug}`;
}
