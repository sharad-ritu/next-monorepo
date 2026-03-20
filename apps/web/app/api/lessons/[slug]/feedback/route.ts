import { NextResponse } from "next/server"

import { getCurrentSession } from "@workspace/auth"
import { createActivity, createFeedback, db, lessonFeedback } from "@workspace/db"
import { lessonFeedbackSchema } from "@workspace/validation"
import { eq } from "drizzle-orm"

import { revalidateLessonStats } from "@/lib/cached-data"

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const feedback = await db.query.lessonFeedback.findMany({
    where: eq(lessonFeedback.slug, slug),
    limit: 5,
    orderBy: (table, { desc }) => desc(table.createdAt),
  })

  return NextResponse.json({ feedback })
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await request.json()
  const input = lessonFeedbackSchema.parse({ ...payload, slug })
  const session = await getCurrentSession()
  const feedback = await createFeedback({
    ...input,
    userId: session?.user.id,
  })

  if (session?.user) {
    await createActivity(session.user.id, "API feedback", `Submitted feedback for ${slug} through a route handler.`)
  }

  await revalidateLessonStats()

  return NextResponse.json({ feedback }, { status: 201 })
}
