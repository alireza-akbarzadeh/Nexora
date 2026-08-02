import { dash } from "@better-auth/infra";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins";

import { db } from "@/lib/db";
import { getEnv } from "@/lib/env";

const env = getEnv();

function normalizeBaseUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const auth = betterAuth({
  appName: "Nexora",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: normalizeBaseUrl(env.BETTER_AUTH_URL ?? env.NEXT_PUBLIC_APP_URL),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  plugins: [
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
    }),
    twoFactor({
      issuer: "Nexora",
      totpOptions: {
        digits: 6,
        period: 30,
      },
      backupCodeOptions: {
        amount: 10,
        length: 10,
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
