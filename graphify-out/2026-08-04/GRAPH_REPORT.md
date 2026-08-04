# Graph Report - .  (2026-08-04)

## Corpus Check
- 119 files · ~48,643 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 936 nodes · 2089 edges · 48 communities (38 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Auth Pages
- API Routes
- Marketing Pricing Pages
- Root Layout & Notify
- Runtime Dependencies
- Dev Dependencies
- Form & Sidebar UI
- Two-Factor & Avatar UI
- TypeScript Config
- Buy/Sell Trading UI
- CLAUDE.md Skills & Conventions
- Landing Nav UI
- Trade & Portfolio Pages
- Dashboard Feature Pages
- User Menu & Theme
- shadcn Components Config
- Landing Marketing Sections
- Demo Trading UI
- Marketing Content Pages
- WebSocket Signaling
- Live Market Data Hooks
- Landing Security Section
- DB & Auth Conventions
- API Route Conventions
- Trading Chart Components
- Dashboard Shell Layout
- Convert Product Page
- Dashboard Overview & Markets
- graphify Commands (CLAUDE.md)
- Landing Asset Cards
- Landing Mobile Section
- Marketing Home Page
- MCP Server Config
- Notify Toast Convention
- graphify Output Files
- Security Marketing Page
- Zustand Client State
- Landing Learning Section
- Badge UI Component
- ESLint Config
- Next.js Config
- React Hook Form Dep
- PostCSS Config
- Encryption at Rest
- Server-Only CCXT

## God Nodes (most connected - your core abstractions)
1. `cn()` - 194 edges
2. `Nexora` - 41 edges
3. `Button()` - 29 edges
4. `formatPrice()` - 27 edges
5. `compilerOptions` - 16 edges
6. `scripts` - 16 edges
7. `SignalingManager` - 16 edges
8. `authClient` - 13 edges
9. `jsonError()` - 12 edges
10. `isSupportedExchange()` - 12 edges

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

## Communities (48 total, 10 thin omitted)

### Community 0 - "Auth Pages"
Cohesion: 0.05
Nodes (73): DevAuthEmail, extractUrl(), ForgotPasswordPage(), LoginPage(), authInputClassName, AuthError(), AuthFooterLink(), AuthPanel() (+65 more)

### Community 1 - "API Routes"
Cohesion: 0.05
Nodes (67): { GET, POST }, GET(), GET(), connectionSchema, GET(), PATCH(), POST(), GET() (+59 more)

### Community 2 - "Marketing Pricing Pages"
Cohesion: 0.06
Nodes (51): generateMetadata(), generateStaticParams(), PageProps, PriceSlugPage(), LandingFooter(), SOCIAL_ICONS, NexoraLogo(), NexoraLogoProps (+43 more)

### Community 3 - "Root Layout & Notify"
Cohesion: 0.08
Nodes (32): geistMono, geistSans, metadata, NetworkStatusToast(), formatRelativeTime(), HistoryRow(), NotificationBell(), variantMeta (+24 more)

### Community 4 - "Runtime Dependencies"
Cohesion: 0.05
Nodes (41): @base-ui/react, @better-auth/infra, ccxt, class-variance-authority, clsx, @hookform/resolvers, jose, lightweight-charts (+33 more)

### Community 5 - "Dev Dependencies"
Cohesion: 0.05
Nodes (38): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, tailwindcss (+30 more)

### Community 6 - "Form & Sidebar UI"
Cohesion: 0.09
Nodes (31): FormFieldProps, mainNav, Input(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter() (+23 more)

### Community 7 - "Two-Factor & Avatar UI"
Cohesion: 0.10
Nodes (30): TwoFactorPage(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb() (+22 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 9 - "Buy/Sell Trading UI"
Cohesion: 0.11
Nodes (18): ASSETS, BuySellPage(), Side, trimAmount(), OrderFormProps, SIZE_PERCENTS, Dialog(), DialogContent() (+10 more)

### Community 10 - "CLAUDE.md Skills & Conventions"
Cohesion: 0.07
Nodes (28): banner-design skill, better-auth skill, brand skill, CCXT, Path alias convention (@/ -> src/), Prefer existing UI primitives convention, design skill, design-system skill (+20 more)

### Community 11 - "Landing Nav UI"
Cohesion: 0.10
Nodes (21): hotCoins(), MegaFlyout(), Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay() (+13 more)

### Community 12 - "Trade & Portfolio Pages"
Cohesion: 0.11
Nodes (19): PortfolioPage(), TradePageProps, OpenOrdersPanel(), OrderBookPanel(), OrderBookPanelProps, OrderBookRow(), OrderForm(), TickerBar() (+11 more)

### Community 13 - "Dashboard Feature Pages"
Cohesion: 0.14
Nodes (10): DashboardProductPage(), BOTS_PAGE, COPY_TRADING_PAGE, DASHBOARD_PRODUCT_PAGES, DEMO_PAGE, DEVELOPERS_PAGE, EARN_PAGE, FUTURES_PAGE (+2 more)

### Community 14 - "User Menu & Theme"
Cohesion: 0.13
Nodes (18): UserAvatar(), UserMenuProps, OPTIONS, ThemeToggle(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup() (+10 more)

### Community 15 - "shadcn Components Config"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 16 - "Landing Marketing Sections"
Cohesion: 0.13
Nodes (12): FaqSection(), FeaturesSection(), FinalCtaSection(), HeroSection(), PricingSection(), TestimonialsSection(), TrustBar(), FAQS (+4 more)

### Community 17 - "Demo Trading UI"
Cohesion: 0.14
Nodes (12): StatCard(), StatCardProps, useReveal(), TradeDemoSection(), DemoTradingPage(), PaperTradeSimulator(), PaperTradeSimulatorProps, Position (+4 more)

### Community 18 - "Marketing Content Pages"
Cohesion: 0.12
Nodes (11): metadata, metadata, metadata, metadata, LandingNav(), MarketingProductPage(), MarketingProductShell(), ACADEMY_PAGE (+3 more)

### Community 19 - "WebSocket Signaling"
Cohesion: 0.23
Nodes (4): toBinanceSymbol(), SignalingManager, OrderBook, Ticker

### Community 20 - "Live Market Data Hooks"
Cohesion: 0.19
Nodes (12): AuthLiveMarkets(), formatMarketPrice(), MARKETS, useOrderBook(), useTicker(), useWsConnection(), BinanceDepthMessage, BinanceTickerMessage (+4 more)

### Community 21 - "Landing Security Section"
Cohesion: 0.22
Nodes (13): SecuritySection(), NAV_LINKS, SECURITY_ITEMS, SECURITY_ORBIT_ICONS, Asset, FaqItem, Feature, LearningItem (+5 more)

### Community 22 - "DB & Auth Conventions"
Cohesion: 0.14
Nodes (15): better-auth, src/app/api/auth/[...all]/route.ts, DB schema/migration convention, src/lib/db/index.ts, DB area (src/lib/db), src/lib/db/schema.ts, drizzle/ (generated SQL migrations), Neon Postgres (+7 more)

### Community 23 - "API Route Conventions"
Cohesion: 0.15
Nodes (14): src/lib/api/auth-guard.ts, Auth area (src/lib/auth, src/proxy.ts, src/lib/api/auth-guard.ts), Thin API route handlers convention, Private exchange routes require session convention, Exchange API keys only via ENCRYPTION_KEY storage convention, Server secrets via getEnv() convention, ENCRYPTION_KEY, src/lib/exchange/encryption.ts (+6 more)

### Community 24 - "Trading Chart Components"
Cohesion: 0.20
Nodes (10): PriceAreaChart(), PriceAreaChartProps, OpenOrdersPanelProps, TradingChart(), TradingChartProps, notify, Balance, ExchangeOrder (+2 more)

### Community 25 - "Dashboard Shell Layout"
Cohesion: 0.20
Nodes (8): react, react, AppSidebar(), DashboardShell(), SidebarInset(), SidebarMenuSkeleton(), SidebarProvider(), useIsMobile()

### Community 26 - "Convert Product Page"
Cohesion: 0.20
Nodes (7): ASSETS, ConvertPage(), Field(), ProductHubContent(), CONVERT_PAGE, ProductCard, ProductPageContent

### Community 27 - "Dashboard Overview & Markets"
Cohesion: 0.21
Nodes (6): ConnectionBadge(), ConnectionBadgeProps, DashboardOverview(), Header(), HeaderProps, UserMenu()

### Community 28 - "graphify Commands (CLAUDE.md)"
Cohesion: 0.22
Nodes (9): 21st MCP server, API_KEY_21ST, graphify, graphify explain command, graphify MCP server, graphify path command, graphify query command, graphify update command (+1 more)

### Community 29 - "Landing Asset Cards"
Cohesion: 0.38
Nodes (5): AssetCard(), assetHref(), AssetsSection(), Sparkline(), SparklineProps

### Community 30 - "Landing Mobile Section"
Cohesion: 0.33
Nodes (4): MobileSection(), PhoneMockProps, ASSETS, MOBILE_FEATURES

### Community 32 - "MCP Server Config"
Cohesion: 0.50
Nodes (3): 21st, graphify, ${userHome}/.local/bin/graphify-mcp

### Community 33 - "Notify Toast Convention"
Cohesion: 0.67
Nodes (4): Client feedback via notify() convention, notify() / notify.order(), Notify (src/lib/notify), notify skill

### Community 34 - "graphify Output Files"
Cohesion: 0.50
Nodes (4): graphify-out/graph.json, graphify-out/GRAPH_REPORT.md, graphify-out/, graphify-out/wiki/index.md

### Community 36 - "Zustand Client State"
Cohesion: 0.67
Nodes (3): Client state (src/stores), zustand, zustand

## Knowledge Gaps
- **239 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `$schema`, `style`, `rsc`, `tsx` (+234 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Two-Factor & Avatar UI` to `Auth Pages`, `Marketing Pricing Pages`, `Root Layout & Notify`, `Badge UI Component`, `Form & Sidebar UI`, `Buy/Sell Trading UI`, `Landing Nav UI`, `Trade & Portfolio Pages`, `User Menu & Theme`, `Demo Trading UI`, `Marketing Content Pages`, `Live Market Data Hooks`, `Trading Chart Components`, `Dashboard Shell Layout`, `Convert Product Page`, `Dashboard Overview & Markets`?**
  _High betweenness centrality (0.455) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Zustand Client State`, `Dev Dependencies`, `React Hook Form Dep`, `DB & Auth Conventions`, `Dashboard Shell Layout`?**
  _High betweenness centrality (0.274) - this node is a cross-community bridge._
- **Why does `react` connect `Dashboard Shell Layout` to `Runtime Dependencies`, `Form & Sidebar UI`?**
  _High betweenness centrality (0.260) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `$schema`, `style` to the rest of the system?**
  _239 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.051544791181493556 - nodes in this community are weakly interconnected._
- **Should `API Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.051201671891327065 - nodes in this community are weakly interconnected._
- **Should `Marketing Pricing Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.05673076923076923 - nodes in this community are weakly interconnected._