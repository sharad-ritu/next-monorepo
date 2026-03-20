import Link from "next/link"

import { getViewer } from "@/lib/session"
import { topicGroups } from "@workspace/content"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export default async function HomePage() {
  const viewer = await getViewer()

  return (
    <div className="mx-auto flex min-h-svh max-w-7xl flex-col gap-10 px-6 py-8 lg:px-10">
      <section className="grid gap-6 border border-border p-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="flex flex-col gap-5">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Full-stack tutorial workspace
          </p>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight lg:text-6xl">
              Learn Next.js and monorepos by using the features, not just reading about them.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              This app is both a working product and a guided reference for App Router, server and client components,
              route handlers, server actions, auth, caching, Postgres, Drizzle, Zod, TanStack Query, and Turbo.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/learn">Open curriculum</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={viewer ? "/dashboard" : "/login"}>{viewer ? "Go to dashboard" : "Sign in to explore"}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/monorepo">See monorepo map</Link>
            </Button>
          </div>
        </div>
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>What you can do here</CardTitle>
            <CardDescription>Use it like a real app, then inspect how each feature was built.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Authenticate with custom sessions backed by Postgres.</p>
            <p>Create and filter projects with server-rendered pagination.</p>
            <p>Compare route handlers, server actions, and TanStack Query.</p>
            <p>Inspect caching, streaming, loading states, and protected layouts.</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topicGroups.map(([group, topics]) => (
          <Card key={group}>
            <CardHeader>
              <CardTitle>{group}</CardTitle>
              <CardDescription>{topics.length} linked lessons with code references and live demos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {topics.slice(0, 3).map((topic) => (
                <div key={topic.slug} className="border-l border-border pl-3">
                  <p className="font-medium">{topic.title}</p>
                  <p className="text-muted-foreground">{topic.summary}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
