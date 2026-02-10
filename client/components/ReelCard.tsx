'use client'

import { useState } from 'react'
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineAudio,
} from 'react-icons/ai'

interface Reel {
  id: string
  videoUrl: string
  username: string
  avatar: string
  likes: number
  comments: number
}

export default function ReelCard({ reel }: { reel: Reel }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(reel.likes)

  const handleLike = () => {
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative snap-start">
      <video
        src={reel.videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
      />

      <div className="absolute bottom-20 left-0 right-0 px-4">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={reel.avatar || '/placeholder.svg'}
            alt={`${reel.username}'s avatar`}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-white font-semibold">
            {reel.username}
          </span>
        </div>
      </div>

      <div className="absolute bottom-20 right-4 flex flex-col gap-6">
        <button
          onClick={handleLike}
          aria-label={liked ? 'Unlike reel' : 'Like reel'}
          title={liked ? 'Unlike reel' : 'Like reel'}
          className="flex flex-col items-center gap-2"
        >
          {liked ? (
            <AiFillHeart className="w-6 h-6 text-red-500" />
          ) : (
            <AiOutlineHeart className="w-6 h-6 text-white" />
          )}
          <span className="text-white text-xs">{likeCount}</span>
        </button>

        <button
          aria-label="View comments"
          title="View comments"
          className="flex flex-col items-center gap-2"
        >
          <AiOutlineComment className="w-6 h-6 text-white" />
          <span className="text-white text-xs">
            {reel.comments}
          </span>
        </button>

        <button
          aria-label="View audio"
          title="View audio"
          className="flex flex-col items-center gap-2"
        >
          <AiOutlineAudio className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}
