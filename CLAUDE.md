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
pnpm db:push         # push schema to Neon (mutates real DB — confirm before running)
pnpm db:studio       # Drizzle Studio
```

## MCP servers (`.claude/mcp.json`)

- `graphify` — knowledge graph query/update tools
- `21st` — 21st.dev component MCP; needs `API_KEY_21ST` set in your shell environment

## Never do without asking

- `pnpm db:push` / `pnpm db:migrate` against the real Neon database, or any other destructive DB operation
- Committing `.env*` files or real exchange/API keys
- Placing live exchange API keys or secrets anywhere other than `ENCRYPTION_KEY`-protected storage via `src/lib/exchange/encryption.ts`
