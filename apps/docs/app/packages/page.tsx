import { AppShell } from "@workspace/ui/components/app-shell"
import { Card, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

const packages = [
  ["@workspace/ui", "Visual primitives and app shell."],
  ["@workspace/content", "Typed lesson metadata."],
  ["@workspace/db", "Drizzle client and queries."],
  ["@workspace/auth", "Session and cookie helpers."],
  ["@workspace/validation", "Zod schemas shared across UI and backend."],
]

export default function PackagesPage() {
  return (
    <AppShell sidebar={<div className="text-lg font-semibold">Packages</div>} header={<div className="text-2xl font-semibold">Shared package catalog</div>}>
      <div className="grid gap-4 lg:grid-cols-2">
        {packages.map(([name, description]) => (
          <Card key={name}>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </AppShell>
  )
}
