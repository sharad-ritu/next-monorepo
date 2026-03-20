import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-28 w-full border px-3 py-2 text-sm outline-none transition focus-visible:ring-2",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
