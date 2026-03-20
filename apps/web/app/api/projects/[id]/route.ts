import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

import { getCurrentSession } from "@workspace/auth"
import { createActivity, db, projects, updateProject } from "@workspace/db"
import { projectSchema } from "@workspace/validation"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getCurrentSession()

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const payload = await request.json()
  const parsed = projectSchema.partial().parse(payload)
  const existing = await db.query.projects.findFirst({ where: eq(projects.id, id) })

  if (!existing) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  const project = await updateProject(id, parsed)
  await createActivity(
    session.user.id,
    "Updated project",
    `Updated ${project?.name ?? existing.name} through the project API route.`,
  )

  return NextResponse.json({ project })
}
