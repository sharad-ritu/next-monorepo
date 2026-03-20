import Link from "next/link"

import { turboExamples } from "@workspace/config"
import { curriculum } from "@workspace/content"
import { AppShell } from "@workspace/ui/components/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

function Sidebar() {
  return (
    <div className="space-y-4">
      <Link href="/" className="text-lg font-semibold">
        Docs App
      </Link>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        <Link href="/packages">Packages</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/imports">Imports</Link>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Second app in the monorepo</p>
      <h1 className="text-3xl font-semibold">Shared packages are reused here too.</h1>
    </div>
  )
}

export default function DocsHomePage() {
  return (
    <AppShell sidebar={<Sidebar />} header={<Header />}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Why this app exists</CardTitle>
            <CardDescription>The docs app proves that the shared packages are not web-only abstractions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>{curriculum.length} lesson definitions are imported from `@workspace/content`.</p>
            {turboExamples.map((command: string) => (
              <p key={command}>{command}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
