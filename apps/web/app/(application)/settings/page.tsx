import { requireUser } from "@workspace/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

import { ProfileForm } from "@/components/settings/profile-form"

export default async function SettingsPage() {
  const user = await requireUser()

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <section className="space-y-4">
        <div className="space-y-3 border border-border p-6">
          <h1 className="text-4xl font-semibold">Settings</h1>
          <p className="max-w-2xl text-muted-foreground leading-7">
            This form demonstrates shared Zod validation, a server action mutation, and authenticated server-rendered
            state passed into a client form.
          </p>
        </div>
        <ProfileForm name={user.name} email={user.email} bio={user.bio} />
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Ownership</CardTitle>
          <CardDescription>What lives where in this flow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>`packages/validation` owns the profile schema.</p>
          <p>`packages/auth` guards access to the page.</p>
          <p>`packages/db` persists the profile update.</p>
          <p>`apps/web/app/actions.ts` ties the mutation to the form.</p>
        </CardContent>
      </Card>
    </div>
  )
}
