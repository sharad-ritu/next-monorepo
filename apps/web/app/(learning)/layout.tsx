import { AppShell } from "@workspace/ui/components/app-shell"

import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"

export default function LearningLayout({ children }: { children: React.ReactNode }) {
  return <AppShell sidebar={<AppSidebar />} header={<AppHeader />}>{children}</AppShell>
}
