'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineAudio,
  AiOutlineClose
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

  const [showComments, setShowComments] = useState(false)
  const [showRecorder, setShowRecorder] = useState(false)

  const handleLike = () => {
    setLiked(prev => !prev)
    setLikeCount(prev => (liked ? prev - 1 : prev + 1))
    setLikeAnimation(true)
    setTimeout(() => setLikeAnimation(false), 600)
  }

  return (
    <>
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

        {/* User Info */}
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

        {/* Right Action Buttons */}
        <div className="absolute bottom-20 right-4 flex flex-col gap-6">

          {/* LIKE */}
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

          {/* COMMENTS */}
          <button
            onClick={() => setShowComments(true)}
            aria-label="View comments"
            title="View comments"
            className="flex flex-col items-center gap-2"
          >
            <AiOutlineComment className="w-6 h-6 text-white" />
            <span className="text-white text-xs">
              {reel.comments}
            </span>
          </button>

          {/* VOICE NOTE */}
          <button
            onClick={() => {
              setShowComments(true)
              setShowRecorder(true)
            }}
            aria-label="Add voice note"
            title="Add voice note"
            className="flex flex-col items-center gap-2"
          >
            <AiOutlineAudio className="w-6 h-6 text-white" />
          </button>
        </div>
      </motion.div>

      {/* COMMENTS MODAL */}
      {showComments && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-end z-50">
          <div className="bg-zinc-900 w-full max-h-[70vh] rounded-t-2xl p-4 overflow-y-auto relative">

            {/* Close Button */}
            <button
              onClick={() => {
                setShowComments(false)
                setShowRecorder(false)
              }}
              aria-label="Close comments"
              title="Close comments"
              className="absolute top-4 right-4 text-white"
            >
              <AiOutlineClose size={20} />
            </button>

            <h2 className="text-white text-lg font-semibold mb-4">
              Comments
            </h2>

            {/* Placeholder Comments */}
            <div className="space-y-3 mb-4">
              <div className="text-white text-sm">
                <span className="font-semibold">user1</span> 🔥 nice reel
              </div>
              <div className="text-white text-sm">
                <span className="font-semibold">user2</span> Love this!
              </div>
            </div>

            {/* Recorder Toggle */}
            <button
              onClick={() => setShowRecorder(prev => !prev)}
              className="text-sm text-blue-400 mb-4"
            >
              {showRecorder ? 'Cancel Voice Note' : 'Add Voice Note'}
            </button>

            {/* Recorder Placeholder */}
            {showRecorder && (
              <div className="bg-zinc-800 p-3 rounded-lg text-white text-sm">
                🎙️ Voice recorder UI goes here
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
