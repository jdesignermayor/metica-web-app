import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Metica',
  description: 'Data Visualization Cloud Tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "dark min-h-screen bg-background font-sans antialiased text-white",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
