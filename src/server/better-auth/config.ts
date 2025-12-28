import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "~/env";
import { db } from "~/server/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: "http://localhost:3000/api/auth/callback/github",
    },
  },
  advanced: {
    cookies: {
      state: {
        attributes: {
          // using "lax" instead of "none" because "none" requires HTTPS
          // and we're running on http://localhost in development
          sameSite: "lax",
        },
      },
    },
  },
  account: {
    // WARNING: skipping state cookie check - only for development/debugging
    // see: https://www.better-auth.com/docs/errors/state_mismatch#skip-state-cookie-check
    skipStateCookieCheck: true,
  },
});

export type Session = typeof auth.$Infer.Session;
