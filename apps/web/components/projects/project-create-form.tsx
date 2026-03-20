"use client"

import { useActionState } from "react"

import { createProjectAction } from "@/app/actions"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"

const initialState = { ok: false, message: "" }

export function ProjectCreateForm() {
  const [state, action, pending] = useActionState(createProjectAction, initialState)

  return (
    <form action={action} className="grid gap-4 border border-border p-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Project name</Label>
        <Input id="name" name="name" placeholder="Next.js lesson sandbox" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue="Server-rendered project list with shared validation, Drizzle persistence, and cache invalidation."
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <select id="status" name="status" className="border-input bg-background h-10 border px-3 text-sm">
          <option value="planned">Planned</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input id="tags" name="tags" defaultValue="nextjs,monorepo" />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create with server action"}
      </Button>
      {state.message ? <p className="text-sm text-muted-foreground">{state.message}</p> : null}
    </form>
  )
}
