'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
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
  const [hasMore, setHasMore] = useState(true)

  const observerRef = useRef<HTMLDivElement | null>(null)

  const loadReels = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)

    try {
      const data = await apiCall(`/api/reels?page=${page}`)

      setReels((prev) => [...prev, ...data.reels])
      setHasMore(data.hasMore)
      setPage((prev) => prev + 1)
    } catch (e) {
      console.error('Failed to load reels:', e)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore])

  useEffect(() => {
    loadReels()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadReels()
        }
      },
      { threshold: 0.8 }
    )

    const current = observerRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [loadReels])

  if (loading && reels.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {reels.map((reel) => (
        <ReelCard key={reel.id} reel={reel} />
      ))}

      {hasMore && (
        <div
          ref={observerRef}
          className="h-20 flex items-center justify-center text-gray-400"
        >
          {loading ? 'Loading more...' : ''}
        </div>
      )}
    </div>
  )
}
