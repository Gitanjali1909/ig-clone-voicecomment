'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
  const [likeAnimation, setLikeAnimation] = useState(false)

  const handleLike = () => {
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
    setLikeAnimation(true)
    setTimeout(() => setLikeAnimation(false), 600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="h-screen w-full bg-black flex items-center justify-center relative snap-start"
    >
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
        <motion.button
          onClick={handleLike}
          aria-label={liked ? 'Unlike reel' : 'Like reel'}
          title={liked ? 'Unlike reel' : 'Like reel'}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            animate={
              likeAnimation
                ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.4 }}
          >
            {liked ? (
              <AiFillHeart className="w-6 h-6 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-6 h-6 text-white" />
            )}
          </motion.div>
          <span className="text-white text-xs">{likeCount}</span>
        </motion.button>

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
    </motion.div>
  )
}
