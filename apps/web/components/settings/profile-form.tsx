"use client"

import { useActionState } from "react"

import { updateProfileAction } from "@/app/actions"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"

const initialState = { ok: false, message: "" }

export function ProfileForm({
  name,
  email,
  bio,
}: {
  name: string
  email: string
  bio: string
}) {
  const [state, action, pending] = useActionState(updateProfileAction, initialState)

  return (
    <form action={action} className="grid gap-4 border border-border p-5">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={name} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" defaultValue={email} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" defaultValue={bio} />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save with server action"}
      </Button>
      {state.message ? <p className="text-sm text-muted-foreground">{state.message}</p> : null}
    </form>
  )
}
