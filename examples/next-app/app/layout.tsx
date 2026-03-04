import "@orbi/tokens/tokens.css"
import { ReactNode } from "react"

export const metadata = {
  title: "Orbi UI - Next.js Example",
  description: "Example application demonstrating Orbi UI components in Next.js",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
