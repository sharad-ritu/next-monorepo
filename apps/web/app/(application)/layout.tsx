import { requireUser } from "@workspace/auth"
import { AppShell } from "@workspace/ui/components/app-shell"

import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"

export default async function ApplicationLayout({ children }: { children: React.ReactNode }) {
  await requireUser()
  return <AppShell sidebar={<AppSidebar />} header={<AppHeader />}>{children}</AppShell>
}
