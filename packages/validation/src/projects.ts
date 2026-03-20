import { z } from "zod"

export const projectStatusSchema = z.enum(["planned", "active", "paused", "done"])

export const projectSchema = z.object({
  name: z.string().min(3).max(80),
  description: z.string().min(10).max(500),
  status: projectStatusSchema.default("planned"),
  tags: z.array(z.string().min(1).max(24)).max(5).default([]),
})

export const projectFilterSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(12).default(6),
  query: z.string().default(""),
  status: projectStatusSchema.optional(),
})

export type ProjectInput = z.infer<typeof projectSchema>
export type ProjectFilters = z.infer<typeof projectFilterSchema>
export type ProjectStatus = z.infer<typeof projectStatusSchema>
