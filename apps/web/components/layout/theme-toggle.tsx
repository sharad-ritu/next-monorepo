"use client"

import { Moon, Sun } from "@phosphor-icons/react/dist/ssr"
import { useTheme } from "next-themes"

import { Button } from "@workspace/ui/components/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? <Sun data-icon="inline-start" /> : <Moon data-icon="inline-start" />}
      {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  )
}
