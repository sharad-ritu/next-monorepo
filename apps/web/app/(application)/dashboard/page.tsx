import Link from "next/link"

import { DashboardWidgets } from "@/components/dashboard/dashboard-widgets"
import { getViewer } from "@/lib/session"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export default async function DashboardPage() {
  const viewer = await getViewer()

  return (
    <div className="space-y-6">
      <section className="grid gap-4 border border-border p-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <Badge>Protected route</Badge>
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <p className="max-w-2xl text-muted-foreground leading-7">
            This route is protected by a server layout. It streams dashboard widgets and mixes dynamic session-aware
            data with slower suspense boundaries.
          </p>
        </div>
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>Signed in as</CardTitle>
            <CardDescription>Current user state comes from the cookie-backed session in the shared auth package.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p className="font-medium">{viewer?.name}</p>
            <p className="text-muted-foreground">{viewer?.email}</p>
            <p className="text-muted-foreground">Role: {viewer?.role}</p>
          </CardContent>
        </Card>
      </section>

      <DashboardWidgets />

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/projects">Open projects</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/learn/streaming-and-loading">Study the streaming lesson</Link>
        </Button>
      </div>
    </div>
  )
}
