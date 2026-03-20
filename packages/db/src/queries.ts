import { and, count, desc, eq, ilike, sql } from "drizzle-orm"

import { db } from "./client"
import { activityLogs, lessonFeedback, projects, sessions, users } from "./schema"
import type { ProjectFilters, ProjectInput } from "@workspace/validation"
import type { ProfileInput } from "@workspace/validation"

export async function findUserByEmail(email: string) {
  return db.query.users.findFirst({
    where: eq(users.email, email.toLowerCase()),
  })
}

export async function findUserById(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

export async function createUser(input: {
  name: string
  email: string
  passwordHash: string
  role: "member" | "admin"
}) {
  const [user] = await db
    .insert(users)
    .values({
      ...input,
      email: input.email.toLowerCase(),
    })
    .returning()

  return user
}

export async function updateUser(userId: string, input: ProfileInput) {
  const [user] = await db
    .update(users)
    .set({
      name: input.name,
      email: input.email.toLowerCase(),
      bio: input.bio ?? "",
    })
    .where(eq(users.id, userId))
    .returning()

  return user
}

export async function createSessionRecord(userId: string, expiresAt: Date) {
  const [session] = await db.insert(sessions).values({ userId, expiresAt }).returning()
  return session
}

export async function findSessionWithUser(sessionId: string) {
  return db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
    with: {
      user: true,
    },
  })
}

export async function deleteSessionRecord(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId))
}

export async function listProjects(filters: ProjectFilters) {
  const where = and(
    filters.status ? eq(projects.status, filters.status) : undefined,
    filters.query ? ilike(projects.name, `%${filters.query}%`) : undefined,
  )

  const items = await db.query.projects.findMany({
    where,
    orderBy: desc(projects.updatedAt),
    limit: filters.pageSize,
    offset: (filters.page - 1) * filters.pageSize,
    with: {
      owner: true,
    },
  })

  const [totals] = await db.select({ value: count() }).from(projects).where(where)

  return {
    items,
    total: totals?.value ?? 0,
    totalPages: Math.max(1, Math.ceil((totals?.value ?? 0) / filters.pageSize)),
  }
}

export async function createProject(ownerId: string, input: ProjectInput) {
  const [project] = await db.insert(projects).values({ ...input, ownerId }).returning()
  return project
}

export async function updateProject(projectId: string, input: Partial<ProjectInput>) {
  const [project] = await db
    .update(projects)
    .set({ ...input, updatedAt: sql`now()` })
    .where(eq(projects.id, projectId))
    .returning()

  return project
}

export async function getDashboardStats(userId: string) {
  const [ownedProjects] = await db
    .select({ value: count() })
    .from(projects)
    .where(eq(projects.ownerId, userId))

  const [activityCount] = await db
    .select({ value: count() })
    .from(activityLogs)
    .where(eq(activityLogs.actorId, userId))

  const [feedbackCount] = await db.select({ value: count() }).from(lessonFeedback)

  return {
    ownedProjects: ownedProjects?.value ?? 0,
    activityCount: activityCount?.value ?? 0,
    feedbackCount: feedbackCount?.value ?? 0,
  }
}

export async function listRecentActivity(limit = 8) {
  return db.query.activityLogs.findMany({
    orderBy: desc(activityLogs.createdAt),
    limit,
    with: {
      actor: true,
    },
  })
}

export async function createActivity(actorId: string, action: string, details: string) {
  const [activity] = await db.insert(activityLogs).values({ actorId, action, details }).returning()
  return activity
}

export async function createFeedback(input: { userId?: string; slug: string; rating: number; message: string }) {
  const [feedback] = await db.insert(lessonFeedback).values(input).returning()
  return feedback
}

export async function getPublicLessonStats() {
  const results = await db
    .select({
      slug: lessonFeedback.slug,
      averageRating: sql<number>`round(avg(${lessonFeedback.rating})::numeric, 1)`,
      total: count(),
    })
    .from(lessonFeedback)
    .groupBy(lessonFeedback.slug)

  return results
}
