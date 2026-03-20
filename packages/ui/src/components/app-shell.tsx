import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

function AppShell({
  sidebar,
  header,
  children,
  aside,
}: {
  sidebar: React.ReactNode
  header: React.ReactNode
  children: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <div className="bg-background min-h-svh">
      <div className="mx-auto grid min-h-svh w-full max-w-[1600px] grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
        <aside className="border-border border-b p-5 lg:border-r lg:border-b-0">{sidebar}</aside>
        <main className="min-w-0">
          <div className="border-border border-b p-5">{header}</div>
          <div className="p-5">{children}</div>
        </main>
        <aside
          className={cn(
            "border-border hidden border-l p-5 lg:block",
            !aside && "bg-muted/20 text-muted-foreground text-sm",
          )}
        >
          {aside ?? "Code references, package ownership notes, and architecture hints appear here."}
        </aside>
      </div>
    </div>
  )
}

export { AppShell }
