'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineHome, AiOutlineCompass, AiOutlinePlaySquare, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'
import { motion } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()
  
  if (pathname === '/login' || pathname === '/signup') return null

  const links = [
    { href: '/home', icon: AiOutlineHome, label: 'Home' },
    { href: '/search', icon: AiOutlineCompass, label: 'Search' },
    { href: '/reels', icon: AiOutlinePlaySquare, label: 'Reels' },
    { href: '/create', icon: AiOutlinePlus, label: 'Create' },
    { href: '/profile', icon: AiOutlineUser, label: 'Profile' },
  ]

  return (
    <nav className="h-screen flex flex-col p-6 sticky top-0">
      <Link href="/home" className="text-2xl font-black mb-12 tracking-tighter">Instagram</Link>
      <div className="flex-1 space-y-4">
        {links.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link key={href} href={href} className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all hover:bg-white/5">
              <motion.div animate={isActive ? { scale: 1.1 } : { scale: 1 }}>
                <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              </motion.div>
              <span className={`text-base font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>{label}</span>
            </Link>
          )
        })}
      </div>
      <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login' }} className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-sm transition-colors">Logout</button>
    </nav>
  )
}
