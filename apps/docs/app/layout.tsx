import { Geist, JetBrains_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { appMeta } from "@workspace/config"
import { cn } from "@workspace/ui/lib/utils"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: `Docs | ${appMeta.name}`,
  description: "Secondary app showing how shared packages and Turbo workflows fit together.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("antialiased", fontSans.variable, fontMono.variable)}>
      <body>{children}</body>
    </html>
  )
}
