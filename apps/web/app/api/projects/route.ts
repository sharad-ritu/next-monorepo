import { NextResponse } from "next/server"

import { getCurrentSession } from "@workspace/auth"
import { createActivity, createProject, listProjects } from "@workspace/db"
import { projectFilterSchema, projectSchema } from "@workspace/validation"

export async function GET(request: Request) {
  const session = await getCurrentSession()

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(request.url)
  const filters = projectFilterSchema.parse(Object.fromEntries(url.searchParams.entries()))
  const projects = await listProjects(filters)

  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const session = await getCurrentSession()

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const payload = await request.json()
  const input = projectSchema.parse(payload)
  const project = await createProject(session.user.id, input)

  if (!project) {
    return NextResponse.json({ message: "Failed to create project" }, { status: 500 })
  }

  await createActivity(session.user.id, "Created project", `Created ${project.name} through the projects API route.`)

  return NextResponse.json({ project }, { status: 201 })
}
