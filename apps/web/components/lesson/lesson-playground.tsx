"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useActionState, useState, useTransition } from "react"
import { toast } from "sonner"

import { submitLessonFeedbackAction } from "@/app/actions"
import { useLessonUi } from "@/components/providers/lesson-ui-provider"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import type { TopicDefinition } from "@workspace/content"

type ActionState = { ok: boolean; message: string }

const initialState: ActionState = { ok: false, message: "" }

export function LessonPlayground({ topic }: { topic: TopicDefinition }) {
  const { showArchitectureNotes, setShowArchitectureNotes } = useLessonUi()
  const queryClient = useQueryClient()
  const [rating, setRating] = useState("5")
  const [pending, startTransition] = useTransition()
  const [state, action] = useActionState(submitLessonFeedbackAction, initialState)

  const lessonStats = useQuery({
    queryKey: ["lesson-stats", topic.slug],
    queryFn: async () => {
      const response = await fetch(`/api/lessons/${topic.slug}/feedback`, { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to load lesson feedback")
      }
      return response.json() as Promise<{ feedback: Array<{ message: string; rating: number }> }>
    },
  })

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Card>
        <CardHeader>
          <CardTitle>Live playground</CardTitle>
          <CardDescription>
            This client component lives inside a server-rendered lesson page. It uses local state, a server action, and
            a client query on the same screen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowArchitectureNotes(!showArchitectureNotes)}
            >
              {showArchitectureNotes ? "Hide" : "Show"} architecture notes
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                startTransition(async () => {
                  await queryClient.invalidateQueries({ queryKey: ["lesson-stats", topic.slug] })
                  toast.success("Refetched lesson feedback through TanStack Query.")
                })
              }
            >
              Refresh feedback
            </Button>
          </div>

          <form action={action} className="grid gap-4 border border-border p-4">
            <input type="hidden" name="slug" value={topic.slug} />
            <div className="grid gap-2">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" name="rating" value={rating} onChange={(event) => setRating(event.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">What helped?</Label>
              <Textarea
                id="message"
                name="message"
                defaultValue={`The ${topic.title} lesson connected the explanation with the actual repo files.`}
              />
            </div>
            <Button type="submit">Submit with server action</Button>
            {state.message ? <p className="text-sm text-muted-foreground">{state.message}</p> : null}
          </form>

          <div className="grid gap-3">
            <p className="text-sm font-medium">Client query state</p>
            {lessonStats.isLoading ? <p className="text-sm text-muted-foreground">Loading feedback from route handler…</p> : null}
            {lessonStats.data?.feedback.map((entry, index) => (
              <div key={`${entry.message}-${index}`} className="border border-border p-3 text-sm">
                <p className="font-medium">Rating {entry.rating}/5</p>
                <p className="text-muted-foreground">{entry.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>State ownership</CardTitle>
          <CardDescription>This lesson intentionally mixes several state types.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>Local state: the rating input and the architecture notes toggle.</p>
          <p>Server state: feedback loaded through TanStack Query from a route handler.</p>
          <p>Server mutation: the form submits to a server action.</p>
          <p>{pending ? "A non-urgent refetch is currently pending." : "The refresh button uses a transition for non-urgent UI work."}</p>
        </CardContent>
      </Card>
    </div>
  )
}
