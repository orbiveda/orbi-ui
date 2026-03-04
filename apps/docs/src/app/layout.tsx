import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import "@orbi/tokens/tokens.css";
import "@/styles/docs.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbi UI — Documentation",
  description:
    "Component documentation and playground for Orbi UI, a dev-first flexible hybrid UI framework.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("orbi-theme")?.value ?? "dark";

  return (
    <html lang="en" data-orbi-theme={theme} className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
