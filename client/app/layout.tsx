import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import Navbar from "@/components/Navbar"
import MobileNav from "@/components/MobileNav"
import { AuthProvider } from "@/context/AuthContext"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "Modern social platform with voice note comments",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-black text-white antialiased">
        <AuthProvider>
          <div className="flex min-h-screen">
            
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex md:w-64 border-r border-white/10">
              <Navbar />
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
              {children}
            </main>

            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black">
              <MobileNav />
            </div>

          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
