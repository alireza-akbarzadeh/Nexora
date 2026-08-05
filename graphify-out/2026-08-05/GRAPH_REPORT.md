# Graph Report - Nexora  (2026-08-04)

## Corpus Check
- 217 files · ~56,120 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1081 nodes · 2486 edges · 52 communities (41 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `20f47bd2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- settings/page.tsx
- service.ts
- markets-overview.tsx
- notify/index.ts
- dependencies
- scripts
- sidebar.tsx
- cn
- compilerOptions
- order-form.tsx
- Nexora
- nav/index.tsx
- trade-terminal.tsx
- product/catalog.ts
- user-menu.tsx
- components.json
- app/layout.tsx
- landing/constants.ts
- theme-provider.tsx
- SignalingManager
- types/exchange.ts
- dashboard-shell.tsx
- better-auth
- Thin API route handlers convention
- research/page.tsx
- coins/catalog.ts
- tabs.tsx
- header.tsx
- graphify
- academy/page.tsx
- community/page.tsx
- (marketing)/page.tsx
- mcp.json
- Client feedback via notify() convention
- graphify-out/
- motion/index.ts
- hero-dashboard.tsx
- utils.ts
- institutional/page.tsx
- eslint.config.mjs
- next.config.ts
- trust-bar.tsx
- postcss.config.mjs
- (auth)/layout.tsx
- AES-256-GCM At Rest
- Server-Only CCXT
- use-count-up.ts
- order-book-panel.tsx
- hero/index.tsx
- hero-chart.ts

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

## Communities (52 total, 11 thin omitted)

### Community 0 - "settings/page.tsx"
Cohesion: 0.05
Nodes (70): DevAuthEmail, extractUrl(), ForgotPasswordPage(), LoginPage(), authInputClassName, AuthError(), AuthFooterLink(), AuthPanel() (+62 more)

### Community 1 - "service.ts"
Cohesion: 0.05
Nodes (68): { GET, POST }, GET(), GET(), connectionSchema, GET(), PATCH(), POST(), GET() (+60 more)

### Community 2 - "markets-overview.tsx"
Cohesion: 0.13
Nodes (22): PortfolioPage(), baseOf(), Category, HighlightCard(), MarketsOverview(), NEW_BASES, SortableHead(), SortDir (+14 more)

### Community 3 - "notify/index.ts"
Cohesion: 0.09
Nodes (30): NavActions(), NavActionsProps, NetworkStatusToast(), formatRelativeTime(), HistoryRow(), NotificationBell(), variantMeta, NotifyProvider() (+22 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (43): @base-ui/react, @better-auth/infra, ccxt, class-variance-authority, clsx, @hookform/resolvers, jose, lightweight-charts (+35 more)

### Community 5 - "scripts"
Cohesion: 0.05
Nodes (38): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, tailwindcss (+30 more)

### Community 6 - "sidebar.tsx"
Cohesion: 0.08
Nodes (36): mainNav, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle() (+28 more)

### Community 7 - "cn"
Cohesion: 0.09
Nodes (32): TwoFactorPage(), StatCard(), Stat(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount() (+24 more)

### Community 8 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 9 - "order-form.tsx"
Cohesion: 0.10
Nodes (23): FormFieldProps, ASSETS, ConvertPage(), Field(), ASSETS, BuySellPage(), Side, trimAmount() (+15 more)

### Community 10 - "Nexora"
Cohesion: 0.06
Nodes (31): banner-design skill, better-auth skill, brand skill, CCXT, Client state (src/stores), Path alias convention (@/ -> src/), Prefer existing UI primitives convention, design skill (+23 more)

### Community 11 - "nav/index.tsx"
Cohesion: 0.08
Nodes (26): metadata, LandingFooter(), SOCIAL_ICONS, LandingNav(), FlyoutPanel(), MegaFlyout(), MegaListItem(), MobileNav() (+18 more)

### Community 12 - "trade-terminal.tsx"
Cohesion: 0.13
Nodes (14): TradePageProps, PriceAreaChart(), PriceAreaChartProps, OpenOrdersPanel(), OpenOrdersPanelProps, Timeframe, TIMEFRAMES, TradeTerminal() (+6 more)

### Community 13 - "product/catalog.ts"
Cohesion: 0.11
Nodes (14): DashboardProductPage(), MarketingProductShell(), ProductHubContent(), BOTS_PAGE, COPY_TRADING_PAGE, DASHBOARD_PRODUCT_PAGES, DEMO_PAGE, DEVELOPERS_PAGE (+6 more)

### Community 14 - "user-menu.tsx"
Cohesion: 0.12
Nodes (20): UserAvatar(), UserMenu(), UserMenuProps, OPTIONS, ThemeToggle(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent() (+12 more)

### Community 15 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 16 - "app/layout.tsx"
Cohesion: 0.18
Nodes (10): geistMono, geistSans, metadata, RootLayout(), size, DISALLOWED_PREFIXES, robots(), BuildMetadataOptions (+2 more)

### Community 17 - "landing/constants.ts"
Cohesion: 0.06
Nodes (45): AssetCard(), assetHref(), AssetsSection(), FaqSection(), FeaturesSection(), FinalCtaSection(), LearningSection(), MobileSection() (+37 more)

### Community 18 - "theme-provider.tsx"
Cohesion: 0.23
Nodes (16): ThemeContext, ThemeContextValue, ThemeProvider(), applyTheme(), readStoredTheme(), writeStoredTheme(), isTheme(), ResolvedTheme (+8 more)

### Community 20 - "types/exchange.ts"
Cohesion: 0.23
Nodes (12): AuthLiveMarkets(), formatMarketPrice(), MARKETS, useOrderBook(), BinanceDepthMessage, BinanceTickerMessage, getSignalingManager(), StreamCallback (+4 more)

### Community 21 - "dashboard-shell.tsx"
Cohesion: 0.18
Nodes (9): react, react, metadata, AppSidebar(), DashboardShell(), SidebarInset(), SidebarMenuSkeleton(), SidebarProvider() (+1 more)

### Community 22 - "better-auth"
Cohesion: 0.14
Nodes (15): better-auth, src/app/api/auth/[...all]/route.ts, DB schema/migration convention, src/lib/db/index.ts, DB area (src/lib/db), src/lib/db/schema.ts, drizzle/ (generated SQL migrations), Neon Postgres (+7 more)

### Community 23 - "Thin API route handlers convention"
Cohesion: 0.15
Nodes (14): src/lib/api/auth-guard.ts, Auth area (src/lib/auth, src/proxy.ts, src/lib/api/auth-guard.ts), Thin API route handlers convention, Private exchange routes require session convention, Exchange API keys only via ENCRYPTION_KEY storage convention, Server secrets via getEnv() convention, ENCRYPTION_KEY, src/lib/exchange/encryption.ts (+6 more)

### Community 24 - "research/page.tsx"
Cohesion: 0.22
Nodes (5): metadata, metadata, MarketingProductPage(), RESEARCH_PAGE, SECURITY_PAGE

### Community 25 - "coins/catalog.ts"
Cohesion: 0.20
Nodes (14): generateMetadata(), generateStaticParams(), PageProps, PriceSlugPage(), sitemap(), STATIC_ROUTES, hotCoins(), PopularPrices() (+6 more)

### Community 26 - "tabs.tsx"
Cohesion: 0.40
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 27 - "header.tsx"
Cohesion: 0.21
Nodes (7): ConnectionBadge(), ConnectionBadgeProps, DashboardOverview(), Header(), HeaderProps, Separator(), useWsConnection()

### Community 28 - "graphify"
Cohesion: 0.22
Nodes (9): 21st MCP server, API_KEY_21ST, graphify, graphify explain command, graphify MCP server, graphify path command, graphify query command, graphify update command (+1 more)

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
Cohesion: 0.18
Nodes (16): HeroScroll, Magnetic(), MagneticProps, ParallaxLayer(), ParallaxLayerProps, Spotlight(), SpotlightProps, Depth() (+8 more)

### Community 36 - "hero-dashboard.tsx"
Cohesion: 0.12
Nodes (19): ChartPanel(), GRIDLINES, TIMEFRAMES, ASKS, BEAT, BIDS, HERO_STATS, FloatingChip() (+11 more)

### Community 37 - "utils.ts"
Cohesion: 0.15
Nodes (19): ChangeBadge(), BuyWidget(), BuyWidgetProps, CoinPricePage(), CoinPricePageProps, RANGE_OPTIONS, RangeId, TabId (+11 more)

### Community 42 - "trust-bar.tsx"
Cohesion: 0.27
Nodes (8): TrustBar(), Stagger(), StaggerItem(), StaggerProps, TRUST_STATS, depthChild, depthParent(), REVEAL_VIEWPORT

### Community 50 - "use-count-up.ts"
Cohesion: 0.27
Nodes (9): CountUp(), CountUpProps, CountUpResult, easeOut(), Options, useCountUp(), formatMetric(), ParsedMetric (+1 more)

### Community 51 - "order-book-panel.tsx"
Cohesion: 0.24
Nodes (8): OrderBookPanel(), OrderBookPanelProps, OrderBookRow(), OrderForm(), OrderSide, OrderType, TradingState, useTradingStore

### Community 53 - "hero/index.tsx"
Cohesion: 0.31
Nodes (6): TRUST_MARKS, HeroBackdrop(), HeroCopy(), HeroDashboard(), HeroSection(), useHeroScroll()

### Community 56 - "hero-chart.ts"
Cohesion: 0.36
Nodes (7): buildChart(), buildSeries(), ChartPoint, HERO_CHART, HeroChart, mulberry32(), toPoints()

## Knowledge Gaps
- **268 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `21st`, `$schema`, `style`, `rsc` (+263 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `settings/page.tsx`, `markets-overview.tsx`, `notify/index.ts`, `hero-dashboard.tsx`, `utils.ts`, `motion/index.ts`, `sidebar.tsx`, `order-form.tsx`, `nav/index.tsx`, `trade-terminal.tsx`, `product/catalog.ts`, `user-menu.tsx`, `landing/constants.ts`, `order-book-panel.tsx`, `types/exchange.ts`, `dashboard-shell.tsx`, `tabs.tsx`, `header.tsx`?**
  _High betweenness centrality (0.462) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `dashboard-shell.tsx`, `Nexora`, `scripts`, `better-auth`?**
  _High betweenness centrality (0.233) - this node is a cross-community bridge._
- **Why does `react` connect `dashboard-shell.tsx` to `dependencies`, `sidebar.tsx`?**
  _High betweenness centrality (0.222) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `21st`, `$schema` to the rest of the system?**
  _268 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `settings/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05330564209068882 - nodes in this community are weakly interconnected._
- **Should `service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05490296220633299 - nodes in this community are weakly interconnected._
- **Should `markets-overview.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13105413105413105 - nodes in this community are weakly interconnected._