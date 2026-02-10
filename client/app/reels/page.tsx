'use client'
import { useEffect, useState } from 'react'
import ReelCard from '@/components/ReelCard'
import { apiCall } from '@/lib/api'

interface Reel {
  id: string
  videoUrl: string
  username: string
  avatar: string
  likes: number
  comments: number
}

export default function ReelsPage() {
  const [reels, setReels] = useState<Reel[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadReels()
  }, [])

  async function loadReels() {
    setLoading(true)
    try {
      const data = await apiCall(`/api/reels?page=${page}`)
      setReels(data.reels)
    } catch (e) {
      console.error('Failed to load reels:', e)
    } finally {
      setLoading(false)
    }
  }

  if (loading && reels.length === 0) return <div className="h-screen flex items-center justify-center text-white">Loading...</div>

  return <div className="h-screen overflow-y-scroll snap-y snap-mandatory">{reels.map(reel => <ReelCard key={reel.id} reel={reel} />)}</div>
}
