"use client"

import { useActionState } from "react"

import { loginAction, registerAction } from "@/app/actions"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

const initialState = { ok: false, message: "" }

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [state, action, pending] = useActionState(mode === "login" ? loginAction : registerAction, initialState)

  return (
    <form action={action} className="grid gap-4 border border-border p-6">
      {mode === "register" ? (
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue="Learner Demo" />
        </div>
      ) : null}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" defaultValue={mode === "login" ? "learner@example.com" : "new@example.com"} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" defaultValue="password123" />
      </div>
      {mode === "register" ? (
        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <select id="role" name="role" className="border-input bg-background h-10 border px-3 text-sm">
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Working..." : mode === "login" ? "Sign in with server action" : "Create account"}
      </Button>
      {state.message ? <p className="text-sm text-muted-foreground">{state.message}</p> : null}
    </form>
  )
}
