import { getCurrentSession } from "@workspace/auth"

export async function getViewer() {
  const session = await getCurrentSession()
  return session?.user ?? null
}
