import { cacheLife, cacheTag, revalidateTag } from "next/cache"

import { getPublicLessonStats } from "@workspace/db"

export async function getCachedLessonStats() {
  "use cache"

  cacheLife("minutes")
  cacheTag("lesson-stats")

  return getPublicLessonStats()
}

export async function revalidateLessonStats() {
  revalidateTag("lesson-stats", "max")
}
