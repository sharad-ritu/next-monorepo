import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto"

import "server-only"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { getEnv } from "@workspace/config"
import {
  createSessionRecord,
  deleteSessionRecord,
  findSessionWithUser,
} from "@workspace/db"

const SESSION_AGE_MS = 1000 * 60 * 60 * 24 * 7

function toCookieValue(sessionId: string) {
  const signature = createHash("sha256")
    .update(`${sessionId}:${getEnv().SESSION_SECRET}`)
    .digest("hex")

  return `${sessionId}.${signature}`
}

function fromCookieValue(value: string) {
  const [sessionId, signature] = value.split(".")

  if (!sessionId || !signature) {
    return null
  }

  const expected = createHash("sha256")
    .update(`${sessionId}:${getEnv().SESSION_SECRET}`)
    .digest("hex")

  const matches = timingSafeEqual(Buffer.from(signature), Buffer.from(expected))

  return matches ? sessionId : null
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

export async function verifyPassword(password: string, hash: string) {
  const [salt, storedHash] = hash.split(":")

  if (!salt || !storedHash) {
    return false
  }

  const candidate = scryptSync(password, salt, 64)
  const expected = Buffer.from(storedHash, "hex")

  return expected.length === candidate.length && timingSafeEqual(candidate, expected)
}

export async function createSession(userId: string) {
  const cookieStore = await cookies()
  const expiresAt = new Date(Date.now() + SESSION_AGE_MS)
  const session = await createSessionRecord(userId, expiresAt)

  if (!session) {
    throw new Error("Failed to create session.")
  }

  cookieStore.set(getEnv().SESSION_COOKIE_NAME, toCookieValue(session.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  })

  return session
}

export async function destroySession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(getEnv().SESSION_COOKIE_NAME)

  if (cookie) {
    const sessionId = fromCookieValue(cookie.value)

    if (sessionId) {
      await deleteSessionRecord(sessionId)
    }
  }

  cookieStore.delete(getEnv().SESSION_COOKIE_NAME)
}

export async function getCurrentSession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(getEnv().SESSION_COOKIE_NAME)

  if (!cookie) {
    return null
  }

  const sessionId = fromCookieValue(cookie.value)

  if (!sessionId) {
    cookieStore.delete(getEnv().SESSION_COOKIE_NAME)
    return null
  }

  const session = await findSessionWithUser(sessionId)

  if (!session || session.expiresAt < new Date()) {
    cookieStore.delete(getEnv().SESSION_COOKIE_NAME)
    return null
  }

  return session
}

export async function requireUser() {
  const session = await getCurrentSession()

  if (!session?.user) {
    redirect("/login")
  }

  return session.user
}

export async function requireRole(role: "admin" | "member") {
  const user = await requireUser()

  if (role === "admin" && user.role !== "admin") {
    redirect("/dashboard")
  }

  return user
}
