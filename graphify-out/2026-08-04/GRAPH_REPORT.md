# Graph Report - Nexora  (2026-08-04)

## Corpus Check
- 212 files · ~55,351 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1066 nodes · 2440 edges · 54 communities (46 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1a0dacb8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- field.tsx
- service.ts
- markets-overview.tsx
- settings/page.tsx
- dependencies
- scripts
- sidebar.tsx
- cn
- compilerOptions
- order-form.tsx
- Nexora
- nav/index.tsx
- types/exchange.ts
- product/catalog.ts
- dropdown-menu.tsx
- components.json
- landing-page.tsx
- paper-trade-simulator.tsx
- theme-provider.tsx
- SignalingManager
- signaling-manager.ts
- landing/constants.ts
- better-auth
- Thin API route handlers convention
- user-menu.tsx
- coins/catalog.ts
- header.tsx
- graphify
- assets.tsx
- mobile-section.tsx
- (marketing)/page.tsx
- mcp.json
- Client feedback via notify() convention
- graphify-out/
- motion/index.ts
- hero-dashboard.tsx
- utils.ts
- eslint.config.mjs
- next.config.ts
- trust-bar.tsx
- postcss.config.mjs
- AES-256-GCM At Rest
- Server-Only CCXT
- use-count-up.ts
- order-book-panel.tsx
- button.tsx
- hero/index.tsx
- hero-chart.ts
- Exchange API keys only via ENCRYPTION_KEY storage convention
- Prefer existing UI primitives convention
- pnpm db:push

## God Nodes (most connected - your core abstractions)
1. `cn()` - 204 edges
2. `Nexora` - 41 edges
3. `Button()` - 29 edges
4. `formatPrice()` - 27 edges
5. `scripts` - 16 edges
6. `jsonError()` - 16 edges
7. `isSupportedExchange()` - 16 edges
8. `SignalingManager` - 16 edges
9. `compilerOptions` - 16 edges
10. `usePrefersReducedMotion()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Nexora` --references--> `typescript`  [EXTRACTED]
  CLAUDE.md → package.json
- `src/app/api/auth/[...all]/route.ts` --references--> `better-auth`  [EXTRACTED]
  CLAUDE.md → package.json
- `src/lib/db/schema.ts` --references--> `better-auth`  [EXTRACTED]
  CLAUDE.md → package.json
- `Nexora` --references--> `better-auth`  [EXTRACTED]
  CLAUDE.md → package.json
- `Nexora` --references--> `drizzle-orm`  [EXTRACTED]
  CLAUDE.md → package.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Thin API Route Handler Pattern** — claude_md_conventions_api_routes, claude_md_requiresession, claude_md_jsonerror, claude_md_zod, claude_md_routes_layout [EXTRACTED 1.00]
- **DB Schema & Migration Workflow** — claude_md_db_schema, claude_md_db_index, claude_md_neon_postgres, claude_md_pnpm_db_generate, claude_md_drizzle_dir [EXTRACTED 1.00]
- **Graphify Codebase Exploration Workflow** — claude_md_graphify, claude_md_graphify_out, claude_md_graph_json, claude_md_graphify_query, claude_md_graphify_path, claude_md_graphify_explain, claude_md_graphify_update [EXTRACTED 1.00]

## Communities (54 total, 8 thin omitted)

### Community 0 - "field.tsx"
Cohesion: 0.06
Nodes (58): DevAuthEmail, extractUrl(), ForgotPasswordPage(), LoginPage(), TwoFactorPage(), authInputClassName, AuthError(), AuthFooterLink() (+50 more)

### Community 1 - "service.ts"
Cohesion: 0.05
Nodes (68): { GET, POST }, GET(), GET(), connectionSchema, GET(), PATCH(), POST(), GET() (+60 more)

### Community 2 - "markets-overview.tsx"
Cohesion: 0.14
Nodes (21): PortfolioPage(), baseOf(), Category, HighlightCard(), MarketsOverview(), NEW_BASES, SortableHead(), SortDir (+13 more)

### Community 3 - "settings/page.tsx"
Cohesion: 0.07
Nodes (42): OtpInput(), OtpInputProps, TwoFactorVerifyProps, DashboardOverview(), StatCard(), NotifyProvider(), NotifyToaster(), NotifyToastItem() (+34 more)

### Community 4 - "dependencies"
Cohesion: 0.04
Nodes (46): @base-ui/react, @better-auth/infra, ccxt, class-variance-authority, Client state (src/stores), clsx, @hookform/resolvers, jose (+38 more)

### Community 5 - "scripts"
Cohesion: 0.05
Nodes (38): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, tailwindcss (+30 more)

### Community 6 - "sidebar.tsx"
Cohesion: 0.08
Nodes (35): react, react, AppSidebar(), mainNav, DashboardShell(), Sidebar(), SidebarContent(), SidebarContext (+27 more)

### Community 7 - "cn"
Cohesion: 0.12
Nodes (26): Stat(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator() (+18 more)

### Community 8 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 9 - "order-form.tsx"
Cohesion: 0.13
Nodes (17): ConvertPage(), ASSETS, BuySellPage(), Side, trimAmount(), OrderForm(), OrderFormProps, SIZE_PERCENTS (+9 more)

### Community 10 - "Nexora"
Cohesion: 0.08
Nodes (24): banner-design skill, better-auth skill, brand skill, CCXT, Path alias convention (@/ -> src/), design skill, design-system skill, drizzle skill (+16 more)

### Community 11 - "nav/index.tsx"
Cohesion: 0.09
Nodes (22): metadata, LandingFooter(), SOCIAL_ICONS, LandingNav(), FlyoutPanel(), MegaFlyout(), MegaListItem(), MobileNav() (+14 more)

### Community 12 - "types/exchange.ts"
Cohesion: 0.15
Nodes (13): TradePageProps, PriceAreaChart(), PriceAreaChartProps, OpenOrdersPanel(), Timeframe, TIMEFRAMES, TradeTerminal(), TradeTerminalProps (+5 more)

### Community 13 - "product/catalog.ts"
Cohesion: 0.06
Nodes (28): metadata, metadata, metadata, metadata, metadata, ASSETS, Field(), DashboardProductPage() (+20 more)

### Community 14 - "dropdown-menu.tsx"
Cohesion: 0.12
Nodes (17): formatRelativeTime(), HistoryRow(), variantMeta, OPTIONS, ThemeToggle(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent() (+9 more)

### Community 15 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 16 - "landing-page.tsx"
Cohesion: 0.15
Nodes (11): FaqSection(), FeaturesSection(), FinalCtaSection(), LearningSection(), PricingSection(), TestimonialsSection(), FAQS, FEATURES (+3 more)

### Community 17 - "paper-trade-simulator.tsx"
Cohesion: 0.16
Nodes (12): StatCard(), StatCardProps, useReveal(), TradeDemoSection(), DemoTradingPage(), PaperTradeSimulator(), PaperTradeSimulatorProps, Position (+4 more)

### Community 18 - "theme-provider.tsx"
Cohesion: 0.12
Nodes (24): geistMono, geistSans, metadata, NetworkStatusToast(), Providers(), ThemeContext, ThemeContextValue, ThemeProvider() (+16 more)

### Community 19 - "SignalingManager"
Cohesion: 0.21
Nodes (5): TickerBarProps, toBinanceSymbol(), SignalingManager, OrderBook, Ticker

### Community 20 - "signaling-manager.ts"
Cohesion: 0.22
Nodes (10): AuthLiveMarkets(), formatMarketPrice(), MARKETS, useOrderBook(), BinanceDepthMessage, BinanceTickerMessage, getSignalingManager(), StreamCallback (+2 more)

### Community 21 - "landing/constants.ts"
Cohesion: 0.22
Nodes (13): SecuritySection(), NAV_LINKS, SECURITY_ITEMS, SECURITY_ORBIT_ICONS, Asset, FaqItem, Feature, LearningItem (+5 more)

### Community 22 - "better-auth"
Cohesion: 0.14
Nodes (15): better-auth, src/app/api/auth/[...all]/route.ts, DB schema/migration convention, src/lib/db/index.ts, DB area (src/lib/db), src/lib/db/schema.ts, drizzle/ (generated SQL migrations), Neon Postgres (+7 more)

### Community 23 - "Thin API route handlers convention"
Cohesion: 0.22
Nodes (8): src/lib/api/auth-guard.ts, Auth area (src/lib/auth, src/proxy.ts, src/lib/api/auth-guard.ts), Thin API route handlers convention, Server secrets via getEnv() convention, Env (src/lib/env.ts), jsonError(), Routes area (src/app/(marketing), (auth), (dashboard), api/**), Zod

### Community 24 - "user-menu.tsx"
Cohesion: 0.16
Nodes (14): NavActions(), NavActionsProps, UserAvatar(), UserMenu(), UserMenuProps, NotificationBell(), Avatar(), AvatarBadge() (+6 more)

### Community 25 - "coins/catalog.ts"
Cohesion: 0.25
Nodes (11): generateMetadata(), generateStaticParams(), PageProps, PriceSlugPage(), hotCoins(), PopularPrices(), bySlug, coinPricePath() (+3 more)

### Community 27 - "header.tsx"
Cohesion: 0.25
Nodes (6): ConnectionBadge(), ConnectionBadgeProps, Header(), HeaderProps, Separator(), useWsConnection()

### Community 28 - "graphify"
Cohesion: 0.22
Nodes (9): 21st MCP server, API_KEY_21ST, graphify, graphify explain command, graphify MCP server, graphify path command, graphify query command, graphify update command (+1 more)

### Community 29 - "assets.tsx"
Cohesion: 0.38
Nodes (5): AssetCard(), assetHref(), AssetsSection(), Sparkline(), SparklineProps

### Community 30 - "mobile-section.tsx"
Cohesion: 0.33
Nodes (4): MobileSection(), PhoneMockProps, ASSETS, MOBILE_FEATURES

### Community 32 - "mcp.json"
Cohesion: 0.50
Nodes (3): 21st, graphify, ${userHome}/.local/bin/graphify-mcp

### Community 33 - "Client feedback via notify() convention"
Cohesion: 0.67
Nodes (4): Client feedback via notify() convention, notify() / notify.order(), Notify (src/lib/notify), notify skill

### Community 34 - "graphify-out/"
Cohesion: 0.50
Nodes (4): graphify-out/graph.json, graphify-out/GRAPH_REPORT.md, graphify-out/, graphify-out/wiki/index.md

### Community 35 - "motion/index.ts"
Cohesion: 0.20
Nodes (15): Magnetic(), MagneticProps, ParallaxLayer(), ParallaxLayerProps, Spotlight(), SpotlightProps, Depth(), TiltCard() (+7 more)

### Community 36 - "hero-dashboard.tsx"
Cohesion: 0.12
Nodes (20): ChartPanel(), GRIDLINES, TIMEFRAMES, ASKS, BEAT, BIDS, HERO_STATS, FloatingChip() (+12 more)

### Community 37 - "utils.ts"
Cohesion: 0.15
Nodes (19): ChangeBadge(), BuyWidget(), BuyWidgetProps, CoinPricePage(), CoinPricePageProps, RANGE_OPTIONS, RangeId, TabId (+11 more)

### Community 42 - "trust-bar.tsx"
Cohesion: 0.21
Nodes (10): TrustBar(), Reveal(), RevealProps, Stagger(), StaggerItem(), StaggerProps, TRUST_STATS, depthChild (+2 more)

### Community 50 - "use-count-up.ts"
Cohesion: 0.27
Nodes (9): CountUp(), CountUpProps, CountUpResult, easeOut(), Options, useCountUp(), formatMetric(), ParsedMetric (+1 more)

### Community 51 - "order-book-panel.tsx"
Cohesion: 0.28
Nodes (7): OrderBookPanel(), OrderBookPanelProps, OrderBookRow(), OrderSide, OrderType, TradingState, useTradingStore

### Community 52 - "button.tsx"
Cohesion: 0.15
Nodes (14): MobileNavProps, Button(), buttonVariants, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader() (+6 more)

### Community 53 - "hero/index.tsx"
Cohesion: 0.29
Nodes (6): TRUST_MARKS, HeroBackdrop(), HeroCopy(), HeroSection(), HeroScroll, useHeroScroll()

### Community 56 - "hero-chart.ts"
Cohesion: 0.36
Nodes (7): buildChart(), buildSeries(), ChartPoint, HERO_CHART, HeroChart, mulberry32(), toPoints()

### Community 57 - "Exchange API keys only via ENCRYPTION_KEY storage convention"
Cohesion: 0.40
Nodes (6): Private exchange routes require session convention, Exchange API keys only via ENCRYPTION_KEY storage convention, ENCRYPTION_KEY, src/lib/exchange/encryption.ts, Exchange area (src/lib/exchange, src/app/api/exchange, src/app/api/market), requireSession()

## Knowledge Gaps
- **263 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `21st`, `$schema`, `style`, `rsc` (+258 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `field.tsx`, `markets-overview.tsx`, `settings/page.tsx`, `hero-dashboard.tsx`, `utils.ts`, `motion/index.ts`, `sidebar.tsx`, `order-form.tsx`, `nav/index.tsx`, `types/exchange.ts`, `product/catalog.ts`, `dropdown-menu.tsx`, `paper-trade-simulator.tsx`, `theme-provider.tsx`, `signaling-manager.ts`, `button.tsx`, `user-menu.tsx`, `header.tsx`?**
  _High betweenness centrality (0.478) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`, `better-auth`, `sidebar.tsx`?**
  _High betweenness centrality (0.236) - this node is a cross-community bridge._
- **Why does `react` connect `sidebar.tsx` to `dependencies`?**
  _High betweenness centrality (0.225) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `21st`, `$schema` to the rest of the system?**
  _263 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `field.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05995410212277682 - nodes in this community are weakly interconnected._
- **Should `service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05490296220633299 - nodes in this community are weakly interconnected._
- **Should `markets-overview.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13666666666666666 - nodes in this community are weakly interconnected._