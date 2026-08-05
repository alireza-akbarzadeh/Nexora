# Graph Report - Nexora  (2026-08-05)

## Corpus Check
- 221 files · ~56,961 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1113 nodes · 2588 edges · 60 communities (51 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1c35afff`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- login-page.tsx
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
- product-hub.tsx
- coins/catalog.ts
- settings/page.tsx
- header.tsx
- graphify
- field.tsx
- security-settings.tsx
- metadata.ts
- mcp.json
- Client feedback via notify() convention
- graphify-out/
- motion/index.ts
- hero/constants.ts
- utils.ts
- button.tsx
- eslint.config.mjs
- next.config.ts
- dashboard-breadcrumb.tsx
- postcss.config.mjs
- (auth)/layout.tsx
- AES-256-GCM At Rest
- Server-Only CCXT
- hero-dashboard.tsx
- sheet.tsx
- use-count-up.ts
- order-book-panel.tsx
- two-factor-verify.tsx
- hero/index.tsx
- Exchange API keys only via ENCRYPTION_KEY storage convention
- react
- chart-panel.tsx
- research/page.tsx
- Prefer existing UI primitives convention
- pnpm db:push

## God Nodes (most connected - your core abstractions)
1. `cn()` - 206 edges
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

## Communities (60 total, 9 thin omitted)

### Community 0 - "login-page.tsx"
Cohesion: 0.14
Nodes (19): DevAuthEmail, extractUrl(), ForgotPasswordPage(), LoginPage(), TwoFactorPage(), AuthError(), AuthFooterLink(), AuthPanel() (+11 more)

### Community 1 - "service.ts"
Cohesion: 0.05
Nodes (68): { GET, POST }, GET(), GET(), connectionSchema, GET(), PATCH(), POST(), GET() (+60 more)

### Community 2 - "markets-overview.tsx"
Cohesion: 0.13
Nodes (21): PortfolioPage(), baseOf(), Category, HighlightCard(), MarketsOverview(), NEW_BASES, SortableHead(), SortDir (+13 more)

### Community 3 - "notify/index.ts"
Cohesion: 0.11
Nodes (24): NetworkStatusToast(), NotifyProvider(), NotifyToaster(), NotifyToastItem(), variantStyles, Providers(), NetworkStatus, useNetworkStatus() (+16 more)

### Community 4 - "dependencies"
Cohesion: 0.04
Nodes (46): @base-ui/react, @better-auth/infra, ccxt, class-variance-authority, Client state (src/stores), clsx, @hookform/resolvers, jose (+38 more)

### Community 5 - "scripts"
Cohesion: 0.05
Nodes (38): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, tailwindcss (+30 more)

### Community 6 - "sidebar.tsx"
Cohesion: 0.10
Nodes (29): mainNav, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarGroupAction() (+21 more)

### Community 7 - "cn"
Cohesion: 0.17
Nodes (18): ConnectionBadge(), ConnectionBadgeProps, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage() (+10 more)

### Community 8 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 9 - "order-form.tsx"
Cohesion: 0.11
Nodes (20): ASSETS, BuySellPage(), Side, trimAmount(), OrderFormProps, SIZE_PERCENTS, Dialog(), DialogContent() (+12 more)

### Community 10 - "Nexora"
Cohesion: 0.08
Nodes (24): banner-design skill, better-auth skill, brand skill, CCXT, Path alias convention (@/ -> src/), design skill, design-system skill, drizzle skill (+16 more)

### Community 11 - "nav/index.tsx"
Cohesion: 0.09
Nodes (24): metadata, LandingFooter(), SOCIAL_LINKS, LandingNav(), FlyoutPanel(), MegaFlyout(), MegaListItem(), MobileNav() (+16 more)

### Community 12 - "trade-terminal.tsx"
Cohesion: 0.15
Nodes (12): TradePageProps, PriceAreaChart(), PriceAreaChartProps, OpenOrdersPanel(), Timeframe, TIMEFRAMES, TradeTerminal(), TradeTerminalProps (+4 more)

### Community 13 - "product/catalog.ts"
Cohesion: 0.13
Nodes (11): DashboardProductPage(), ProductHubContent(), BOTS_PAGE, COPY_TRADING_PAGE, DASHBOARD_PRODUCT_PAGES, DEMO_PAGE, DEVELOPERS_PAGE, EARN_PAGE (+3 more)

### Community 14 - "user-menu.tsx"
Cohesion: 0.10
Nodes (25): NavActions(), NavActionsProps, UserAvatar(), UserMenu(), UserMenuProps, formatRelativeTime(), HistoryRow(), NotificationBell() (+17 more)

### Community 15 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 16 - "app/layout.tsx"
Cohesion: 0.19
Nodes (11): geistMono, geistSans, metadata, RootLayout(), DISALLOWED_PREFIXES, robots(), sitemap(), STATIC_ROUTES (+3 more)

### Community 17 - "landing/constants.ts"
Cohesion: 0.05
Nodes (57): AssetCard(), assetHref(), AssetsSection(), FaqSection(), FeaturesSection(), FinalCtaSection(), LearningSection(), MobileSection() (+49 more)

### Community 18 - "theme-provider.tsx"
Cohesion: 0.18
Nodes (21): ThemeContext, ThemeContextValue, ThemeProvider(), useTheme(), applyTheme(), readStoredTheme(), writeStoredTheme(), COLOR_SCHEME_QUERY (+13 more)

### Community 19 - "SignalingManager"
Cohesion: 0.24
Nodes (3): toBinanceSymbol(), SignalingManager, OrderBook

### Community 20 - "types/exchange.ts"
Cohesion: 0.23
Nodes (11): AuthLiveMarkets(), formatMarketPrice(), MARKETS, useOrderBook(), BinanceDepthMessage, BinanceTickerMessage, getSignalingManager(), StreamCallback (+3 more)

### Community 21 - "dashboard-shell.tsx"
Cohesion: 0.19
Nodes (9): metadata, AppSidebar(), BottomBar(), BottomBarProps, DEFAULT_LINKS, TickerItem, DashboardShell(), SidebarInset() (+1 more)

### Community 22 - "better-auth"
Cohesion: 0.14
Nodes (15): better-auth, src/app/api/auth/[...all]/route.ts, DB schema/migration convention, src/lib/db/index.ts, DB area (src/lib/db), src/lib/db/schema.ts, drizzle/ (generated SQL migrations), Neon Postgres (+7 more)

### Community 23 - "Thin API route handlers convention"
Cohesion: 0.22
Nodes (8): src/lib/api/auth-guard.ts, Auth area (src/lib/auth, src/proxy.ts, src/lib/api/auth-guard.ts), Thin API route handlers convention, Server secrets via getEnv() convention, Env (src/lib/env.ts), jsonError(), Routes area (src/app/(marketing), (auth), (dashboard), api/**), Zod

### Community 24 - "product-hub.tsx"
Cohesion: 0.11
Nodes (12): metadata, metadata, metadata, metadata, MarketingProductPage(), MarketingProductShell(), ACADEMY_PAGE, COMMUNITY_PAGE (+4 more)

### Community 25 - "coins/catalog.ts"
Cohesion: 0.24
Nodes (12): generateMetadata(), generateStaticParams(), PageProps, PriceSlugPage(), hotCoins(), PopularPrices(), bySlug, coinPricePath() (+4 more)

### Community 26 - "settings/page.tsx"
Cohesion: 0.17
Nodes (17): DashboardOverview(), StatCard(), AccountSettings(), NotificationSettings(), Badge(), badgeVariants, Card(), CardAction() (+9 more)

### Community 27 - "header.tsx"
Cohesion: 0.40
Nodes (4): Header(), HeaderProps, ThemeToggle(), Separator()

### Community 28 - "graphify"
Cohesion: 0.22
Nodes (9): 21st MCP server, API_KEY_21ST, graphify, graphify explain command, graphify MCP server, graphify path command, graphify query command, graphify update command (+1 more)

### Community 29 - "field.tsx"
Cohesion: 0.14
Nodes (19): authInputClassName, authLabelClassName, SetupStep, FormPasswordField(), FormPasswordFieldProps, FormFieldProps, Field(), FieldContent() (+11 more)

### Community 30 - "security-settings.tsx"
Cohesion: 0.12
Nodes (21): formatDate(), SecuritySettings(), SessionRow, truncateUa(), ChangePasswordFormValues, changePasswordSchema, ForgotPasswordFormValues, forgotPasswordSchema (+13 more)

### Community 31 - "metadata.ts"
Cohesion: 0.18
Nodes (11): metadata, alt, contentType, size, LandingPage(), BuildMetadataOptions, OG_IMAGE_HEIGHT, OG_IMAGE_PATH (+3 more)

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

### Community 36 - "hero/constants.ts"
Cohesion: 0.22
Nodes (10): ASKS, BIDS, HERO_STATS, SPREAD_LABEL, OrderBookCard(), StatTiles(), HeroStat, OrderRow (+2 more)

### Community 37 - "utils.ts"
Cohesion: 0.14
Nodes (21): ChangeBadge(), BuyWidget(), BuyWidgetProps, CoinPricePage(), CoinPricePageProps, RANGE_OPTIONS, RangeId, Stat() (+13 more)

### Community 38 - "button.tsx"
Cohesion: 0.15
Nodes (11): ASSETS, ConvertPage(), Field(), OpenOrdersPanelProps, Button(), buttonVariants, sizeMap, Spinner() (+3 more)

### Community 42 - "dashboard-breadcrumb.tsx"
Cohesion: 0.26
Nodes (11): Crumb, DynamicBreadcrumb(), DynamicBreadcrumbProps, toLabel(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink() (+3 more)

### Community 48 - "hero-dashboard.tsx"
Cohesion: 0.26
Nodes (8): BEAT, FloatingChip(), FloatingChipProps, PortfolioCard(), Bezier, EASE_IN_OUT, EASE_OUT, EXIT_RATIO

### Community 49 - "sheet.tsx"
Cohesion: 0.20
Nodes (7): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 50 - "use-count-up.ts"
Cohesion: 0.27
Nodes (9): CountUp(), CountUpProps, CountUpResult, easeOut(), Options, useCountUp(), formatMetric(), ParsedMetric (+1 more)

### Community 51 - "order-book-panel.tsx"
Cohesion: 0.24
Nodes (8): OrderBookPanel(), OrderBookPanelProps, OrderBookRow(), OrderForm(), OrderSide, OrderType, TradingState, useTradingStore

### Community 52 - "two-factor-verify.tsx"
Cohesion: 0.32
Nodes (4): OtpInput(), OtpInputProps, TwoFactorVerifyProps, Switch()

### Community 53 - "hero/index.tsx"
Cohesion: 0.25
Nodes (7): TRUST_MARKS, HeroBackdrop(), HeroCopy(), HeroDashboard(), HeroSection(), HeroScroll, useHeroScroll()

### Community 54 - "Exchange API keys only via ENCRYPTION_KEY storage convention"
Cohesion: 0.40
Nodes (6): Private exchange routes require session convention, Exchange API keys only via ENCRYPTION_KEY storage convention, ENCRYPTION_KEY, src/lib/exchange/encryption.ts, Exchange area (src/lib/exchange, src/app/api/exchange, src/app/api/market), requireSession()

### Community 55 - "react"
Cohesion: 0.40
Nodes (5): react, react, SidebarMenuSkeleton(), SidebarProvider(), useIsMobile()

### Community 56 - "chart-panel.tsx"
Cohesion: 0.18
Nodes (11): ChartPanel(), GRIDLINES, TIMEFRAMES, buildChart(), buildSeries(), CHART_HEIGHT, CHART_WIDTH, ChartPoint (+3 more)

## Knowledge Gaps
- **275 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `21st`, `$schema`, `style`, `rsc` (+270 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `login-page.tsx`, `markets-overview.tsx`, `notify/index.ts`, `sidebar.tsx`, `order-form.tsx`, `nav/index.tsx`, `trade-terminal.tsx`, `product/catalog.ts`, `user-menu.tsx`, `landing/constants.ts`, `types/exchange.ts`, `dashboard-shell.tsx`, `product-hub.tsx`, `settings/page.tsx`, `header.tsx`, `field.tsx`, `motion/index.ts`, `utils.ts`, `button.tsx`, `dashboard-breadcrumb.tsx`, `hero-dashboard.tsx`, `sheet.tsx`, `order-book-panel.tsx`, `two-factor-verify.tsx`, `react`?**
  _High betweenness centrality (0.457) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`, `better-auth`, `react`?**
  _High betweenness centrality (0.232) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `dashboard-breadcrumb.tsx`, `dependencies`, `sidebar.tsx`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `21st`, `$schema` to the rest of the system?**
  _275 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `login-page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14444444444444443 - nodes in this community are weakly interconnected._
- **Should `service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05490296220633299 - nodes in this community are weakly interconnected._
- **Should `markets-overview.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12535612535612536 - nodes in this community are weakly interconnected._