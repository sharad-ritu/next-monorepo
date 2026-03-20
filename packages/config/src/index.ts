import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  SESSION_COOKIE_NAME: z.string().min(1).default("next-learning-session"),
  SESSION_SECRET: z.string().min(16, "SESSION_SECRET must be at least 16 characters"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
})

export type AppEnv = z.infer<typeof envSchema>

let cachedEnv: AppEnv | null = null

export function getEnv() {
  if (cachedEnv) {
    return cachedEnv
  }

  cachedEnv = envSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
    SESSION_SECRET: process.env.SESSION_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  })

  return cachedEnv
}

export const appMeta = {
  name: "Next Learning Monorepo",
  description:
    "A full-stack Next.js monorepo that teaches App Router, server/client boundaries, data fetching, caching, auth, and shared packages with working UI.",
}

export const turboExamples = [
  "pnpm dev",
  "pnpm lint",
  "pnpm db:migrate",
  "pnpm turbo run build --affected",
  "pnpm turbo run typecheck --filter=web",
]
