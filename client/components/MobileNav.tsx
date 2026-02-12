'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineHome, AiOutlineCompass, AiOutlinePlaySquare, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'

export default function MobileNav() {
  const pathname = usePathname()
  
  if (pathname === '/login' || pathname === '/signup') return null

  const links = [
    { href: '/home', icon: AiOutlineHome },
    { href: '/search', icon: AiOutlineCompass },
    { href: '/reels', icon: AiOutlinePlaySquare },
    { href: '/create', icon: AiOutlinePlus },
    { href: '/profile', icon: AiOutlineUser },
  ]

  return (
    <nav className="flex items-center justify-around h-16 bg-black/80 glass-effect">
      {links.map(({ href, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link key={href} href={href} className="p-2 transition-colors">
            <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
          </Link>
        )
      })}
    </nav>
  )
}
