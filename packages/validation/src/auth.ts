import { z } from "zod"

export const roleSchema = z.enum(["member", "admin"])

export const registerSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  role: roleSchema.default("member"),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

export const profileSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  bio: z.string().max(280).default("").optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ProfileInput = z.infer<typeof profileSchema>
export type Role = z.infer<typeof roleSchema>
