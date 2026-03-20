import { NextResponse } from "next/server"

import { getCurrentSession } from "@workspace/auth"
import { listRecentActivity } from "@workspace/db"

export async function GET() {
  const session = await getCurrentSession()

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const activity = await listRecentActivity(10)

  return NextResponse.json({ activity })
}
