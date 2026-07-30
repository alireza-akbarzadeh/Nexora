---
name: better-auth
description: >-
  Nexora Better Auth setup (Drizzle adapter, sessions, route protection). Use when
  changing auth config, login/register, sessions, requireSession, or src/lib/auth/**,
  src/proxy.ts, or /api/auth.
---

# Nexora Better Auth

## Layout

- Server: `src/lib/auth/index.ts` — `betterAuth` + `drizzleAdapter(db, { provider: "pg" })`
- Client: `src/lib/auth/client.ts`
- Catch-all API: `src/app/api/auth/[...all]/route.ts`
- Edge/proxy guard: `src/proxy.ts` (`auth.api.getSession`)
- API helper: `src/lib/api/auth-guard.ts` → `requireSession()` / `jsonError()`

## Rules

- Email/password is enabled; min password length 8
- Session: 7d expiry, 1d update age
- Env via `getEnv()`: `BETTER_AUTH_SECRET` (≥32), optional `BETTER_AUTH_URL`, `BETTER_AUTH_API_KEY` for dash plugin
- Auth tables live in `src/lib/db/schema.ts` (`user`, `session`, `account`, `verification`) — keep column names adapter-compatible
- Protected API routes must call `requireSession()` first and return its `response` on failure
- Public routes in proxy: `/`, `/login`, `/register`; `/api/auth` is always open
- Authed users hitting `/login` or `/register` redirect to `/dashboard`

## Pattern (API route)

```typescript
const { session, response } = await requireSession();
if (!session) return response!;
// use session.user.id
```

Do not invent a parallel auth system. Extend Better Auth plugins/config in `src/lib/auth/index.ts`.
