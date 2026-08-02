# Graph Report - Nexora  (2026-07-31)

## Corpus Check
- 125 files · ~31,080 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 667 nodes · 1413 edges · 33 communities (27 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0928d112`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- service.ts
- trade-terminal.tsx
- settings/page.tsx
- dependencies
- scripts
- sidebar.tsx
- compilerOptions
- SignalingManager
- user-menu.tsx
- CCXT Exchange Layer
- utils.ts
- cn
- components.json
- landing-page.tsx
- constants.ts
- trade-demo.tsx
- nav.tsx
- app-sidebar.tsx
- auth/index.ts
- app/layout.tsx
- assets.tsx
- mobile-section.tsx
- (marketing)/page.tsx
- Skills CLI
- graphify
- tooltip.tsx
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- trust-bar.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 141 edges
2. `scripts` - 16 edges
3. `SignalingManager` - 16 edges
4. `compilerOptions` - 16 edges
5. `Button()` - 13 edges
6. `jsonError()` - 13 edges
7. `isSupportedExchange()` - 13 edges
8. `requireSession()` - 12 edges
9. `authClient` - 11 edges
10. `FieldGroup()` - 10 edges

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

## Communities (33 total, 6 thin omitted)

### Community 0 - "service.ts"
Cohesion: 0.10
Nodes (41): GET(), connectionSchema, GET(), PATCH(), POST(), GET(), GET(), orderSchema (+33 more)

### Community 1 - "trade-terminal.tsx"
Cohesion: 0.09
Nodes (32): PortfolioPage(), TradePageProps, DashboardOverview(), Header(), HeaderProps, featuredSymbols, MarketCard(), MarketOverview() (+24 more)

### Community 2 - "settings/page.tsx"
Cohesion: 0.05
Nodes (70): DevAuthEmail, extractUrl(), ForgotPasswordPage(), LoginPage(), TwoFactorPage(), AuthError(), AuthFooterLink(), AuthPanel() (+62 more)

### Community 3 - "dependencies"
Cohesion: 0.04
Nodes (47): @base-ui/react, better-auth, @better-auth/infra, ccxt, class-variance-authority, clsx, drizzle-orm, @hookform/resolvers (+39 more)

### Community 4 - "scripts"
Cohesion: 0.05
Nodes (38): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, tailwindcss (+30 more)

### Community 5 - "sidebar.tsx"
Cohesion: 0.08
Nodes (28): react, react, Separator(), Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader() (+20 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 7 - "SignalingManager"
Cohesion: 0.13
Nodes (11): OrderBookPanelProps, TickerBarProps, toBinanceSymbol(), BinanceDepthMessage, BinanceTickerMessage, SignalingManager, StreamCallback, Window (+3 more)

### Community 8 - "user-menu.tsx"
Cohesion: 0.13
Nodes (17): UserAvatar(), UserMenu(), UserMenuProps, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem() (+9 more)

### Community 9 - "CCXT Exchange Layer"
Cohesion: 0.10
Nodes (26): Auth Tables, Better Auth, drizzleAdapter, Email/Password Sessions, Auth Env via getEnv, Proxy Route Guard, requireSession, Drizzle ORM (+18 more)

### Community 10 - "utils.ts"
Cohesion: 0.10
Nodes (21): FormFieldProps, OrderForm(), OrderFormProps, Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader() (+13 more)

### Community 11 - "cn"
Cohesion: 0.14
Nodes (23): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+15 more)

### Community 12 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 13 - "landing-page.tsx"
Cohesion: 0.13
Nodes (12): FaqSection(), FeaturesSection(), FinalCtaSection(), HeroSection(), LearningSection(), PricingSection(), TestimonialsSection(), FAQS (+4 more)

### Community 14 - "constants.ts"
Cohesion: 0.24
Nodes (12): SecuritySection(), SECURITY_ITEMS, SECURITY_ORBIT_ICONS, Asset, FaqItem, Feature, LearningItem, Market (+4 more)

### Community 15 - "trade-demo.tsx"
Cohesion: 0.22
Nodes (9): StatCard(), StatCardProps, useReveal(), Position, TradeDemoSection(), INITIAL_MARKETS, fmtUSD(), FlashMessage (+1 more)

### Community 16 - "nav.tsx"
Cohesion: 0.22
Nodes (8): LandingFooter(), SOCIAL_ICONS, LandingNav(), NAV_ANCHORS, NexoraLogo(), NexoraLogoProps, FOOTER_GROUPS, NAV_LINKS

### Community 17 - "app-sidebar.tsx"
Cohesion: 0.13
Nodes (13): AppSidebar(), mainNav, DashboardShell(), SidebarContent(), SidebarFooter(), SidebarGroup(), SidebarGroupContent(), SidebarGroupLabel() (+5 more)

### Community 18 - "auth/index.ts"
Cohesion: 0.11
Nodes (22): { GET, POST }, GET(), appleEnabled, auth, env, googleEnabled, Session, generateAppleClientSecret() (+14 more)

### Community 19 - "app/layout.tsx"
Cohesion: 0.33
Nodes (4): geistMono, geistSans, metadata, Providers()

### Community 20 - "assets.tsx"
Cohesion: 0.40
Nodes (3): AssetsSection(), Sparkline(), SparklineProps

### Community 21 - "mobile-section.tsx"
Cohesion: 0.40
Nodes (5): MobileSection(), PhoneMock(), PhoneMockProps, ASSETS, MOBILE_FEATURES

### Community 23 - "Skills CLI"
Cohesion: 0.67
Nodes (3): Skill Quality Verification, Skills CLI, skills.sh Leaderboard

### Community 25 - "tooltip.tsx"
Cohesion: 0.40
Nodes (4): Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger()

## Knowledge Gaps
- **162 isolated node(s):** `${userHome}/.local/bin/graphify-mcp`, `$schema`, `style`, `rsc`, `tsx` (+157 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `trade-terminal.tsx`, `settings/page.tsx`, `sidebar.tsx`, `SignalingManager`, `user-menu.tsx`, `utils.ts`, `app-sidebar.tsx`, `tooltip.tsx`?**
  _High betweenness centrality (0.347) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`, `sidebar.tsx`?**
  _High betweenness centrality (0.199) - this node is a cross-community bridge._
- **Why does `react` connect `sidebar.tsx` to `dependencies`?**
  _High betweenness centrality (0.191) - this node is a cross-community bridge._
- **What connects `${userHome}/.local/bin/graphify-mcp`, `$schema`, `style` to the rest of the system?**
  _162 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09713487071977638 - nodes in this community are weakly interconnected._
- **Should `trade-terminal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0851063829787234 - nodes in this community are weakly interconnected._
- **Should `settings/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.052277227722772275 - nodes in this community are weakly interconnected._