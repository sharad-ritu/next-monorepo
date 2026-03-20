"use server"

import { redirect } from "next/navigation"

import { createSession, destroySession, getCurrentSession, hashPassword, requireUser, verifyPassword } from "@workspace/auth"
import {
  createActivity,
  createFeedback,
  createProject,
  createUser,
  findUserByEmail,
  updateUser,
} from "@workspace/db"
import { lessonFeedbackSchema, loginSchema, profileSchema, projectSchema, registerSchema } from "@workspace/validation"

import { revalidateLessonStats } from "@/lib/cached-data"

type ActionState = {
  ok: boolean
  message: string
}

function parseTags(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
}

export async function registerAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  })

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid registration input." }
  }

  const existing = await findUserByEmail(parsed.data.email)

  if (existing) {
    return { ok: false, message: "An account with that email already exists." }
  }

  const user = await createUser({
    ...parsed.data,
    passwordHash: await hashPassword(parsed.data.password),
  })

  if (!user) {
    return { ok: false, message: "Failed to create account." }
  }

  await createSession(user.id)
  await createActivity(user.id, "Registered", "Created a new account through the registration server action.")
  redirect("/dashboard")
}

export async function loginAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return { ok: false, message: "Invalid login input." }
  }

  const user = await findUserByEmail(parsed.data.email)

  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { ok: false, message: "Incorrect email or password." }
  }

  await createSession(user.id)
  await createActivity(user.id, "Signed in", "Started a new database-backed session.")
  redirect("/dashboard")
}

export async function logoutAction() {
  await destroySession()
  redirect("/login")
}

export async function createProjectAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser()
  const parsed = projectSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    status: formData.get("status"),
    tags: parseTags(formData.get("tags")),
  })

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid project input." }
  }

  const project = await createProject(user.id, parsed.data)

  if (!project) {
    return { ok: false, message: "Failed to create project." }
  }

  await createActivity(user.id, "Created project", `Created ${project.name} through a server action.`)

  return { ok: true, message: `Created ${project.name}. Refresh the list or change pagination to see it in context.` }
}

export async function updateProfileAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser()
  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    bio: formData.get("bio"),
  })

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid profile input." }
  }

  await updateUser(user.id, parsed.data)
  await createActivity(user.id, "Updated profile", "Saved profile settings through a server action.")

  return { ok: true, message: "Profile updated." }
}

export async function submitLessonFeedbackAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = lessonFeedbackSchema.safeParse({
    slug: formData.get("slug"),
    rating: formData.get("rating"),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid feedback input." }
  }

  const session = await getCurrentSession()
  const user = session?.user
  await createFeedback({
    ...parsed.data,
    userId: user?.id,
  })

  if (user) {
    await createActivity(user.id, "Left lesson feedback", `Reviewed the ${parsed.data.slug} lesson.`)
  }

  await revalidateLessonStats()

  return { ok: true, message: "Feedback submitted and lesson stats revalidated." }
}
