import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import Navbar from '@/components/Navbar'
import MobileNav from '@/components/MobileNav'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Instagram',
  description: 'Share your moments',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="flex h-screen">
          <div className="hidden md:block md:w-64 border-r border-white/10">
            <Navbar />
          </div>
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">{children}</main>
          <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black">
            <MobileNav />
          </div>
        </div>
      </body>
    </html>
  )
}
