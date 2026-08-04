# Nexora

Fullstack crypto trading platform. Next.js App Router UI, real exchange connectivity (Binance-first) via CCXT, public market data over WebSockets.

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript · Tailwind v4 + shadcn/ui · Better Auth · Neon Postgres + Drizzle ORM · CCXT · TanStack Query + Zustand · Zod · TradingView Lightweight Charts

## Before exploring code: use graphify

This repo has a knowledge graph at `graphify-out/`. **Before using Read, Grep, Glob, or Bash to explore the codebase, run graphify first:**

- `graphify query "<question>"` — scoped subgraph for any codebase/architecture question
- `graphify path "<A>" "<B>"` — dependency path between two symbols
- `graphify explain "<concept>"` — all nodes related to a concept

This applies to every subagent too — include this instruction explicitly in any subagent prompt that involves code exploration. Don't skip it because files seem "already known" — the graph surfaces cross-file and inferred edges that grep/Read miss.

Only go straight to Read/Grep/Glob when graphify already oriented you and you're now editing specific lines, or `graphify-out/graph.json` doesn't exist. If `graphify-out/wiki/index.md` exists, prefer navigating it over raw files; read `graphify-out/GRAPH_REPORT.md` for broad architecture questions query/path/explain don't cover.

**After any substantive code edit, run `graphify update .`** (AST-only, no API cost) to keep the graph current.

## Layout

| Area | Path |
|------|------|
| Routes | `src/app/(marketing)`, `(auth)`, `(dashboard)`, `api/**` |
| Auth | `src/lib/auth`, `src/proxy.ts`, `src/lib/api/auth-guard.ts` |
| DB | `src/lib/db` |
| Exchange | `src/lib/exchange`, `src/app/api/exchange`, `src/app/api/market` |
| UI | `src/components/{ui,trading,landing,layout,dashboard,forms,notify,markets,price,product,settings,auth}` |
| Client state | `src/stores` (Zustand) |
| Notify | `src/lib/notify` — `notify()` / `notify.order()` toasts + sounds |
| Env | `src/lib/env.ts` (Zod) |
| Realtime | `src/lib/websocket` — backs "public market data over WebSockets" from the intro |
| SEO | `src/lib/seo` — metadata, JSON-LD, sitemap/robots |

## Code structure (STRICT)

**Hard limit: no file over 150 lines.** If a file crosses it, that is a signal to extract — not to keep going. Applies to every `.ts`/`.tsx` file.

Split along these seams, in this order:

| Extract | To | Rule |
|---------|-----|------|
| Pure functions, no React | `src/lib/<domain>/` | Must be unit-testable with no DOM |
| Stateful logic, effects, refs | `src/hooks/use-*.ts` | One hook per file, named after the file |
| Types & interfaces | `types.ts` beside the feature, or `src/types/` if shared | Never re-declare a shape that already exists |
| Static data, config, magic numbers | `constants.ts` beside the feature | No inline literals in JSX |
| A distinct piece of UI | its own component file | One exported component per file; local sub-components are fine if the file stays under 150 |

Additional rules:
- A component that grew past ~80 lines of JSX is almost always two components.
- Feature folders over flat files: `hero/index.tsx` + `hero/chart-panel.tsx` + `hero/use-hero-scroll.ts`, not one `hero.tsx`.
- Reusable UI primitives belong in `src/components/ui/**`, not in a feature folder.
- Name the thing after what it is (`use-count-up.ts`), never `utils.ts`/`helpers.ts` dumping grounds.
- Every non-obvious constant gets a one-line comment explaining the unit or the why.

## Motion & hydration (STRICT)

