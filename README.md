# Next Learning Monorepo

This workspace is a Turborepo-based Next.js learning app. The main `web` app is both a working product and an interactive tutorial for App Router, server and client components, route handlers, server actions, caching, Postgres, Drizzle, Zod, TanStack Query, and shared monorepo packages.

## Apps and packages

- `apps/web`: main tutorial and product UI
- `apps/docs`: secondary app that demonstrates shared package reuse
- `packages/ui`: shared UI primitives and layout shell
- `packages/db`: Drizzle schema, queries, migrations, and seed
- `packages/auth`: custom session and cookie helpers
- `packages/validation`: shared Zod schemas
- `packages/content`: typed lesson metadata and code references
- `packages/config`: env parsing and shared app metadata

## Local setup

1. Copy `.env.example` to `.env`.
2. Start Postgres: `docker compose up -d`
3. Install dependencies: `pnpm install`
4. Run migrations: `pnpm db:migrate`
5. Seed demo data: `pnpm db:seed`
6. Start the apps: `pnpm dev`

The default local URLs are:

- `http://localhost:3000` for `apps/web`
- `http://localhost:3001` for `apps/docs`

## Demo accounts

After seeding:

- `learner@example.com` / `password123`
- `admin@example.com` / `password123`

## Useful commands

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm turbo run build --affected`
- `pnpm turbo run typecheck --filter=web`

## shadcn/ui usage

To add more shared components into `packages/ui`:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Then import from the shared package:

```tsx
import { Button } from "@workspace/ui/components/button"
```
