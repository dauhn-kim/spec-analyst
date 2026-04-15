import { Header } from "@/widgets/header/ui/Header"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "SpecAnalyst | AI-Powered Tech Comparison",
    template: "%s | SpecAnalyst",
  },
  description:
    "Stop scrolling, start comparing. Get AI-driven technical spec comparisons for OLED TVs, Laptops, and more with expert verdicts.",
  keywords: [
    "product comparison",
    "tech specs",
    "AI review",
    "TV comparison",
    "laptop specs",
  ],
  authors: [{ name: "SpecAnalyst Team" }],
  openGraph: {
    title: "SpecAnalyst | Precision Product Comparison",
    description: "Data-driven tech insights for smarter buying decisions.",
    url: "https://specanalyst.ai",
    siteName: "SpecAnalyst",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpecAnalyst",
    description: "The ultimate tool for technical product comparison.",
  },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
