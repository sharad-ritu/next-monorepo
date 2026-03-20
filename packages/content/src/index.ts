import type { LessonSlug } from "@workspace/validation"

export type CodeReference = {
  path: string
  label: string
  reason: string
}

export type TopicDefinition = {
  slug: LessonSlug
  title: string
  category: string
  summary: string
  whyItMatters: string
  avoidWhen: string
  architectureNote: string
  demoRoute: string
  related: LessonSlug[]
  codeReferences: CodeReference[]
}

export const curriculum: TopicDefinition[] = [
  {
    slug: "app-router-foundations",
    title: "App Router Foundations",
    category: "Routing",
    summary: "Layouts, route groups, dynamic routes, metadata, and App Router file conventions working together in a real navigation tree.",
    whyItMatters: "App Router structure defines how rendering, loading states, and nested navigation behave across your app.",
    avoidWhen: "Do not over-nest route groups when a plain layout and a clear folder structure are enough.",
    architectureNote: "The learning shell uses nested layouts, a dynamic topic route, route groups for dashboard separation, and metadata generation per lesson.",
    demoRoute: "/learn/app-router-foundations",
    related: ["streaming-and-loading", "monorepo-concepts"],
    codeReferences: [
      { path: "apps/web/app/(learning)/layout.tsx", label: "Learning layout", reason: "Shows nested layout composition." },
      { path: "apps/web/app/(learning)/learn/[topic]/page.tsx", label: "Dynamic topic route", reason: "Shows App Router dynamic segments." },
      { path: "apps/web/app/(learning)/learn/[topic]/loading.tsx", label: "Route loading state", reason: "Shows segment-level loading UI." },
    ],
  },
  {
    slug: "server-and-client-components",
    title: "Server and Client Components",
    category: "Rendering",
    summary: "See what stays on the server, what hydrates in the browser, and how to embed client islands in a server-first page.",
    whyItMatters: "This is the core mental model for modern Next.js apps.",
    avoidWhen: "Do not mark entire pages as client components when only one interactive leaf needs it.",
    architectureNote: "Lesson pages are server components that pass small serializable props into interactive playground panels.",
    demoRoute: "/learn/server-and-client-components",
    related: ["data-fetching-patterns", "shared-state-patterns"],
    codeReferences: [
      { path: "apps/web/app/(learning)/learn/[topic]/page.tsx", label: "Server lesson page", reason: "The page fetches topic data on the server." },
      { path: "apps/web/components/lesson/lesson-playground.tsx", label: "Client playground", reason: "Interactive client island inside a server page." },
    ],
  },
  {
    slug: "data-fetching-patterns",
    title: "Data Fetching Patterns",
    category: "Data",
    summary: "Compare RSC fetching, route handlers, and TanStack Query with hydration.",
    whyItMatters: "You need different fetching strategies for server-rendered data, client-driven refresh, and mutations.",
    avoidWhen: "Do not use client-side fetching when the data can be rendered directly on the server without interactivity.",
    architectureNote: "Projects are rendered with server data, while the activity feed uses a client query for refresh and polling examples.",
    demoRoute: "/learn/data-fetching-patterns",
    related: ["route-handlers-and-backend", "shared-state-patterns"],
    codeReferences: [
      { path: "apps/web/app/(application)/projects/page.tsx", label: "Server-fetched projects page", reason: "Shows RSC data fetching with search params." },
      { path: "apps/web/app/api/activity/route.ts", label: "Activity route handler", reason: "JSON endpoint for client querying." },
      { path: "apps/web/components/feed/activity-feed-client.tsx", label: "TanStack Query client", reason: "Shows client fetching and invalidation." },
    ],
  },
  {
    slug: "streaming-and-loading",
    title: "Streaming, Loading, and Error States",
    category: "Rendering",
    summary: "Use Suspense and loading files to stream independent UI regions.",
    whyItMatters: "Streaming keeps the page responsive while slower data resolves.",
    avoidWhen: "Do not wrap every tiny component in Suspense. Use boundaries around meaningful chunks.",
    architectureNote: "The dashboard streams slower widgets separately from the shell, and the feed route has route-level loading UI.",
    demoRoute: "/learn/streaming-and-loading",
    related: ["app-router-foundations", "caching-and-revalidation"],
    codeReferences: [
      { path: "apps/web/app/(application)/dashboard/page.tsx", label: "Streaming dashboard", reason: "Shows suspense boundaries on the page." },
      { path: "apps/web/app/(application)/feed/loading.tsx", label: "Feed loading state", reason: "Shows route segment loading UI." },
      { path: "apps/web/app/(application)/feed/error.tsx", label: "Feed error boundary", reason: "Shows recoverable errors." },
    ],
  },
  {
    slug: "mutations-and-server-actions",
    title: "Mutations and Server Actions",
    category: "Mutations",
    summary: "Create and update records through server actions, then compare that with API-based mutation flows.",
    whyItMatters: "Server actions simplify many full-stack form flows, but route handlers remain useful for client-heavy interactions.",
    avoidWhen: "Do not force server actions into places where a JSON API is better for reusable client state.",
    architectureNote: "Project creation and profile editing use server actions, while the feedback widget also exposes a route handler path.",
    demoRoute: "/learn/mutations-and-server-actions",
    related: ["full-stack-forms", "route-handlers-and-backend"],
    codeReferences: [
      { path: "apps/web/app/actions.ts", label: "Server actions", reason: "Core mutation handlers with validation." },
      { path: "apps/web/app/api/projects/route.ts", label: "Projects API", reason: "Route-handler alternative for the same domain." },
    ],
  },
  {
    slug: "caching-and-revalidation",
    title: "Caching and Revalidation",
    category: "Performance",
    summary: "Separate cached public lesson stats from dynamic user-specific data and invalidate the right things.",
    whyItMatters: "Correct caching improves speed without leaking user-specific state.",
    avoidWhen: "Do not cache authenticated user dashboards as if they were shared public content.",
    architectureNote: "Public feedback stats are tagged and revalidated; the current-session widget stays dynamic.",
    demoRoute: "/learn/caching-and-revalidation",
    related: ["data-fetching-patterns", "auth-and-protected-routes"],
    codeReferences: [
      { path: "apps/web/lib/cached-data.ts", label: "Cached data helpers", reason: "Shows cache tags and revalidation." },
      { path: "apps/web/app/(application)/dashboard/page.tsx", label: "Dynamic dashboard", reason: "Shows uncached private data." },
    ],
  },
  {
    slug: "search-params-and-pagination",
    title: "Search Params and Pagination",
    category: "Routing",
    summary: "Drive filters and pagination from the URL while keeping the page server-rendered.",
    whyItMatters: "URL state is shareable, bookmarkable, and works well with server components.",
    avoidWhen: "Do not move purely local ephemeral state into the URL.",
    architectureNote: "The projects page reads `searchParams` on the server and renders a paginated list with filter controls.",
    demoRoute: "/learn/search-params-and-pagination",
    related: ["data-fetching-patterns", "shared-state-patterns"],
    codeReferences: [
      { path: "apps/web/app/(application)/projects/page.tsx", label: "Projects page", reason: "Parses search params on the server." },
      { path: "apps/web/components/projects/project-filters.tsx", label: "Filter controls", reason: "Updates the URL from a small client component." },
    ],
  },
  {
    slug: "auth-and-protected-routes",
    title: "Auth and Protected Routes",
    category: "Backend",
    summary: "Custom sessions with cookies, protected routes, and role-aware UI in a Next.js monorepo.",
    whyItMatters: "Authentication touches server rendering, cookies, redirects, and secure data access.",
    avoidWhen: "Do not pass full auth records into client components when only a small user summary is needed.",
    architectureNote: "Auth lives in a shared package so the web app can focus on UI and routing while teaching cookie-backed sessions.",
    demoRoute: "/learn/auth-and-protected-routes",
    related: ["route-handlers-and-backend", "shared-state-patterns"],
    codeReferences: [
      { path: "packages/auth/src/index.ts", label: "Shared auth package", reason: "Cookie and session helpers live here." },
      { path: "apps/web/app/(auth)/login/page.tsx", label: "Login page", reason: "Shows a real auth flow using server actions." },
      { path: "apps/web/app/(application)/dashboard/layout.tsx", label: "Protected layout", reason: "Shows server-side route protection." },
    ],
  },
  {
    slug: "shared-state-patterns",
    title: "Shared State Patterns",
    category: "State",
    summary: "Compare local state, URL state, server state, and shared client UI state.",
    whyItMatters: "Choosing the wrong state owner is one of the fastest ways to make a React app hard to reason about.",
    avoidWhen: "Do not introduce global client state when server state or URL state already owns the data.",
    architectureNote: "The app uses URL state for projects, TanStack Query for activity data, and a small client provider for lesson UI preferences.",
    demoRoute: "/learn/shared-state-patterns",
    related: ["data-fetching-patterns", "search-params-and-pagination"],
    codeReferences: [
      { path: "apps/web/components/providers/query-provider.tsx", label: "Server state provider", reason: "Shows shared query cache setup." },
      { path: "apps/web/components/providers/lesson-ui-provider.tsx", label: "Local shared UI state", reason: "Shows small scoped client state." },
    ],
  },
  {
    slug: "route-handlers-and-backend",
    title: "Route Handlers and Backend Patterns",
    category: "Backend",
    summary: "Build API endpoints in the App Router and compare them to server actions.",
    whyItMatters: "Modern full-stack Next.js often mixes form-first server actions with JSON-based route handlers.",
    avoidWhen: "Do not create internal API routes for everything if the data is only needed by a server component.",
    architectureNote: "The app exposes typed JSON endpoints for activity, current user, projects, and lesson feedback.",
    demoRoute: "/learn/route-handlers-and-backend",
    related: ["mutations-and-server-actions", "data-fetching-patterns"],
    codeReferences: [
      { path: "apps/web/app/api/me/route.ts", label: "Current user API", reason: "Shows auth-aware JSON responses." },
      { path: "apps/web/app/api/lessons/[slug]/feedback/route.ts", label: "Lesson feedback API", reason: "Shows validated nested route handlers." },
    ],
  },
  {
    slug: "full-stack-forms",
    title: "Full-Stack Forms",
    category: "Mutations",
    summary: "Schema-first forms using shared Zod validation on both the client and server.",
    whyItMatters: "Shared form contracts keep validation aligned across UI, server actions, and APIs.",
    avoidWhen: "Do not rely on client-side validation alone for anything that writes to the database.",
    architectureNote: "Register, profile, project, and feedback forms all share schema definitions from a central package.",
    demoRoute: "/learn/full-stack-forms",
    related: ["mutations-and-server-actions", "auth-and-protected-routes"],
    codeReferences: [
      { path: "packages/validation/src/auth.ts", label: "Auth schemas", reason: "Shared input validation." },
      { path: "packages/validation/src/projects.ts", label: "Project schemas", reason: "Shared mutation contracts." },
      { path: "apps/web/app/actions.ts", label: "Server-side parsing", reason: "Forms parse against shared Zod schemas." },
    ],
  },
  {
    slug: "monorepo-concepts",
    title: "Monorepo Concepts",
    category: "Monorepo",
    summary: "See how apps and packages share code, dependencies, validation, UI, and task execution.",
    whyItMatters: "A monorepo is valuable when package boundaries are intentional and shared code is real.",
    avoidWhen: "Do not split everything into packages prematurely if there is no clear ownership boundary.",
    architectureNote: "This repo uses two apps and multiple shared packages so you can inspect imports and Turbo scripts directly.",
    demoRoute: "/learn/monorepo-concepts",
    related: ["app-router-foundations", "route-handlers-and-backend"],
    codeReferences: [
      { path: "turbo.json", label: "Turbo task graph", reason: "Shows workspace task orchestration." },
      { path: "apps/docs/app/page.tsx", label: "Docs app", reason: "Secondary app reusing shared packages." },
      { path: "packages/ui/src/components/app-shell.tsx", label: "Shared UI package", reason: "Cross-app visual component reuse." },
    ],
  },
]

export const topicBySlug = Object.fromEntries(curriculum.map((topic) => [topic.slug, topic])) as Record<
  LessonSlug,
  TopicDefinition
>

export const topicGroups = Array.from(
  curriculum.reduce((map, topic) => {
    const value = map.get(topic.category) ?? []
    value.push(topic)
    map.set(topic.category, value)
    return map
  }, new Map<string, TopicDefinition[]>()),
)
