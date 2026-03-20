import { randomUUID } from "node:crypto"

import { db, sql } from "./client"
import { activityLogs, lessonFeedback, projectMembers, projectNotes, projects, sessions, users } from "./schema"

async function reset() {
  await db.delete(projectMembers)
  await db.delete(projectNotes)
  await db.delete(activityLogs)
  await db.delete(lessonFeedback)
  await db.delete(projects)
  await db.delete(sessions)
  await db.delete(users)
}

export async function seed() {
  await reset()

  const seededUsers = await db
    .insert(users)
    .values([
      {
        name: "Admin Demo",
        email: "admin@example.com",
        passwordHash:
          "f5ba7db617855e2cd33466e3d18f8a85:e832e05ad1cacd34828ef21b297863b0575e25d70a73c788b4c34f377978479e296e74c6e09654a8e2a35f3fee8988d362a3f309d7b45e3b3960ac195d072c55",
        role: "admin",
        bio: "Uses the admin controls to demonstrate role-aware rendering and cache invalidation.",
      },
      {
        name: "Learner Demo",
        email: "learner@example.com",
        passwordHash:
          "f5ba7db617855e2cd33466e3d18f8a85:e832e05ad1cacd34828ef21b297863b0575e25d70a73c788b4c34f377978479e296e74c6e09654a8e2a35f3fee8988d362a3f309d7b45e3b3960ac195d072c55",
        role: "member",
        bio: "Explores lesson pages, settings, and project flows.",
      },
    ])
    .returning()

  const admin = seededUsers[0]
  const learner = seededUsers[1]

  if (!admin || !learner) {
    throw new Error("Failed to seed initial users.")
  }

  const owners = [admin, learner]

  for (let index = 0; index < 24; index += 1) {
    const owner = owners[index % owners.length]

    if (!owner) {
      throw new Error("Missing project owner during seed.")
    }

    const insertedProjects = await db
      .insert(projects)
      .values({
        ownerId: owner.id,
        name: `Tutorial Project ${index + 1}`,
        description: `Example project ${index + 1} used for pagination, filtering, mutation, and server component demos.`,
        status: index % 4 === 0 ? "planned" : index % 4 === 1 ? "active" : index % 4 === 2 ? "paused" : "done",
        tags: index % 2 === 0 ? ["nextjs", "server-components"] : ["monorepo", "drizzle"],
      })
      .returning()

    const project = insertedProjects[0]

    if (!project) {
      throw new Error("Failed to seed project.")
    }

    await db.insert(projectMembers).values({
      projectId: project.id,
      userId: owner.id,
      role: "owner",
    })

    await db.insert(projectNotes).values({
      projectId: project.id,
      body: `Note for ${project.name}: inspect this entry to understand how server-rendered data and client updates stay aligned.`,
    })
  }

  await db.insert(activityLogs).values(
    Array.from({ length: 12 }).map((_, index) => ({
      actorId: owners[index % owners.length]?.id ?? admin.id,
      action: index % 2 === 0 ? "Created project" : "Reviewed lesson",
      details:
        index % 2 === 0
          ? `Created project card ${index + 1} through a server action.`
          : `Opened the caching and revalidation lesson to inspect tag invalidation.`,
    })),
  )

  await db.insert(lessonFeedback).values([
    {
      userId: learner.id,
      slug: "caching-and-revalidation",
      rating: 5,
      message: "Seeing cached public stats and a dynamic private widget side by side made the difference concrete.",
    },
    {
      userId: admin.id,
      slug: "route-handlers-and-backend",
      rating: 4,
      message: "The API routes and server actions comparison was practical and easy to inspect.",
    },
  ])

  console.log(
    JSON.stringify(
      {
        seeded: true,
        users: [
          { email: admin.email, password: "password123", role: admin.role },
          { email: learner.email, password: "password123", role: learner.role },
        ],
        runId: randomUUID(),
      },
      null,
      2,
    ),
  )
}

seed()
  .then(async () => {
    await sql.end()
    process.exit(0)
  })
  .catch(async (error) => {
    console.error(error)
    await sql.end({ timeout: 1 })
    process.exit(1)
  })
