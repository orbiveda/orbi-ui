import "@orbi/tokens/tokens.css";
import { ThemeProvider } from "@orbi/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbi UI - Next.js Consumer Test",
  description: "Testing Orbi UI components in Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
