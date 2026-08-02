# Graph Report - Nexora  (2026-08-02)

## Corpus Check
- 174 files · ~49,628 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 889 nodes · 2054 edges · 43 communities (38 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b6ce2efb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- service.ts
- markets-overview.tsx
- login-page.tsx
- dependencies
- scripts
- sidebar.tsx
- compilerOptions
- product/catalog.ts
- CCXT Exchange Layer
- order-form.tsx
- cn
- components.json
- landing-page.tsx
- constants.ts
- paper-trade-simulator.tsx
- footer.tsx
- dashboard-shell.tsx
- two-factor-setup.tsx
- notify/index.ts
- security-settings.tsx
- mobile-section.tsx
- (marketing)/page.tsx
- Skills CLI
- graphify
- SignalingManager
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- Nexora Notify
- utils.ts
- nav.tsx
- user-menu.tsx
- settings/page.tsx
- assets.tsx
- trade-terminal.tsx
- signaling-manager.ts
- formatPrice
- spinner.tsx
- dashboard-overview.tsx
- types/exchange.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 189 edges
2. `Button()` - 28 edges
3. `formatPrice()` - 27 edges
4. `scripts` - 16 edges
5. `jsonError()` - 16 edges
6. `isSupportedExchange()` - 16 edges
7. `SignalingManager` - 16 edges
8. `compilerOptions` - 16 edges
9. `requireSession()` - 13 edges
10. `authClient` - 13 edges

## Surprising Connections (you probably didn't know these)
- `AES-256-GCM At Rest` --semantically_similar_to--> `AES API Key Encryption`  [INFERRED] [semantically similar]
  README.md → .cursor/skills/exchange-ccxt/SKILL.md
- `Binance Public WebSockets` --conceptually_related_to--> `CCXT Exchange Layer`  [INFERRED]
  README.md → .cursor/skills/exchange-ccxt/SKILL.md
- `useSidebar()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `Nexora` --references--> `Neon Postgres`  [EXTRACTED]
  README.md → .cursor/skills/drizzle/SKILL.md
- `Server-Only CCXT` --rationale_for--> `CCXT Exchange Layer`  [EXTRACTED]
  README.md → .cursor/skills/exchange-ccxt/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Nexora Auth Stack** — _cursor_skills_better_auth_skill_better_auth, _cursor_skills_better_auth_skill_drizzle_adapter, _cursor_skills_better_auth_skill_require_session, _cursor_skills_better_auth_skill_proxy_route_guard, _cursor_skills_better_auth_skill_auth_tables [EXTRACTED 1.00]
- **Exchange Credential Security Flow** — _cursor_skills_exchange_ccxt_skill_aes_encryption, _cursor_skills_exchange_ccxt_skill_encryption_key, _cursor_skills_drizzle_skill_exchange_connections, _cursor_skills_exchange_ccxt_skill_validate_credentials, _cursor_skills_better_auth_skill_require_session [INFERRED 0.85]
- **Nexora Data Layer** — _cursor_skills_drizzle_skill_drizzle_orm, _cursor_skills_drizzle_skill_neon_postgres, _cursor_skills_drizzle_skill_schema_ts, _cursor_skills_drizzle_skill_migration_workflow [EXTRACTED 1.00]

## Communities (43 total, 5 thin omitted)

### Community 0 - "service.ts"
Cohesion: 0.06
Nodes (67): { GET, POST }, GET(), GET(), connectionSchema, GET(), PATCH(), POST(), GET() (+59 more)

### Community 1 - "markets-overview.tsx"
Cohesion: 0.07
Nodes (46): generateMetadata(), generateStaticParams(), PageProps, PriceSlugPage(), baseOf(), Category, ChangeBadge(), HighlightCard() (+38 more)

### Community 2 - "login-page.tsx"
Cohesion: 0.14
Nodes (20): DevAuthEmail, extractUrl(), ForgotPasswordPage(), TwoFactorPage(), AuthError(), AuthFooterLink(), AuthPanel(), AuthPanelProps (+12 more)

### Community 3 - "dependencies"
Cohesion: 0.04
Nodes (47): @base-ui/react, better-auth, @better-auth/infra, ccxt, class-variance-authority, clsx, drizzle-orm, @hookform/resolvers (+39 more)

### Community 4 - "scripts"
Cohesion: 0.05
Nodes (38): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, tailwindcss (+30 more)

### Community 5 - "sidebar.tsx"
Cohesion: 0.10
Nodes (29): mainNav, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarGroupAction() (+21 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 8 - "product/catalog.ts"
Cohesion: 0.06
Nodes (32): metadata, metadata, metadata, metadata, metadata, LandingNav(), ASSETS, ConvertPage() (+24 more)

### Community 9 - "CCXT Exchange Layer"
Cohesion: 0.10
Nodes (26): Auth Tables, Better Auth, drizzleAdapter, Email/Password Sessions, Auth Env via getEnv, Proxy Route Guard, requireSession, Drizzle ORM (+18 more)

### Community 10 - "order-form.tsx"
Cohesion: 0.14
Nodes (14): ASSETS, BuySellPage(), Side, trimAmount(), OrderFormProps, SIZE_PERCENTS, Dialog(), DialogContent() (+6 more)

### Community 11 - "cn"
Cohesion: 0.12
Nodes (28): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+20 more)

### Community 12 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 13 - "landing-page.tsx"
Cohesion: 0.11
Nodes (14): FaqSection(), FeaturesSection(), FinalCtaSection(), HeroSection(), LearningSection(), PricingSection(), TestimonialsSection(), TrustBar() (+6 more)

### Community 14 - "constants.ts"
Cohesion: 0.22
Nodes (13): SecuritySection(), NAV_LINKS, SECURITY_ITEMS, SECURITY_ORBIT_ICONS, Asset, FaqItem, Feature, LearningItem (+5 more)

### Community 15 - "paper-trade-simulator.tsx"
Cohesion: 0.15
Nodes (13): StatCard(), StatCardProps, useReveal(), TradeDemoSection(), DemoTradingPage(), PaperTradeSimulator(), PaperTradeSimulatorProps, Position (+5 more)

### Community 16 - "footer.tsx"
Cohesion: 0.33
Nodes (5): LandingFooter(), SOCIAL_ICONS, NexoraLogo(), NexoraLogoProps, FOOTER_GROUPS

### Community 17 - "dashboard-shell.tsx"
Cohesion: 0.20
Nodes (8): react, react, AppSidebar(), DashboardShell(), SidebarInset(), SidebarMenuSkeleton(), SidebarProvider(), useIsMobile()

### Community 18 - "two-factor-setup.tsx"
Cohesion: 0.25
Nodes (6): OtpInput(), OtpInputProps, SetupStep, FormPasswordField(), EnableTwoFactorFormValues, enableTwoFactorSchema

### Community 19 - "notify/index.ts"
Cohesion: 0.09
Nodes (28): geistMono, geistSans, metadata, NetworkStatusToast(), NotificationBell(), NotifyProvider(), NotifyToaster(), NotifyToastItem() (+20 more)

### Community 20 - "security-settings.tsx"
Cohesion: 0.13
Nodes (19): formatDate(), SecuritySettings(), SessionRow, truncateUa(), ChangePasswordFormValues, changePasswordSchema, ForgotPasswordFormValues, forgotPasswordSchema (+11 more)

### Community 21 - "mobile-section.tsx"
Cohesion: 0.33
Nodes (4): MobileSection(), PhoneMockProps, ASSETS, MOBILE_FEATURES

### Community 23 - "Skills CLI"
Cohesion: 0.67
Nodes (3): Skill Quality Verification, Skills CLI, skills.sh Leaderboard

### Community 25 - "SignalingManager"
Cohesion: 0.22
Nodes (4): OrderBookPanelProps, toBinanceSymbol(), SignalingManager, OrderBook

### Community 32 - "Nexora Notify"
Cohesion: 0.29
Nodes (6): Layout, Nexora Notify, Options, Rules, Usage (client only), When implementing features

### Community 33 - "utils.ts"
Cohesion: 0.17
Nodes (16): authInputClassName, authLabelClassName, FormPasswordFieldProps, FormFieldProps, Field(), FieldContent(), FieldDescription(), FieldError() (+8 more)

### Community 34 - "nav.tsx"
Cohesion: 0.10
Nodes (21): hotCoins(), MegaFlyout(), Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay() (+13 more)

### Community 35 - "user-menu.tsx"
Cohesion: 0.12
Nodes (20): UserAvatar(), UserMenu(), UserMenuProps, formatRelativeTime(), HistoryRow(), variantMeta, DropdownMenu(), DropdownMenuCheckboxItem() (+12 more)

### Community 37 - "settings/page.tsx"
Cohesion: 0.26
Nodes (11): AccountSettings(), NotificationSettings(), Card(), CardAction(), CardContent(), CardHeader(), CardTitle(), Switch() (+3 more)

### Community 38 - "assets.tsx"
Cohesion: 0.38
Nodes (5): AssetCard(), assetHref(), AssetsSection(), Sparkline(), SparklineProps

### Community 41 - "trade-terminal.tsx"
Cohesion: 0.21
Nodes (10): TradePageProps, OrderForm(), Timeframe, TIMEFRAMES, TradeTerminal(), TradeTerminalProps, useOrderBook(), useTicker() (+2 more)

### Community 42 - "signaling-manager.ts"
Cohesion: 0.16
Nodes (11): AuthLiveMarkets(), formatMarketPrice(), MARKETS, TickerBar(), TickerBarProps, BinanceDepthMessage, BinanceTickerMessage, StreamCallback (+3 more)

### Community 43 - "formatPrice"
Cohesion: 0.25
Nodes (9): PortfolioPage(), OpenOrdersPanel(), OrderBookPanel(), OrderBookRow(), formatPrice(), OrderSide, OrderType, TradingState (+1 more)

### Community 45 - "spinner.tsx"
Cohesion: 0.29
Nodes (5): LoginPage(), LoadingIndicator(), sizeMap, Spinner(), SpinnerProps

### Community 46 - "dashboard-overview.tsx"
Cohesion: 0.18
Nodes (11): DashboardOverview(), StatCard(), Header(), HeaderProps, Badge(), badgeVariants, CardDescription(), CardFooter() (+3 more)

### Community 47 - "types/exchange.ts"
Cohesion: 0.24
Nodes (8): PriceAreaChart(), PriceAreaChartProps, OpenOrdersPanelProps, TradingChart(), TradingChartProps, ExchangeOrder, MarketInfo, OHLCV

## Knowledge Gaps
- **212 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `$schema`, `style`, `rsc`, `tsx` (+207 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `markets-overview.tsx`, `login-page.tsx`, `sidebar.tsx`, `product/catalog.ts`, `order-form.tsx`, `paper-trade-simulator.tsx`, `dashboard-shell.tsx`, `two-factor-setup.tsx`, `notify/index.ts`, `utils.ts`, `nav.tsx`, `user-menu.tsx`, `settings/page.tsx`, `trade-terminal.tsx`, `signaling-manager.ts`, `formatPrice`, `spinner.tsx`, `dashboard-overview.tsx`, `types/exchange.ts`?**
  _High betweenness centrality (0.378) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `dashboard-shell.tsx`, `scripts`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Why does `react` connect `dashboard-shell.tsx` to `dependencies`, `sidebar.tsx`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `$schema`, `style` to the rest of the system?**
  _212 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05590386624869383 - nodes in this community are weakly interconnected._
- **Should `markets-overview.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06594071385359952 - nodes in this community are weakly interconnected._
- **Should `login-page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13513513513513514 - nodes in this community are weakly interconnected._