"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { startTransition, useDeferredValue, useEffect, useState } from "react"

import { Input } from "@workspace/ui/components/input"

export function ProjectFilters({
  initialQuery,
  initialStatus,
}: {
  initialQuery: string
  initialStatus: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)
  const deferredQuery = useDeferredValue(query)

  function update(params: { query?: string; status?: string }) {
    const next = new URLSearchParams(searchParams.toString())

    for (const [key, value] of Object.entries(params)) {
      if (!value) {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    }

    next.delete("page")

    startTransition(() => {
      router.push(`/projects?${next.toString()}`)
    })
  }

  useEffect(() => {
    if (deferredQuery === initialQuery) {
      return
    }

    update({ query: deferredQuery })
    // This intentionally responds only to the deferred query value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredQuery])

  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_200px]">
      <Input
        placeholder="Search projects"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <select
        className="border-input bg-background h-10 border px-3 text-sm"
        value={initialStatus}
        onChange={(event) => update({ status: event.target.value })}
      >
        <option value="">All statuses</option>
        <option value="planned">Planned</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="done">Done</option>
      </select>
    </div>
  )
}
