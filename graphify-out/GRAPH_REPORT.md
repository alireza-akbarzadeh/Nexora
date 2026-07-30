# Graph Report - .  (2026-07-30)

## Corpus Check
- Corpus is ~25,575 words - fits in a single context window. You may not need a graph.

## Summary
- 602 nodes · 1226 edges · 32 communities (26 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Exchange API Routes
- Dashboard Pages
- Auth and Settings UI
- Runtime Dependencies
- Dev Dependencies
- App Sidebar Shell
- TypeScript Config
- Core UI Primitives
- Order Form Dialogs
- Auth DB Exchange Docs
- WebSocket Market Data
- User Menu Dropdowns
- Shadcn Components Config
- Landing Sections
- Landing Content Types
- Landing Trade Demo
- Landing Nav Footer
- Sheet Overlay UI
- Root Layout Providers
- Dashboard Shell Layout
- Landing Assets Sparklines
- Landing Mobile Section
- Marketing Home Page
- Skills Discovery Docs
- Graphify MCP Config
- Landing Testimonials
- ESLint Config
- Next Config
- PostCSS Config

## God Nodes (most connected - your core abstractions)
1. `cn()` - 134 edges
2. `scripts` - 16 edges
3. `SignalingManager` - 16 edges
4. `compilerOptions` - 16 edges
5. `Button()` - 13 edges
6. `jsonError()` - 13 edges
7. `isSupportedExchange()` - 13 edges
8. `requireSession()` - 12 edges
9. `formatPrice()` - 9 edges
10. `Ticker` - 9 edges

## Surprising Connections (you probably didn't know these)
- `AES-256-GCM At Rest` --semantically_similar_to--> `AES API Key Encryption`  [INFERRED] [semantically similar]
  README.md → .cursor/skills/exchange-ccxt/SKILL.md
- `Binance Public WebSockets` --conceptually_related_to--> `CCXT Exchange Layer`  [INFERRED]
  README.md → .cursor/skills/exchange-ccxt/SKILL.md
- `Nexora` --references--> `Neon Postgres`  [EXTRACTED]
  README.md → .cursor/skills/drizzle/SKILL.md
- `Server-Only CCXT` --rationale_for--> `CCXT Exchange Layer`  [EXTRACTED]
  README.md → .cursor/skills/exchange-ccxt/SKILL.md
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Nexora Auth Stack** — _cursor_skills_better_auth_skill_better_auth, _cursor_skills_better_auth_skill_drizzle_adapter, _cursor_skills_better_auth_skill_require_session, _cursor_skills_better_auth_skill_proxy_route_guard, _cursor_skills_better_auth_skill_auth_tables [EXTRACTED 1.00]
- **Exchange Credential Security Flow** — _cursor_skills_exchange_ccxt_skill_aes_encryption, _cursor_skills_exchange_ccxt_skill_encryption_key, _cursor_skills_drizzle_skill_exchange_connections, _cursor_skills_exchange_ccxt_skill_validate_credentials, _cursor_skills_better_auth_skill_require_session [INFERRED 0.85]
- **Nexora Data Layer** — _cursor_skills_drizzle_skill_drizzle_orm, _cursor_skills_drizzle_skill_neon_postgres, _cursor_skills_drizzle_skill_schema_ts, _cursor_skills_drizzle_skill_migration_workflow [EXTRACTED 1.00]

## Communities (32 total, 6 thin omitted)

### Community 0 - "Exchange API Routes"
Cohesion: 0.08
Nodes (47): { GET, POST }, GET(), connectionSchema, GET(), PATCH(), POST(), GET(), GET() (+39 more)

### Community 1 - "Dashboard Pages"
Cohesion: 0.08
Nodes (39): PortfolioPage(), TradePageProps, DashboardOverview(), Header(), HeaderProps, featuredSymbols, MarketCard(), MarketOverview() (+31 more)

### Community 2 - "Auth and Settings UI"
Cohesion: 0.09
Nodes (36): LoginPage(), quickStartSteps, StatCard(), FormPasswordField(), FormPasswordFieldProps, FormFieldProps, FormTextField(), Button() (+28 more)

### Community 3 - "Runtime Dependencies"
Cohesion: 0.05
Nodes (43): @base-ui/react, better-auth, @better-auth/infra, ccxt, class-variance-authority, clsx, drizzle-orm, @hookform/resolvers (+35 more)

### Community 4 - "Dev Dependencies"
Cohesion: 0.05
Nodes (38): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, tailwindcss (+30 more)

### Community 5 - "App Sidebar Shell"
Cohesion: 0.09
Nodes (33): react, react, mainNav, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter() (+25 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 7 - "Core UI Primitives"
Cohesion: 0.13
Nodes (24): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+16 more)

### Community 8 - "Order Form Dialogs"
Cohesion: 0.11
Nodes (19): OrderForm(), OrderFormProps, Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay() (+11 more)

### Community 9 - "Auth DB Exchange Docs"
Cohesion: 0.10
Nodes (26): Auth Tables, Better Auth, drizzleAdapter, Email/Password Sessions, Auth Env via getEnv, Proxy Route Guard, requireSession, Drizzle ORM (+18 more)

### Community 10 - "WebSocket Market Data"
Cohesion: 0.15
Nodes (10): TickerBarProps, toBinanceSymbol(), BinanceDepthMessage, BinanceTickerMessage, SignalingManager, StreamCallback, Window, OrderBook (+2 more)

### Community 11 - "User Menu Dropdowns"
Cohesion: 0.13
Nodes (17): UserAvatar(), UserMenu(), UserMenuProps, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem() (+9 more)

### Community 12 - "Shadcn Components Config"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 13 - "Landing Sections"
Cohesion: 0.13
Nodes (12): FaqSection(), FeaturesSection(), FinalCtaSection(), HeroSection(), LearningSection(), PricingSection(), TrustBar(), FAQS (+4 more)

### Community 14 - "Landing Content Types"
Cohesion: 0.24
Nodes (12): SecuritySection(), SECURITY_ITEMS, SECURITY_ORBIT_ICONS, Asset, FaqItem, Feature, LearningItem, Market (+4 more)

### Community 15 - "Landing Trade Demo"
Cohesion: 0.22
Nodes (9): StatCard(), StatCardProps, useReveal(), Position, TradeDemoSection(), INITIAL_MARKETS, fmtUSD(), FlashMessage (+1 more)

### Community 16 - "Landing Nav Footer"
Cohesion: 0.22
Nodes (8): LandingFooter(), SOCIAL_ICONS, LandingNav(), NAV_ANCHORS, NexoraLogo(), NexoraLogoProps, FOOTER_GROUPS, NAV_LINKS

### Community 17 - "Sheet Overlay UI"
Cohesion: 0.18
Nodes (7): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 18 - "Root Layout Providers"
Cohesion: 0.29
Nodes (5): geistMono, geistSans, metadata, Providers(), TooltipProvider()

### Community 19 - "Dashboard Shell Layout"
Cohesion: 0.40
Nodes (3): AppSidebar(), DashboardShell(), SidebarInset()

### Community 20 - "Landing Assets Sparklines"
Cohesion: 0.40
Nodes (3): AssetsSection(), Sparkline(), SparklineProps

### Community 21 - "Landing Mobile Section"
Cohesion: 0.40
Nodes (5): MobileSection(), PhoneMock(), PhoneMockProps, ASSETS, MOBILE_FEATURES

### Community 23 - "Skills Discovery Docs"
Cohesion: 0.67
Nodes (3): Skill Quality Verification, Skills CLI, skills.sh Leaderboard

## Knowledge Gaps
- **149 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `$schema`, `style`, `rsc`, `tsx` (+144 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Core UI Primitives` to `Dashboard Pages`, `Auth and Settings UI`, `App Sidebar Shell`, `Order Form Dialogs`, `User Menu Dropdowns`, `Sheet Overlay UI`, `Dashboard Shell Layout`?**
  _High betweenness centrality (0.343) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Dev Dependencies`, `App Sidebar Shell`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Why does `react` connect `App Sidebar Shell` to `Runtime Dependencies`?**
  _High betweenness centrality (0.195) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `$schema`, `style` to the rest of the system?**
  _149 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Exchange API Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.07548076923076923 - nodes in this community are weakly interconnected._
- **Should `Dashboard Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.07570621468926554 - nodes in this community are weakly interconnected._
- **Should `Auth and Settings UI` be split into smaller, more focused modules?**
  _Cohesion score 0.0880503144654088 - nodes in this community are weakly interconnected._