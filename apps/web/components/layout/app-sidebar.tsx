import Link from "next/link"

import { curriculum, topicGroups } from "@workspace/content"

export function AppSidebar() {
  const primaryLinks: Array<{ href: string; label: string }> = [
    { href: "/learn", label: "Curriculum" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/projects", label: "Projects" },
    { href: "/feed", label: "Feed" },
    { href: "/settings", label: "Settings" },
    { href: "/monorepo", label: "Monorepo" },
  ]

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="space-y-2">
        <Link href="/" className="text-lg font-semibold">
          Next Learning
        </Link>
        <p className="text-sm leading-6 text-muted-foreground">
          A working reference app for App Router, monorepos, data, auth, caching, and modern full-stack patterns.
        </p>
      </div>

      <nav className="space-y-6">
        <div className="space-y-2 text-sm">
          {primaryLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="block text-muted-foreground transition hover:text-foreground">
              {label}
            </Link>
          ))}
        </div>

        <div className="space-y-4">
          {topicGroups.map(([group, topics]) => (
            <div key={group} className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">{group}</p>
              <div className="flex flex-col gap-2 text-sm">
                {topics.slice(0, 3).map((topic) => (
                  <Link key={topic.slug} href={`/learn/${topic.slug}`} className="leading-6 text-foreground/80 hover:text-foreground">
                    {topic.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="mt-auto text-xs leading-6 text-muted-foreground">
        {curriculum.length} lessons, 2 apps, shared packages, and a Postgres-backed domain model.
      </div>
    </div>
  )
}
