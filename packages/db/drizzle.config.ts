import { config as loadEnv } from "dotenv"
import { defineConfig } from "drizzle-kit"
import { resolve } from "node:path"

loadEnv({ path: resolve(process.cwd(), "../../.env") })

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for Drizzle migrations. Add it to the repo root .env file.")
}

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
})
