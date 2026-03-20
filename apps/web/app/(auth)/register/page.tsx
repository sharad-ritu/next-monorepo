import Link from "next/link"

import { AuthForm } from "@/components/auth/auth-form"

export default function RegisterPage() {
  return (
    <div className="mx-auto grid min-h-svh max-w-5xl gap-6 px-6 py-10 lg:grid-cols-[1fr_420px]">
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Full-stack forms</p>
        <h1 className="text-5xl font-semibold">Create a new account.</h1>
        <p className="max-w-xl text-muted-foreground leading-7">
          Registration validates input with shared Zod schemas, writes to Postgres through Drizzle, and starts a custom
          session without relying on an auth framework.
        </p>
      </section>
      <div className="space-y-4">
        <AuthForm mode="register" />
        <p className="text-sm text-muted-foreground">
          Already registered? <Link className="text-foreground underline" href="/login">Sign in</Link>.
        </p>
      </div>
    </div>
  )
}
