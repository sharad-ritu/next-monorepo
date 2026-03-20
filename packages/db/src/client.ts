import { config as loadEnv } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import postgres from "postgres"

import * as schema from "./schema"

const currentDirectory = dirname(fileURLToPath(import.meta.url))

loadEnv({ path: resolve(currentDirectory, "../../../.env") })

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to connect to Postgres.")
}

declare global {
  var __workspace_postgres__: ReturnType<typeof postgres> | undefined
}

const connection = globalThis.__workspace_postgres__ ?? postgres(databaseUrl, { max: 1 })

if (process.env.NODE_ENV !== "production") {
  globalThis.__workspace_postgres__ = connection
}

export const sql = connection
export const db = drizzle(connection, { schema })
