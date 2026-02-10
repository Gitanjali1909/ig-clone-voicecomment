'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    router.push(token ? '/reels' : '/login')
  }, [router])
  
  return null
}
