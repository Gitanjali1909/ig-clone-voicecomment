'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineHome, AiOutlinePlaySquare, AiOutlineUser } from 'react-icons/ai'

export default function Navbar() {
  const pathname = usePathname()
  const [hover, setHover] = useState<string | null>(null)
  
  if (pathname === '/login' || pathname === '/signup') return null

  const links = [
    { href: '/home', icon: AiOutlineHome },
    { href: '/reels', icon: AiOutlinePlaySquare },
    { href: '/profile', icon: AiOutlineUser },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/home" className="text-xl font-bold">Reels</Link>
        <div className="flex gap-6">
          {links.map(({ href, icon: Icon }) => (
            <Link key={href} href={href} onMouseEnter={() => setHover(href)} onMouseLeave={() => setHover(null)}>
              <Icon className={`w-6 h-6 transition-colors ${pathname === href || hover === href ? 'text-white' : 'text-zinc-500'}`} />
            </Link>
          ))}
        </div>
        <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login' }} className="text-sm text-zinc-400 hover:text-white">Logout</button>
      </div>
    </nav>
  )
}
