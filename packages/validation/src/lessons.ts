import { z } from "zod"

export const lessonSlugSchema = z.enum([
  "app-router-foundations",
  "server-and-client-components",
  "data-fetching-patterns",
  "streaming-and-loading",
  "mutations-and-server-actions",
  "caching-and-revalidation",
  "search-params-and-pagination",
  "auth-and-protected-routes",
  "shared-state-patterns",
  "route-handlers-and-backend",
  "full-stack-forms",
  "monorepo-concepts",
])

export const lessonFeedbackSchema = z.object({
  slug: lessonSlugSchema,
  rating: z.coerce.number().min(1).max(5),
  message: z.string().min(10).max(280),
})

export type LessonSlug = z.infer<typeof lessonSlugSchema>
export type LessonFeedbackInput = z.infer<typeof lessonFeedbackSchema>
