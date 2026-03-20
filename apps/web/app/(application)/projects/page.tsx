import Link from "next/link"

import { ProjectCreateForm } from "@/components/projects/project-create-form"
import { ProjectFilters } from "@/components/projects/project-filters"
import { requireUser } from "@workspace/auth"
import { listProjects } from "@workspace/db"
import { projectFilterSchema } from "@workspace/validation"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  await requireUser()
  const raw = await searchParams
  const filters = projectFilterSchema.parse(raw)
  const result = await listProjects(filters)

  return (
    <div className="space-y-6">
      <section className="grid gap-4 border border-border p-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          <Badge>URL state + RSC pagination</Badge>
          <h1 className="text-4xl font-semibold">Projects</h1>
          <p className="max-w-2xl text-muted-foreground leading-7">
            This page reads `searchParams` on the server, fetches paginated project data through the shared DB package,
            and uses a small client component to update the URL without making the whole page client-side.
          </p>
        </div>
        <ProjectCreateForm />
      </section>

      <ProjectFilters initialQuery={filters.query} initialStatus={filters.status ?? ""} />

      <div className="grid gap-4 lg:grid-cols-2">
        {result.items.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-2">
                <Badge variant="muted">{project.status}</Badge>
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <p className="text-muted-foreground">Owner: {project.owner.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" disabled={filters.page <= 1}>
          <Link href={`/projects?page=${Math.max(1, filters.page - 1)}&query=${filters.query}&status=${filters.status ?? ""}`}>
            Previous
          </Link>
        </Button>
        <p className="text-sm text-muted-foreground">
          Page {filters.page} of {result.totalPages}
        </p>
        <Button asChild variant="outline" disabled={filters.page >= result.totalPages}>
          <Link href={`/projects?page=${Math.min(result.totalPages, filters.page + 1)}&query=${filters.query}&status=${filters.status ?? ""}`}>
            Next
          </Link>
        </Button>
      </div>
    </div>
  )
}
