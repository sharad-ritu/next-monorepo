"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"

type ActivityItem = {
  id: string
  action: string
  details: string
  createdAt: string
  actor: {
    name: string
  }
}

export function ActivityFeedClient() {
  const queryClient = useQueryClient()
  const activity = useQuery({
    queryKey: ["activity"],
    queryFn: async () => {
      const response = await fetch("/api/activity", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to load activity")
      }
      return response.json() as Promise<{ activity: ActivityItem[] }>
    },
  })

  const feedbackMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/lessons/data-fetching-patterns/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: "data-fetching-patterns",
          rating: 5,
          message: "Posted through the route handler mutation example.",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }

      return response.json()
    },
    onSuccess: async () => {
      toast.success("Submitted feedback through a route handler.")
      await queryClient.invalidateQueries({ queryKey: ["activity"] })
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="outline" onClick={() => activity.refetch()}>
          Refresh via query
        </Button>
        <Button type="button" onClick={() => feedbackMutation.mutate()}>
          POST feedback via API
        </Button>
      </div>
      <div className="space-y-3">
        {activity.data?.activity.map((item) => (
          <div key={item.id} className="border border-border p-4 text-sm">
            <p className="font-medium">{item.action}</p>
            <p className="text-muted-foreground">{item.details}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
