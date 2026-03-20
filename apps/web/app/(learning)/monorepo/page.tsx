import { turboExamples } from "@workspace/config"
import { topicGroups } from "@workspace/content"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

const packages = [
  ["apps/web", "Main full-stack tutorial app."],
  ["apps/docs", "Secondary app proving cross-app sharing."],
  ["packages/ui", "Shared design system and layout primitives."],
  ["packages/db", "Drizzle schema, client, queries, and seed scripts."],
  ["packages/auth", "Cookie-backed session helpers and guards."],
  ["packages/validation", "Shared Zod schemas."],
  ["packages/content", "Typed lesson metadata and code references."],
]

export default function MonorepoPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-3 border border-border p-6">
        <h1 className="text-4xl font-semibold">Monorepo map</h1>
        <p className="max-w-2xl text-muted-foreground leading-7">
          This workspace uses real app and package boundaries. Shared UI, validation, DB, auth, and content live in
          packages so both apps can import them without copy-pasting code.
        </p>
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        {packages.map(([path, description]) => (
          <Card key={path}>
            <CardHeader>
              <CardTitle>{path}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Turbo examples</CardTitle>
          <CardDescription>Package tasks are registered in `turbo.json`, then delegated from the root.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {turboExamples.map((command) => (
            <p key={command}>{command}</p>
          ))}
          <p>{topicGroups.length} curriculum groups are imported from `@workspace/content`.</p>
        </CardContent>
      </Card>
    </div>
  )
}
