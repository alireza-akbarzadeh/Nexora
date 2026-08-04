# Graph Report - Nexora  (2026-08-04)

## Corpus Check
- 210 files · ~55,042 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1058 nodes · 2413 edges · 60 communities (52 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d61f4cd6`
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
- coin-price-page.tsx
- trade-terminal.tsx
- product/catalog.ts
- user-menu.tsx
- components.json
- landing-page.tsx
- paper-trade-simulator.tsx
- theme-provider.tsx
- SignalingManager
- signaling-manager.ts
- landing/constants.ts
- better-auth
- Thin API route handlers convention
- settings/page.tsx
- dashboard-shell.tsx
- security-settings.tsx
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
- button.tsx
- eslint.config.mjs
- next.config.ts
- trust-bar.tsx
- postcss.config.mjs
- AES-256-GCM At Rest
- Server-Only CCXT
- field.tsx
- hero/constants.ts
- use-count-up.ts
- order-book-panel.tsx
- sheet.tsx
- hero/index.tsx
- spinner.tsx
- footer.tsx
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
10. `usePrefersReducedMotion()` - 13 edges

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

## Communities (60 total, 8 thin omitted)

### Community 0 - "login-page.tsx"
Cohesion: 0.17
Nodes (17): DevAuthEmail, extractUrl(), ForgotPasswordPage(), TwoFactorPage(), AuthError(), AuthFooterLink(), AuthPanel(), AuthPanelProps (+9 more)

### Community 1 - "service.ts"
Cohesion: 0.05
Nodes (70): { GET, POST }, GET(), GET(), connectionSchema, GET(), PATCH(), POST(), GET() (+62 more)

### Community 2 - "markets-overview.tsx"
Cohesion: 0.13
Nodes (22): PortfolioPage(), baseOf(), Category, HighlightCard(), MarketsOverview(), NEW_BASES, SortableHead(), SortDir (+14 more)

### Community 3 - "notify/index.ts"
Cohesion: 0.11
Nodes (26): NavActions(), NavActionsProps, formatRelativeTime(), HistoryRow(), NotificationBell(), variantMeta, NotifyProvider(), NotifyToaster() (+18 more)

### Community 4 - "dependencies"
Cohesion: 0.04
Nodes (46): @base-ui/react, @better-auth/infra, ccxt, class-variance-authority, Client state (src/stores), clsx, @hookform/resolvers, jose (+38 more)

### Community 5 - "scripts"
Cohesion: 0.05
Nodes (38): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, tailwindcss (+30 more)

### Community 6 - "sidebar.tsx"
Cohesion: 0.10
Nodes (30): mainNav, Separator(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup() (+22 more)

### Community 7 - "cn"
Cohesion: 0.14
Nodes (23): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+15 more)

### Community 8 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 9 - "order-form.tsx"
Cohesion: 0.11
Nodes (19): ASSETS, BuySellPage(), Side, trimAmount(), OrderFormProps, SIZE_PERCENTS, Dialog(), DialogContent() (+11 more)

### Community 10 - "Nexora"
Cohesion: 0.08
Nodes (24): banner-design skill, better-auth skill, brand skill, CCXT, Path alias convention (@/ -> src/), design skill, design-system skill, drizzle skill (+16 more)

### Community 11 - "coin-price-page.tsx"
Cohesion: 0.06
Nodes (45): generateMetadata(), generateStaticParams(), PageProps, PriceSlugPage(), LandingNav(), FlyoutPanel(), MegaFlyout(), MegaListItem() (+37 more)

### Community 12 - "trade-terminal.tsx"
Cohesion: 0.19
Nodes (8): TradePageProps, OpenOrdersPanel(), OpenOrdersPanelProps, Timeframe, TIMEFRAMES, TradeTerminal(), TradeTerminalProps, fromBinanceSymbol()

### Community 13 - "product/catalog.ts"
Cohesion: 0.07
Nodes (26): metadata, metadata, metadata, metadata, metadata, DashboardProductPage(), MarketingProductPage(), MarketingProductShell() (+18 more)

### Community 14 - "user-menu.tsx"
Cohesion: 0.11
Nodes (21): UserAvatar(), UserMenu(), UserMenuProps, OPTIONS, ThemeToggle(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent() (+13 more)

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
Cohesion: 0.14
Nodes (19): geistMono, geistSans, metadata, NetworkStatusToast(), Providers(), ThemeContext, ThemeContextValue, ThemeProvider() (+11 more)

### Community 19 - "SignalingManager"
Cohesion: 0.24
Nodes (3): toBinanceSymbol(), SignalingManager, Ticker

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

### Community 24 - "settings/page.tsx"
Cohesion: 0.21
Nodes (15): StatCard(), AccountSettings(), NotificationSettings(), Card(), CardAction(), CardContent(), CardDescription(), CardFooter() (+7 more)

### Community 25 - "dashboard-shell.tsx"
Cohesion: 0.20
Nodes (8): react, react, AppSidebar(), DashboardShell(), SidebarInset(), SidebarMenuSkeleton(), SidebarProvider(), useIsMobile()

### Community 26 - "security-settings.tsx"
Cohesion: 0.11
Nodes (23): formatDate(), SecuritySettings(), SessionRow, truncateUa(), ChangePasswordFormValues, changePasswordSchema, EnableTwoFactorFormValues, enableTwoFactorSchema (+15 more)

### Community 27 - "header.tsx"
Cohesion: 0.16
Nodes (10): ConnectionBadge(), ConnectionBadgeProps, DashboardOverview(), Header(), HeaderProps, ASSETS, ConvertPage(), Field() (+2 more)

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
Cohesion: 0.18
Nodes (15): HeroScroll, Magnetic(), MagneticProps, ParallaxLayer(), ParallaxLayerProps, Spotlight(), SpotlightProps, Depth() (+7 more)

### Community 36 - "hero-dashboard.tsx"
Cohesion: 0.16
Nodes (12): ChartPanel(), GRIDLINES, TIMEFRAMES, BEAT, FloatingChip(), FloatingChipProps, PortfolioCard(), StatTiles() (+4 more)

### Community 37 - "utils.ts"
Cohesion: 0.18
Nodes (12): FormFieldProps, ChangeBadge(), BuyWidget(), featuredSymbols, MarketCard(), MarketOverview(), TickerBar(), TickerBarProps (+4 more)

### Community 38 - "button.tsx"
Cohesion: 0.22
Nodes (9): authInputClassName, OtpInput(), OtpInputProps, SetupStep, TwoFactorVerifyProps, FormPasswordField(), FormPasswordFieldProps, Button() (+1 more)

### Community 42 - "trust-bar.tsx"
Cohesion: 0.21
Nodes (10): TrustBar(), Reveal(), RevealProps, Stagger(), StaggerItem(), StaggerProps, TRUST_STATS, depthChild (+2 more)

### Community 48 - "field.tsx"
Cohesion: 0.23
Nodes (10): Field(), FieldContent(), FieldDescription(), FieldError(), FieldLabel(), FieldLegend(), FieldSeparator(), FieldSet() (+2 more)

### Community 49 - "hero/constants.ts"
Cohesion: 0.27
Nodes (8): ASKS, BIDS, HERO_STATS, OrderBookCard(), HeroStat, OrderRow, OrderSide, TrustMark

### Community 50 - "use-count-up.ts"
Cohesion: 0.27
Nodes (9): CountUp(), CountUpProps, CountUpResult, easeOut(), Options, useCountUp(), formatMetric(), ParsedMetric (+1 more)

### Community 51 - "order-book-panel.tsx"
Cohesion: 0.24
Nodes (9): OrderBookPanel(), OrderBookPanelProps, OrderBookRow(), OrderForm(), OrderSide, OrderType, TradingState, useTradingStore (+1 more)

### Community 52 - "sheet.tsx"
Cohesion: 0.20
Nodes (7): SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle(), SheetTrigger()

### Community 53 - "hero/index.tsx"
Cohesion: 0.31
Nodes (6): TRUST_MARKS, HeroBackdrop(), HeroCopy(), HeroDashboard(), HeroSection(), useHeroScroll()

### Community 54 - "spinner.tsx"
Cohesion: 0.29
Nodes (5): LoginPage(), LoadingIndicator(), sizeMap, Spinner(), SpinnerProps

### Community 55 - "footer.tsx"
Cohesion: 0.33
Nodes (5): LandingFooter(), SOCIAL_ICONS, NexoraLogo(), NexoraLogoProps, FOOTER_GROUPS

### Community 56 - "hero-chart.ts"
Cohesion: 0.43
Nodes (6): buildChart(), buildSeries(), ChartPoint, HeroChart, mulberry32(), toPoints()

### Community 57 - "Exchange API keys only via ENCRYPTION_KEY storage convention"
Cohesion: 0.40
Nodes (6): Private exchange routes require session convention, Exchange API keys only via ENCRYPTION_KEY storage convention, ENCRYPTION_KEY, src/lib/exchange/encryption.ts, Exchange area (src/lib/exchange, src/app/api/exchange, src/app/api/market), requireSession()

## Knowledge Gaps
- **261 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `21st`, `$schema`, `style`, `rsc` (+256 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `login-page.tsx`, `markets-overview.tsx`, `notify/index.ts`, `sidebar.tsx`, `order-form.tsx`, `coin-price-page.tsx`, `trade-terminal.tsx`, `product/catalog.ts`, `user-menu.tsx`, `paper-trade-simulator.tsx`, `theme-provider.tsx`, `signaling-manager.ts`, `settings/page.tsx`, `dashboard-shell.tsx`, `header.tsx`, `motion/index.ts`, `hero-dashboard.tsx`, `utils.ts`, `button.tsx`, `field.tsx`, `order-book-panel.tsx`, `sheet.tsx`, `spinner.tsx`?**
  _High betweenness centrality (0.486) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `dashboard-shell.tsx`, `scripts`, `better-auth`?**
  _High betweenness centrality (0.235) - this node is a cross-community bridge._
- **Why does `react` connect `dashboard-shell.tsx` to `dependencies`, `sidebar.tsx`?**
  _High betweenness centrality (0.224) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `21st`, `$schema` to the rest of the system?**
  _261 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05327281414237936 - nodes in this community are weakly interconnected._
- **Should `markets-overview.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13230769230769232 - nodes in this community are weakly interconnected._
- **Should `notify/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10810810810810811 - nodes in this community are weakly interconnected._