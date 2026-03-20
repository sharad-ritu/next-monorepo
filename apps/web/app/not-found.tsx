import Link from "next/link"

import { Button } from "@workspace/ui/components/button"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col items-start justify-center gap-4 px-6">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">not-found.tsx</p>
      <h1 className="text-5xl font-semibold">Route not found.</h1>
      <p className="text-muted-foreground">This page exists to demonstrate App Router fallback conventions.</p>
      <Button asChild>
        <Link href="/learn">Back to lessons</Link>
      </Button>
    </div>
  )
}
