import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import "./globals.css"
import localFont from "next/font/local"

const fontLocal = localFont({
  style: 'syne',
  variable: '--font-syne',
  src: [
    {
      path: '../public/font/Syne-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/font/Syne-Medium.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/font/Syne-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
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
          fontLocal.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
