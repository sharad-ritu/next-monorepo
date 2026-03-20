import Link from "next/link"

import { getViewer } from "@/lib/session"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { logoutAction } from "@/app/actions"
import { Button } from "@workspace/ui/components/button"

export async function AppHeader() {
  const viewer = await getViewer()

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Use it and inspect it</p>
        <h2 className="text-2xl font-semibold">Every feature maps to actual files in the repo.</h2>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <ThemeToggle />
        {viewer ? (
          <>
            <div className="text-right text-sm">
              <p className="font-medium">{viewer.name}</p>
              <p className="text-muted-foreground">{viewer.email}</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
            <form action={logoutAction}>
              <Button type="submit" variant="ghost">
                Sign out
              </Button>
            </form>
          </>
        ) : (
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
