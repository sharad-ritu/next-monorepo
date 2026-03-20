import { NextResponse } from "next/server"

import { getCurrentSession } from "@workspace/auth"

export async function GET() {
  const session = await getCurrentSession()

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
    },
  })
}
