import { notFound } from "next/navigation"

import { LessonPlayground } from "@/components/lesson/lesson-playground"
import { CodeReferencesPanel } from "@/components/layout/code-references-panel"
import { getCachedLessonStats } from "@/lib/cached-data"
import { topicBySlug } from "@workspace/content"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const entry = topicBySlug[topic as keyof typeof topicBySlug]

  if (!entry) {
    return { title: "Topic not found" }
  }

  return {
    title: `${entry.title} | Next Learning`,
    description: entry.summary,
  }
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>
}) {
  const { topic } = await params
  const entry = topicBySlug[topic as keyof typeof topicBySlug]

  if (!entry) {
    notFound()
  }

  const stats = await getCachedLessonStats()
  const currentStats = stats.find((item) => item.slug === entry.slug)

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 border border-border p-6">
        <div className="flex flex-wrap gap-3">
          <Badge variant="muted">{entry.category}</Badge>
          <Badge>{entry.slug}</Badge>
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold">{entry.title}</h1>
          <p className="max-w-4xl text-base leading-7 text-muted-foreground">{entry.summary}</p>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Why it matters</CardTitle>
              <CardDescription>{entry.whyItMatters}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-3">
              <div>
                <p className="text-sm font-medium">Architecture note</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.architectureNote}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Avoid when</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.avoidWhen}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Cached public stats</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Average rating: {currentStats?.averageRating ?? "Not rated yet"} across {currentStats?.total ?? 0} feedback entries.
                </p>
              </div>
            </CardContent>
          </Card>

          <LessonPlayground topic={entry} />
        </div>
        <CodeReferencesPanel
          title="Code references"
          note="These files back the route, data flow, and demo for this topic."
          references={entry.codeReferences}
        />
      </section>
    </div>
  )
}
