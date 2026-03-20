import Link from "next/link"

import type { CodeReference } from "@workspace/content"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export function CodeReferencesPanel({
  title,
  note,
  references,
}: {
  title: string
  note: string
  references: CodeReference[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{note}</CardDescription>
        </CardHeader>
      </Card>
      {references.map((reference) => (
        <Card key={reference.path}>
          <CardHeader>
            <CardTitle className="text-sm">{reference.label}</CardTitle>
            <CardDescription>{reference.reason}</CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            <Link href={`https://github.com/search?q=${encodeURIComponent(reference.path)}`} target="_blank">
              {reference.path}
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