- Motion lives in `src/components/ui/motion/**`; timing tokens in `src/lib/motion/easing.ts`. Reuse them — do not hand-roll durations or beziers.
- **Never branch the rendered tree on a client-only value** (`prefers-reduced-motion`, `matchMedia`, `window`, `localStorage`). The server and the first client render must produce identical markup, or React throws a hydration mismatch. Branch on *values* (a transform range, a duration), never on element type.
- Reduced motion is handled globally by `<MotionConfig reducedMotion="user">` in `providers.tsx` plus the `@media (prefers-reduced-motion)` block in `globals.css`. Individual components should not re-implement it.
- Client-only preferences must come from an effect-resolved hook that starts `false` (`use-prefers-reduced-motion.ts`, `use-fine-pointer.ts`) — never read `matchMedia` during render.
- No `Math.random()` or `Date.now()` in render. Seed it (see `src/lib/landing/hero-chart.ts`).
- Animate `transform`/`opacity`/`filter` only — never `width`/`height`/`top`/`left`.

## Theming

Hand-rolled, no `next-themes`. `src/lib/theme/**` (pure) → `ThemeProvider` (context) → `useTheme()` hook from `@/hooks/use-theme`. The no-flash script is inlined in `src/app/layout.tsx` — a server component, because rendering `<script>` from a client component triggers a React 19 warning that buries real errors.

## Conventions

- Path alias `@/` → `src/`
- Server secrets only through `getEnv()` — never read `process.env` ad hoc in feature code
- API route handlers: thin — validate with Zod, auth with `requireSession()`, real logic lives in `src/lib/**`
- Private exchange routes start with `requireSession()`; return its `response` when unauthenticated
- Validate with Zod `safeParse`; on failure use `jsonError(...)` from `@/lib/api/auth-guard`
- Route files return `NextResponse.json(...)`; keep CCXT/DB details out of the route file itself
- Auth catch-all stays at `src/app/api/auth/[...all]/route.ts` — don't duplicate Better Auth handlers
- Prefer existing UI primitives under `src/components/ui` over new one-offs
- Client feedback: use `notify` from `@/lib/notify` (see `notify` skill) — not ad-hoc toasts
- DB: single schema module `src/lib/db/schema.ts`, Neon HTTP client in `src/lib/db/index.ts`; prefer text PKs; keep Better Auth table/column names adapter-compatible; run `pnpm db:generate` after schema changes and commit the SQL under `drizzle/`

## Skills

Project skills auto-load by context — invoke them explicitly if they don't trigger: `better-auth`, `drizzle`, `exchange-ccxt`, `notify`, `graphify`. Design/brand skills (`design`, `design-system`, `ui-styling`, `ui-ux-pro-max`, `brand`, `banner-design`, `slides`) are also available for UI and marketing work.

## Commands

```bash
pnpm dev            # start dev server
pnpm build           # production build
pnpm lint            # eslint
pnpm db:generate     # generate SQL from schema changes
pnpm db:migrate      # apply generated SQL migrations
pnpm db:push         # push schema to Neon (mutates real DB — confirm before running)
pnpm db:studio       # Drizzle Studio
```

## MCP servers (`.claude/mcp.json`)

- `graphify` — knowledge graph query/update tools
- `21st` — 21st.dev component MCP; needs `API_KEY_21ST` set in your shell environment

## CI (`.github/workflows/`)

- `claude-code-review.yml` — auto-reviews every non-draft PR for production-readiness (security, auth, money/order correctness, data scoping) via `anthropics/claude-code-action`
- `claude.yml` — responds to `@claude` mentions in PR/issue comments (ask it to explain, fix, or implement something)
- Both need the `ANTHROPIC_API_KEY` repo secret — set up via `/install-github-app` in a Claude Code terminal, or manually per [code.claude.com/docs/en/github-actions](https://code.claude.com/docs/en/github-actions)

## Never do without asking

- `pnpm db:push` / `pnpm db:migrate` against the real Neon database, or any other destructive DB operation
- Committing `.env*` files or real exchange/API keys
- Placing live exchange API keys or secrets anywhere other than `ENCRYPTION_KEY`-protected storage via `src/lib/exchange/encryption.ts`
