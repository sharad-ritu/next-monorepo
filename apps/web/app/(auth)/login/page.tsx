import Link from "next/link"

import { AuthForm } from "@/components/auth/auth-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export default function LoginPage() {
  return (
    <div className="mx-auto grid min-h-svh max-w-5xl gap-6 px-6 py-10 lg:grid-cols-[1fr_420px]">
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Custom session auth</p>
        <h1 className="text-5xl font-semibold">Sign in to the tutorial app.</h1>
        <p className="max-w-xl text-muted-foreground leading-7">
          Auth is implemented with cookies, a shared auth package, database-backed sessions, and protected routes. Use
          the seeded demo account or register a new one.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Seeded credentials</CardTitle>
            <CardDescription>Available after running the seed script.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>`learner@example.com` / `password123`</p>
            <p>`admin@example.com` / `password123`</p>
          </CardContent>
        </Card>
      </section>
      <div className="space-y-4">
        <AuthForm mode="login" />
        <p className="text-sm text-muted-foreground">
          No account yet? <Link className="text-foreground underline" href="/register">Register here</Link>.
        </p>
      </div>
    </div>
  )
}
