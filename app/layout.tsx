import type React from "react"
import type { Metadata } from "next"
import { Oxygen_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import localFont from "next/font/local"

const oxygen_mono = Oxygen_Mono({ subsets: ["latin"], weight: '400' })

const vcrFont = localFont({
  src: "../public/fonts/VCR_OSD_MONO.ttf",
  variable: "--font-vcr",
})

export const metadata: Metadata = {
  title: "Matrix Portfolio",
  description: "A Matrix-themed portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${oxygen_mono.className} ${vcrFont.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

