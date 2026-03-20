import Link from "next/link"

import { curriculum, topicGroups } from "@workspace/content"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <section className="max-w-3xl space-y-3">
        <Badge variant="muted">Curriculum</Badge>
        <h1 className="text-4xl font-semibold">Explore the concepts through running UI, code references, and shared packages.</h1>
        <p className="text-muted-foreground leading-7">
          Each lesson page is a real route in the app. Use the feature, inspect the architecture note, then follow the
          linked files back into the monorepo.
        </p>
      </section>

      {topicGroups.map(([group, topics]) => (
        <section key={group} className="space-y-4">
          <h2 className="text-2xl font-semibold">{group}</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {topics.map((topic) => (
              <Link key={topic.slug} href={`/learn/${topic.slug}`}>
                <Card className="h-full transition hover:border-foreground/40">
                  <CardHeader>
                    <CardTitle>{topic.title}</CardTitle>
                    <CardDescription>{topic.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>{topic.whyItMatters}</p>
                    <p>{topic.codeReferences.length} code references.</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <p className="text-sm text-muted-foreground">{curriculum.length} topics are wired into this app through a typed shared content package.</p>
    </div>
  )
}
