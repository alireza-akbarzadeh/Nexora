# Graph Report - Nexora  (2026-08-02)

## Corpus Check
- 136 files · ~35,954 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 715 nodes · 1560 edges · 36 communities (30 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1911a98f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- service.ts
- trade-terminal.tsx
- security-settings.tsx
- dependencies
- scripts
- sidebar.tsx
- compilerOptions
- utils.ts
- user-menu.tsx
- CCXT Exchange Layer
- order-form.tsx
- cn
- components.json
- landing-page.tsx
- constants.ts
- trade-demo.tsx
- nav.tsx
- dashboard-shell.tsx
- markets-overview.tsx
- app/layout.tsx
- assets.tsx
- mobile-section.tsx
- (marketing)/page.tsx
- Skills CLI
- graphify
- SignalingManager
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- auth-live-markets.tsx
- types/exchange.ts
- sheet.tsx
- testimonials.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 159 edges
2. `scripts` - 16 edges
3. `Button()` - 16 edges
4. `SignalingManager` - 16 edges
5. `compilerOptions` - 16 edges
6. `jsonError()` - 15 edges
7. `isSupportedExchange()` - 15 edges
8. `authClient` - 13 edges
9. `requireSession()` - 12 edges
10. `formatPrice()` - 12 edges

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

## Communities (36 total, 6 thin omitted)

### Community 0 - "service.ts"
Cohesion: 0.06
Nodes (62): { GET, POST }, GET(), GET(), connectionSchema, GET(), PATCH(), POST(), GET() (+54 more)

### Community 1 - "trade-terminal.tsx"
Cohesion: 0.18
Nodes (11): TradePageProps, DashboardOverview(), Header(), HeaderProps, TradeTerminal(), TradeTerminalProps, useOrderBook(), useTicker() (+3 more)

### Community 2 - "security-settings.tsx"
Cohesion: 0.07
Nodes (44): DevAuthEmail, extractUrl(), ForgotPasswordPage(), LoginPage(), TwoFactorPage(), AuthError(), AuthFooterLink(), AuthPanel() (+36 more)

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

### Community 7 - "utils.ts"
Cohesion: 0.08
Nodes (40): authInputClassName, authLabelClassName, OtpInput(), OtpInputProps, TwoFactorVerifyProps, quickStartSteps, StatCard(), FormPasswordFieldProps (+32 more)

### Community 8 - "user-menu.tsx"
Cohesion: 0.13
Nodes (17): UserAvatar(), UserMenu(), UserMenuProps, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem() (+9 more)

### Community 9 - "CCXT Exchange Layer"
Cohesion: 0.10
Nodes (26): Auth Tables, Better Auth, drizzleAdapter, Email/Password Sessions, Auth Env via getEnv, Proxy Route Guard, requireSession, Drizzle ORM (+18 more)

### Community 10 - "order-form.tsx"
Cohesion: 0.12
Nodes (18): OrderForm(), OrderFormProps, Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay() (+10 more)

### Community 11 - "cn"
Cohesion: 0.14
Nodes (23): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+15 more)

### Community 12 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 13 - "landing-page.tsx"
Cohesion: 0.13
Nodes (12): FaqSection(), FeaturesSection(), FinalCtaSection(), HeroSection(), LearningSection(), PricingSection(), TrustBar(), FAQS (+4 more)

### Community 14 - "constants.ts"
Cohesion: 0.24
Nodes (12): SecuritySection(), SECURITY_ITEMS, SECURITY_ORBIT_ICONS, Asset, FaqItem, Feature, LearningItem, Market (+4 more)

### Community 15 - "trade-demo.tsx"
Cohesion: 0.20
Nodes (10): StatCard(), StatCardProps, useReveal(), Position, TradeDemoSection(), INITIAL_MARKETS, STARTING_CASH, fmtUSD() (+2 more)

### Community 16 - "nav.tsx"
Cohesion: 0.22
Nodes (8): LandingFooter(), SOCIAL_ICONS, LandingNav(), NAV_ANCHORS, NexoraLogo(), NexoraLogoProps, FOOTER_GROUPS, NAV_LINKS

### Community 17 - "dashboard-shell.tsx"
Cohesion: 0.20
Nodes (8): react, react, AppSidebar(), DashboardShell(), SidebarInset(), SidebarMenuSkeleton(), SidebarProvider(), useIsMobile()

### Community 18 - "markets-overview.tsx"
Cohesion: 0.14
Nodes (22): baseOf(), Category, HighlightCard(), MarketsOverview(), NEW_BASES, SortableHead(), SortDir, SortKey (+14 more)

### Community 19 - "app/layout.tsx"
Cohesion: 0.23
Nodes (7): geistMono, geistSans, metadata, NetworkStatusToast(), Providers(), NetworkStatus, useNetworkStatus()

### Community 20 - "assets.tsx"
Cohesion: 0.40
Nodes (3): AssetsSection(), Sparkline(), SparklineProps

### Community 21 - "mobile-section.tsx"
Cohesion: 0.40
Nodes (5): MobileSection(), PhoneMock(), PhoneMockProps, ASSETS, MOBILE_FEATURES

### Community 23 - "Skills CLI"
Cohesion: 0.67
Nodes (3): Skill Quality Verification, Skills CLI, skills.sh Leaderboard

### Community 25 - "SignalingManager"
Cohesion: 0.20
Nodes (6): OrderBookPanelProps, TickerBarProps, toBinanceSymbol(), SignalingManager, OrderBook, Ticker

### Community 32 - "auth-live-markets.tsx"
Cohesion: 0.17
Nodes (14): PortfolioPage(), AuthLiveMarkets(), formatMarketPrice(), MARKETS, ChangeBadge(), featuredSymbols, MarketCard(), MarketOverview() (+6 more)

### Community 33 - "types/exchange.ts"
Cohesion: 0.16
Nodes (12): TradingChart(), TradingChartProps, BinanceDepthMessage, BinanceTickerMessage, StreamCallback, Window, Balance, ExchangeConnectionSummary (+4 more)

### Community 34 - "sheet.tsx"
Cohesion: 0.18
Nodes (7): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

## Knowledge Gaps
- **174 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `$schema`, `style`, `rsc`, `tsx` (+169 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `auth-live-markets.tsx`, `security-settings.tsx`, `sheet.tsx`, `sidebar.tsx`, `utils.ts`, `user-menu.tsx`, `order-form.tsx`, `dashboard-shell.tsx`, `markets-overview.tsx`, `app/layout.tsx`?**
  _High betweenness centrality (0.372) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `dashboard-shell.tsx`, `scripts`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **Why does `react` connect `dashboard-shell.tsx` to `dependencies`, `sidebar.tsx`?**
  _High betweenness centrality (0.182) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `$schema`, `style` to the rest of the system?**
  _174 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05935938877461064 - nodes in this community are weakly interconnected._
- **Should `security-settings.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07451923076923077 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._