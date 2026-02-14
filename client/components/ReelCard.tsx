'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt
} from 'react-icons/ai'
import Comments from '@/components/Comments'

interface Reel {
  id: string
  videoUrl: string
  username: string
  avatar: string
  caption?: string
  likes: number
  comments: number
}

export default function ReelCard({ reel }: { reel: Reel }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(reel.likes)
  const [likeAnimation, setLikeAnimation] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    const newLiked = !liked
    setLiked(newLiked)
    setLikeCount(prev => (newLiked ? prev + 1 : prev - 1))
    setLikeAnimation(true)
    setTimeout(() => setLikeAnimation(false), 600)
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/reels/${reel.id}`

    if (navigator.share) {
      await navigator.share({
        title: 'Check out this reel',
        url
      })
    } else {
      await navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="relative h-screen w-full bg-black snap-start overflow-hidden"
    >
      <video
        src={reel.videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-20 flex items-end justify-between">
        <div className="flex items-end gap-3 flex-1">
          <img
            src={reel.avatar || '/placeholder.svg'}
            alt={reel.username}
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">
              {reel.username}
            </p>
            {reel.caption && (
              <p className="text-white text-xs line-clamp-2 mt-1">
                {reel.caption}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Buttons */}
      <div className="absolute right-3 bottom-32 flex flex-col gap-5">
        {/* Like */}
        <motion.button
          onClick={handleLike}
          className="flex flex-col items-center gap-1.5"
        >
          <motion.div
            animate={
              likeAnimation
                ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.5 }}
          >
            {liked ? (
              <AiFillHeart className="w-7 h-7 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-7 h-7 text-white" />
            )}
          </motion.div>

          <span className="text-white text-xs font-semibold">
            {likeCount > 999
              ? (likeCount / 1000).toFixed(1) + 'k'
              : likeCount}
          </span>
        </motion.button>

        {/* Comment */}
        <motion.button
          onClick={() => setShowComments(true)}
          className="flex flex-col items-center gap-1.5"
        >
          <AiOutlineComment className="w-7 h-7 text-white" />
          <span className="text-white text-xs font-semibold">
            {reel.comments > 999
              ? (reel.comments / 1000).toFixed(1) + 'k'
              : reel.comments}
          </span>
        </motion.button>

        {/* Share */}
        <motion.button
          onClick={handleShare}
          className="flex flex-col items-center gap-1.5"
        >
          <AiOutlineShareAlt className="w-7 h-7 text-white" />
        </motion.button>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <Comments
          reelId={reel.id}
          onClose={() => setShowComments(false)}
        />
      )}
    </motion.div>
  )
}
