"use client"

import { createContext, useContext, useState } from "react"

type LessonUiContextValue = {
  showArchitectureNotes: boolean
  setShowArchitectureNotes: (value: boolean) => void
}

const LessonUiContext = createContext<LessonUiContextValue | null>(null)

export function LessonUiProvider({ children }: { children: React.ReactNode }) {
  const [showArchitectureNotes, setShowArchitectureNotes] = useState(true)

  return (
    <LessonUiContext.Provider value={{ showArchitectureNotes, setShowArchitectureNotes }}>
      {children}
    </LessonUiContext.Provider>
  )
}

export function useLessonUi() {
  const context = useContext(LessonUiContext)

  if (!context) {
    throw new Error("useLessonUi must be used within LessonUiProvider")
  }

  return context
}
