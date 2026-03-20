import { turboExamples } from "@workspace/config"
import { AppShell } from "@workspace/ui/components/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export default function TasksPage() {
  return (
    <AppShell sidebar={<div className="text-lg font-semibold">Tasks</div>} header={<div className="text-2xl font-semibold">Turbo task examples</div>}>
      <Card>
        <CardHeader>
          <CardTitle>Commands</CardTitle>
          <CardDescription>These come from the shared config package and reflect the workspace task model.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {turboExamples.map((command: string) => (
            <p key={command}>{command}</p>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  )
}
