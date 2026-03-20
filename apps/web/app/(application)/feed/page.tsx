import { Suspense } from "react"

import { ActivityFeedClient } from "@/components/feed/activity-feed-client"
import { sleep } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

async function StreamedExplanation() {
  await sleep(1200)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Why this route exists</CardTitle>
        <CardDescription>It compares client-side server state with streamed server-rendered explanation content.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm leading-6 text-muted-foreground">
        The activity feed itself is fetched on the client through TanStack Query because the user might want to refresh
        it repeatedly. The explanation card is streamed from the server through a Suspense boundary.
      </CardContent>
    </Card>
  )
}

export default function FeedPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-3 border border-border p-6">
        <h1 className="text-4xl font-semibold">Feed</h1>
        <p className="max-w-2xl text-muted-foreground leading-7">
          The feed route mixes client querying, route handlers, and streamed server content. It also has its own
          `loading.tsx` and `error.tsx` files to demonstrate route segment boundaries.
        </p>
      </section>
      <Suspense fallback={<div className="h-40 animate-pulse border border-border bg-muted/40" />}>
        <StreamedExplanation />
      </Suspense>
      <ActivityFeedClient />
    </div>
  )
}
