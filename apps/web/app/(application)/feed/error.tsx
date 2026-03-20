"use client"

import { Button } from "@workspace/ui/components/button"

export default function FeedError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="space-y-4 border border-border p-6">
      <h1 className="text-2xl font-semibold">Feed failed to load</h1>
      <p className="text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
