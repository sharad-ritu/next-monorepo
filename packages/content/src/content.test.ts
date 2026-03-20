import { describe, expect, it } from "vitest"

import { curriculum, topicBySlug, topicGroups } from "./index"

describe("curriculum registry", () => {
  it("contains the expected breadth of topics", () => {
    expect(curriculum.length).toBeGreaterThanOrEqual(12)
  })

  it("exposes direct topic lookup by slug", () => {
    expect(topicBySlug["monorepo-concepts"].title).toContain("Monorepo")
  })

  it("groups topics by category", () => {
    expect(topicGroups.length).toBeGreaterThan(3)
  })
})
