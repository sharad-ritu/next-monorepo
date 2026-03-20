import { config as loadEnv } from "dotenv"
import { readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import postgres from "postgres"

const currentDirectory = dirname(fileURLToPath(import.meta.url))

loadEnv({ path: resolve(currentDirectory, "../../../.env") })

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for migrations.")
}

async function migrate() {
  const sql = postgres(databaseUrl, { max: 1 })

  try {
    const migration = await readFile(resolve(currentDirectory, "../drizzle/0000_initial.sql"), "utf8")
    await sql.unsafe(migration)
    console.log("Applied migration 0000_initial.sql")
  } finally {
    await sql.end()
  }
}

migrate().catch((error) => {
  console.error(error)
  process.exit(1)
})
