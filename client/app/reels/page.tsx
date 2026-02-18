'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import ReelCard from '@/components/ReelCard'
import { apiCall } from '@/lib/api'

interface Reel {
  _id: string
  videoUrl: string
  user: {
    username: string
    avatar: string
  }
  likesCount: number
  commentsCount: number
}

interface ReelsResponse {
  reels: Reel[]
  hasMore: boolean
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
      const data: ReelsResponse = await apiCall(`/reels?page=${page}`)

      setReels(prev => [...prev, ...data.reels])
      setHasMore(data.hasMore)
      setPage(prev => prev + 1)
    } catch (err) {
      console.error('Failed to load reels:', err)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore])

  // Initial load
  useEffect(() => {
    loadReels()
  }, []) // only once

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
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
  }, [loadReels, hasMore, loading])

  if (loading && reels.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {reels.map(reel => (
        <div key={reel._id} className="snap-start h-screen">
          <ReelCard reel={reel} />
        </div>
      ))}

      {hasMore && (
        <div
          ref={observerRef}
          className="h-20 flex items-center justify-center text-gray-400"
        >
          {loading && 'Loading more...'}
        </div>
      )}
    </div>
  )
}
