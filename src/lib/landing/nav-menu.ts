import type { LucideIcon } from "lucide-react"
import {
  ArrowLeftRight,
  BookOpen,
  Bot,
  Building2,
  Code2,
  Copy,
  GraduationCap,
  HandCoins,
  Landmark,
  LayoutDashboard,
  LineChart,
  Newspaper,
  PieChart,
  Repeat,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react"

export type NavBadge = "New" | "Beta"

export type MegaNavItem = {
  href: string
  title: string
  description: string
  icon: LucideIcon
  badge?: NavBadge
}

export type MegaNavColumn = {
  heading?: string
  items: MegaNavItem[]
}

export type MegaNavSection = {
  id: string
  label: string
  columns: MegaNavColumn[]
  /** Wider panel for 2-column layouts */
  wide?: boolean
}

export const MARKETS_SECTION: MegaNavSection = {
  id: "markets",
  label: "Markets",
  columns: [
    {
      items: [
        {
          href: "/#markets",
          title: "Market overview",
          description: "Browse 1,000+ assets on the landing ticker",
          icon: TrendingUp,
        },
        {
          href: "/markets",
          title: "Live markets",
          description: "Real-time USDT pairs on Binance via Nexora",
          icon: LineChart,
        },
        {
          href: "/price/bitcoin",
          title: "Bitcoin price",
          description: "Chart, stats, and buy widget for BTC",
          icon: BookOpen,
        },
        {
          href: "/price/ethereum",
          title: "Ethereum price",
          description: "Chart, stats, and buy widget for ETH",
          icon: BookOpen,
        },
      ],
    },
  ],
}

export const TRADE_SECTION: MegaNavSection = {
  id: "trade",
  label: "Trade",
  wide: true,
  columns: [
    {
      heading: "Basic",
      items: [
        {
          href: "/trade/BTCUSDT",
          title: "Spot",
          description: "Trade spot with advanced charts and order tools",
          icon: LineChart,
        },
        {
          href: "/buy",
          title: "Buy & Sell",
          description: "Simple market orders in one tap",
          icon: ArrowLeftRight,
          badge: "New",
        },
        {
          href: "/portfolio",
          title: "Margin",
          description: "Increase exposure with portfolio leverage tools",
          icon: TrendingUp,
        },
        {
          href: "/#markets",
          title: "Convert",
          description: "Swap assets instantly at competitive rates",
          icon: Repeat,
        },
        {
          href: "/#demo",
          title: "Demo Trading",
          description: "Practice with paper funds and zero risk",
          icon: Sparkles,
        },
      ],
    },
    {
      heading: "Advanced",
      items: [
        {
          href: "/trade/BTCUSDT",
          title: "Trading Terminal",
          description: "Pro book, chart, and open orders workspace",
          icon: Zap,
        },
        {
          href: "/settings",
          title: "Trading Bots",
          description: "Automate strategies — easy, fast, reliable",
          icon: Bot,
          badge: "Beta",
        },
        {
          href: "/#features",
          title: "Copy Trading",
          description: "Follow top-ranked strategies instantly",
          icon: Copy,
        },
        {
          href: "/settings",
          title: "APIs",
          description: "REST and WebSocket access with one key",
          icon: Code2,
        },
      ],
    },
  ],
}

export const FUTURES_SECTION: MegaNavSection = {
  id: "futures",
  label: "Futures",
  columns: [
    {
      items: [
        {
          href: "/#trade",
          title: "USDⓈ-M Futures",
          description: "Contracts settled in USDT and USDC",
          icon: Landmark,
        },
        {
          href: "/#trade",
          title: "COIN-M Futures",
          description: "Contracts settled in cryptocurrency",
          icon: PieChart,
        },
        {
          href: "/#trade",
          title: "Options",
          description: "Limited downside with affordable entry",
          icon: HandCoins,
          badge: "Beta",
        },
      ],
    },
  ],
}

export const EARN_SECTION: MegaNavSection = {
  id: "earn",
  label: "Earn",
  columns: [
    {
      items: [
        {
          href: "/#learn",
          title: "Overview",
          description: "One-stop portal for all Earn products",
          icon: Wallet,
        },
        {
          href: "/#learn",
          title: "Simple Earn",
          description: "Passive income on 300+ assets with flexible terms",
          icon: Repeat,
        },
        {
          href: "/#learn",
          title: "Advanced Earn",
          description: "Maximize returns with structured yield products",
          icon: TrendingUp,
        },
        {
          href: "/#institutional",
          title: "Loans",
          description: "Quick loans with competitive rates",
          icon: HandCoins,
        },
      ],
    },
  ],
}

export const MORE_SECTION: MegaNavSection = {
  id: "more",
  label: "More",
  wide: true,
  columns: [
    {
      items: [
        {
          href: "/#institutional",
          title: "VIP & Institutional",
          description: "Trusted platform for funds, firms, and treasuries",
          icon: Building2,
        },
        {
          href: "/#learn",
          title: "Academy",
          description: "Free crypto and trading education",
          icon: GraduationCap,
        },
        {
          href: "/#learn",
          title: "Research",
          description: "Macro, protocols, and on-chain coverage",
          icon: Newspaper,
        },
        {
          href: "/#security",
          title: "Security",
          description: "Cold storage, passkeys, and fraud defense",
          icon: ShieldCheck,
        },
      ],
    },
    {
      items: [
        {
          href: "/portfolio",
          title: "Portfolio",
          description: "Balances, P&L, and open orders",
          icon: PieChart,
        },
        {
          href: "/markets",
          title: "Markets",
          description: "Live USDT spot pairs and volume",
          icon: LineChart,
        },
        {
          href: "/dashboard",
          title: "Dashboard",
          description: "Overview of your trading activity",
          icon: LayoutDashboard,
        },
        {
          href: "/#features",
          title: "Community",
          description: "Signals, copy trading, and shared playbooks",
          icon: Users,
        },
      ],
    },
  ],
}

export const MEGA_SECTIONS: MegaNavSection[] = [
  MARKETS_SECTION,
  TRADE_SECTION,
  FUTURES_SECTION,
  EARN_SECTION,
  MORE_SECTION,
]
