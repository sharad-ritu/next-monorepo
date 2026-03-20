import { Suspense } from "react"

import { sleep } from "@/lib/utils"
import { getCurrentSession } from "@workspace/auth"
import { getDashboardStats, listRecentActivity } from "@workspace/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

async function UserStats() {
  const session = await getCurrentSession()

  if (!session?.user) {
    return null
  }

  const stats = await getDashboardStats(session.user.id)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        ["Owned projects", stats.ownedProjects],
        ["Recent activity", stats.activityCount],
        ["Lesson feedback", stats.feedbackCount],
      ].map(([label, value]) => (
        <Card key={label}>
          <CardHeader>
            <CardTitle className="text-sm">{label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

async function SlowInsights() {
  await sleep(1500)
  const activity = await listRecentActivity(3)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Streamed insights</CardTitle>
        <CardDescription>This widget waits before resolving so the route can stream the rest of the page first.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {activity.map((item) => (
          <div key={item.id} className="border border-border p-3">
            <p className="font-medium">{item.action}</p>
            <p className="text-muted-foreground">{item.details}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function DashboardWidgets() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="h-40 animate-pulse border border-border bg-muted/40" />}>
        <UserStats />
      </Suspense>
      <Suspense fallback={<div className="h-56 animate-pulse border border-border bg-muted/40" />}>
        <SlowInsights />
      </Suspense>
    </div>
  )
}
