import { Geist, JetBrains_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { LessonUiProvider } from "@/components/providers/lesson-ui-provider"
import { appMeta } from "@workspace/config"
import { Toaster } from "sonner"
import { cn } from "@workspace/ui/lib/utils"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: appMeta.name,
  description: appMeta.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, jetbrainsMono.variable)}
    >
      <body>
        <ThemeProvider>
          <QueryProvider>
            <LessonUiProvider>
              {children}
              <Toaster position="top-right" richColors />
            </LessonUiProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
