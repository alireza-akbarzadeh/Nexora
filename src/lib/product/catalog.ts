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

export type ProductCard = {
  title: string
  description: string
  href: string
  icon: LucideIcon
  badge?: "New" | "Beta" | "Soon"
  cta?: string
}

export type ProductPageContent = {
  slug: string
  title: string
  subtitle: string
  eyebrow: string
  body: string
  cards: ProductCard[]
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export const CONVERT_PAGE: ProductPageContent = {
  slug: "convert",
  title: "Convert",
  subtitle: "Swap assets instantly at competitive rates",
  eyebrow: "Trade",
  body: "Convert between major crypto pairs without navigating the full order book. Ideal for quick rebalances.",
  cards: [],
  primaryCta: { label: "Open converter", href: "#converter" },
  secondaryCta: { label: "Advanced trade", href: "/trade/BTCUSDT" },
}

export const MARGIN_PAGE: ProductPageContent = {
  slug: "margin",
  title: "Margin",
  subtitle: "Increase exposure with leveraged spot tools",
  eyebrow: "Trade",
  body: "Margin trading lets you borrow against collateral to size positions. Start from the terminal with risk controls enabled.",
  cards: [
    {
      title: "Cross margin",
      description: "Share collateral across open positions for flexible risk.",
      href: "/trade/BTCUSDT",
      icon: PieChart,
      cta: "Open terminal",
    },
    {
      title: "Isolated margin",
      description: "Ring-fence risk per pair so one trade cannot wipe the book.",
      href: "/trade/BTCUSDT",
      icon: ShieldCheck,
      cta: "Trade BTC",
    },
    {
      title: "Portfolio view",
      description: "Monitor borrowed balances and available equity.",
      href: "/portfolio",
      icon: Wallet,
      cta: "View portfolio",
    },
  ],
  primaryCta: { label: "Start trading", href: "/trade/BTCUSDT" },
}

export const DEMO_PAGE: ProductPageContent = {
  slug: "demo",
  title: "Demo Trading",
  subtitle: "Practice with paper funds and zero risk",
  eyebrow: "Trade",
  body: "Learn order types, charting, and execution flow with virtual capital before you go live.",
  cards: [
    {
      title: "Paper spot",
      description: "Simulated fills against live market prices.",
      href: "/demo",
      icon: Sparkles,
      badge: "New",
      cta: "Open demo desk",
    },
    {
      title: "Live terminal",
      description: "When you are ready, connect Binance and trade for real.",
      href: "/trade/BTCUSDT",
      icon: LineChart,
      cta: "Open terminal",
    },
  ],
  primaryCta: { label: "Open demo desk", href: "/demo" },
}

export const BOTS_PAGE: ProductPageContent = {
  slug: "bots",
  title: "Trading Bots",
  subtitle: "Automate strategies — easy, fast, reliable",
  eyebrow: "Advanced",
  body: "Deploy grid, DCA, and signal bots that run against your connected exchange. Beta access rolls out in phases.",
  cards: [
    {
      title: "Grid bot",
      description: "Buy low and sell high in a range automatically.",
      href: "/bots",
      icon: Bot,
      badge: "Beta",
    },
    {
      title: "DCA bot",
      description: "Schedule recurring buys into any USDT pair.",
      href: "/bots",
      icon: Repeat,
      badge: "Soon",
    },
    {
      title: "Signal bot",
      description: "Route AI or webhook signals into sized orders.",
      href: "/bots",
      icon: Zap,
      badge: "Soon",
    },
  ],
  primaryCta: { label: "Join beta waitlist", href: "/settings" },
}

export const COPY_TRADING_PAGE: ProductPageContent = {
  slug: "copy-trading",
  title: "Copy Trading",
  subtitle: "Follow top-ranked strategies instantly",
  eyebrow: "Advanced",
  body: "Mirror verified traders with proportional sizing, risk caps, and one-click unfollow.",
  cards: [
    {
      title: "Leaderboard",
      description: "Ranked by 90-day return, drawdown, and consistency.",
      href: "/copy-trading",
      icon: TrendingUp,
      badge: "Soon",
    },
    {
      title: "Risk controls",
      description: "Max allocation, stop-copy, and per-trade caps.",
      href: "/settings",
      icon: ShieldCheck,
    },
    {
      title: "Community",
      description: "Discuss strategies with other Nexora traders.",
      href: "/community",
      icon: Users,
      cta: "Visit community",
    },
  ],
  primaryCta: { label: "Browse markets", href: "/markets" },
}

export const FUTURES_PAGE: ProductPageContent = {
  slug: "futures",
  title: "Futures",
  subtitle: "Perpetuals and options for directional and hedged flow",
  eyebrow: "Derivatives",
  body: "Access linear and coin-margined contracts from one workspace. Start with USDⓈ-M for USDT settlement.",
  cards: [
    {
      title: "USDⓈ-M Futures",
      description: "Contracts settled in USDT and USDC.",
      href: "/trade/BTCUSDT",
      icon: Landmark,
      cta: "Trade perps",
    },
    {
      title: "COIN-M Futures",
      description: "Contracts settled in cryptocurrency.",
      href: "/trade/BTCUSDT",
      icon: PieChart,
      badge: "Soon",
    },
    {
      title: "Options",
      description: "Limited downside with affordable entry.",
      href: "/futures",
      icon: HandCoins,
      badge: "Beta",
    },
  ],
  primaryCta: { label: "Open spot terminal", href: "/trade/BTCUSDT" },
  secondaryCta: { label: "View portfolio", href: "/portfolio" },
}

export const EARN_PAGE: ProductPageContent = {
  slug: "earn",
  title: "Earn",
  subtitle: "One-stop portal for yield and lending products",
  eyebrow: "Earn",
  body: "Put idle balances to work with flexible earn, structured yield, and crypto-backed loans.",
  cards: [
    {
      title: "Simple Earn",
      description: "Passive income on 300+ assets with flexible terms.",
      href: "/earn",
      icon: Repeat,
      badge: "Soon",
    },
    {
      title: "Advanced Earn",
      description: "Maximize returns with structured yield products.",
      href: "/earn",
      icon: TrendingUp,
      badge: "Soon",
    },
    {
      title: "Loans",
      description: "Quick loans with competitive rates.",
      href: "/earn",
      icon: HandCoins,
      badge: "Soon",
    },
    {
      title: "Portfolio",
      description: "See idle USDT and coin balances ready to deploy.",
      href: "/portfolio",
      icon: Wallet,
      cta: "Open portfolio",
    },
  ],
  primaryCta: { label: "Check balances", href: "/portfolio" },
}

export const DEVELOPERS_PAGE: ProductPageContent = {
  slug: "developers",
  title: "APIs",
  subtitle: "REST and WebSocket access with one key",
  eyebrow: "Advanced",
  body: "Build on Nexora with exchange connections, market data routes, and authenticated trading endpoints.",
  cards: [
    {
      title: "Market data",
      description: "Tickers, order books, and OHLCV via `/api/market`.",
      href: "/developers",
      icon: LineChart,
    },
    {
      title: "Exchange API",
      description: "Balances, orders, and connections via `/api/exchange`.",
      href: "/settings",
      icon: Code2,
      cta: "Manage keys",
    },
    {
      title: "WebSocket",
      description: "Live books and ticks through the signaling layer.",
      href: "/developers",
      icon: Zap,
    },
  ],
  primaryCta: { label: "Open settings", href: "/settings" },
  secondaryCta: { label: "Trade terminal", href: "/trade/BTCUSDT" },
}

export const ACADEMY_PAGE: ProductPageContent = {
  slug: "academy",
  title: "Academy",
  subtitle: "Free crypto and trading education",
  eyebrow: "Learn",
  body: "Interactive lessons from beginner spot flows to advanced derivatives risk.",
  cards: [
    {
      title: "Trading basics",
      description: "Orders, spreads, and reading the book.",
      href: "/demo",
      icon: GraduationCap,
      cta: "Practice on demo",
    },
    {
      title: "Security tips",
      description: "Passkeys, withdrawals, and device hygiene.",
      href: "/security",
      icon: ShieldCheck,
    },
    {
      title: "Live markets",
      description: "Apply lessons to real USDT pairs.",
      href: "/markets",
      icon: LineChart,
      cta: "Open markets",
    },
  ],
  primaryCta: { label: "Start learning", href: "/demo" },
  secondaryCta: { label: "Create account", href: "/register" },
}

export const RESEARCH_PAGE: ProductPageContent = {
  slug: "research",
  title: "Research",
  subtitle: "Macro, protocols, and on-chain coverage",
  eyebrow: "Learn",
  body: "Daily briefs and deeper notes to frame entries, hedges, and treasury allocation.",
  cards: [
    {
      title: "Market wrap",
      description: "Volatility, funding, and cross-asset moves.",
      href: "/markets",
      icon: Newspaper,
      badge: "Soon",
    },
    {
      title: "Protocol notes",
      description: "L1/L2 upgrades and catalyst calendars.",
      href: "/research",
      icon: BookOpen,
      badge: "Soon",
    },
    {
      title: "Price deep dives",
      description: "Coin pages with charts and buy widgets.",
      href: "/price/bitcoin",
      icon: TrendingUp,
      cta: "BTC price",
    },
  ],
  primaryCta: { label: "Browse markets", href: "/markets" },
}

export const INSTITUTIONAL_PAGE: ProductPageContent = {
  slug: "institutional",
  title: "VIP & Institutional",
  subtitle: "Trusted platform for funds, firms, and treasuries",
  eyebrow: "Institutional",
  body: "OTC desk, prime-style access, reporting, and dedicated coverage for professional flow.",
  cards: [
    {
      title: "Prime access",
      description: "Priority matching and custom fee schedules.",
      href: "/register",
      icon: Building2,
    },
    {
      title: "Custody & reporting",
      description: "Exportable balances, fills, and audit trails.",
      href: "/portfolio",
      icon: Wallet,
    },
    {
      title: "API & FIX",
      description: "Programmatic access for systematic desks.",
      href: "/developers",
      icon: Code2,
      cta: "Developer hub",
    },
  ],
  primaryCta: { label: "Talk to sales", href: "/register" },
  secondaryCta: { label: "API docs", href: "/developers" },
}

export const SECURITY_PAGE: ProductPageContent = {
  slug: "security",
  title: "Security",
  subtitle: "Cold storage, passkeys, and fraud defense",
  eyebrow: "Trust",
  body: "Nexora combines exchange-grade controls with account-level protections so you can trade with confidence.",
  cards: [
    {
      title: "Passkeys & 2FA",
      description: "WebAuthn and authenticator apps — no SMS codes.",
      href: "/settings",
      icon: ShieldCheck,
      cta: "Account security",
    },
    {
      title: "Withdrawal protection",
      description: "Allow-lists, cooldowns, and device binding.",
      href: "/settings",
      icon: HandCoins,
    },
    {
      title: "Exchange keys",
      description: "Encrypted API keys stored for your connections.",
      href: "/settings",
      icon: Code2,
    },
  ],
  primaryCta: { label: "Open settings", href: "/settings" },
  secondaryCta: { label: "Create account", href: "/register" },
}

export const COMMUNITY_PAGE: ProductPageContent = {
  slug: "community",
  title: "Community",
  subtitle: "Signals, copy trading, and shared playbooks",
  eyebrow: "More",
  body: "Connect with other Nexora traders — share setups, follow leaders, and stay on top of market moves.",
  cards: [
    {
      title: "Copy trading",
      description: "Mirror verified strategies with risk caps.",
      href: "/copy-trading",
      icon: Copy,
      cta: "Explore",
    },
    {
      title: "Academy",
      description: "Learn together with structured lessons.",
      href: "/academy",
      icon: GraduationCap,
    },
    {
      title: "Markets chat",
      description: "Discuss pairs and catalysts in real time.",
      href: "/markets",
      icon: Users,
      badge: "Soon",
    },
  ],
  primaryCta: { label: "Join Nexora", href: "/register" },
  secondaryCta: { label: "Open dashboard", href: "/dashboard" },
}

export const DASHBOARD_PRODUCT_PAGES = [
  MARGIN_PAGE,
  DEMO_PAGE,
  BOTS_PAGE,
  COPY_TRADING_PAGE,
  FUTURES_PAGE,
  EARN_PAGE,
  DEVELOPERS_PAGE,
] as const

export const MARKETING_PRODUCT_PAGES = [
  ACADEMY_PAGE,
  RESEARCH_PAGE,
  INSTITUTIONAL_PAGE,
  SECURITY_PAGE,
  COMMUNITY_PAGE,
] as const
