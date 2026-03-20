import { describe, expect, it } from "vitest"

import { lessonFeedbackSchema, projectFilterSchema, registerSchema } from "./index"

describe("validation schemas", () => {
  it("parses registration input", () => {
    const value = registerSchema.parse({
      name: "Learner Demo",
      email: "learner@example.com",
      password: "password123",
      role: "member",
    })

    expect(value.email).toBe("learner@example.com")
  })

  it("normalizes project filter defaults", () => {
    const value = projectFilterSchema.parse({})

    expect(value.page).toBe(1)
    expect(value.pageSize).toBe(6)
  })

  it("rejects short lesson feedback messages", () => {
    expect(() =>
      lessonFeedbackSchema.parse({
        slug: "caching-and-revalidation",
        rating: 5,
        message: "Too short",
      }),
    ).toThrow()
  })
})
