import { topicGroups } from "@workspace/content"
import { AppShell } from "@workspace/ui/components/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export default function ImportsPage() {
  return (
    <AppShell sidebar={<div className="text-lg font-semibold">Imports</div>} header={<div className="text-2xl font-semibold">Cross-package imports</div>}>
      <Card>
        <CardHeader>
          <CardTitle>Imported curriculum groups</CardTitle>
          <CardDescription>This page is powered by `@workspace/content`, proving reuse in the second app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {topicGroups.map(([group, topics]) => (
            <p key={group}>
              {group}: {topics.length} topics
            </p>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  )
}
