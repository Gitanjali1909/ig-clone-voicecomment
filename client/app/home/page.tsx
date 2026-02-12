'use client'

import { useState } from 'react'
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineEllipsis,
} from 'react-icons/ai'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [posts, setPosts] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      author: 'username',
      avatar: `https://picsum.photos/40/40?random=user${i}`,
      image: `https://picsum.photos/600/600?random=post${i}`,
      liked: false,
      likes: 234 + i * 50,
      caption: 'Amazing moment captured! Love this place.',
      comments: 12 + i * 2,
      timestamp: '2 hours ago',
    }))
  )

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    )
  }

  return (
    <div className="max-w-2xl mx-auto pb-8">
      {posts.map((post) => (
        <div key={post.id} className="border-b border-white/10 py-4">
          <div className="px-4 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={post.avatar}
                alt={`${post.author}'s avatar`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-semibold text-sm">
                  {post.author}
                </p>
                <p className="text-gray-400 text-xs">
                  {post.timestamp}
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Open post options"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <AiOutlineEllipsis className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="relative mb-4 w-full aspect-square overflow-hidden bg-gray-900 rounded-lg">
            <img
              src={post.image}
              alt="User post"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <motion.button
                  type="button"
                  aria-label={post.liked ? 'Unlike post' : 'Like post'}
                  aria-pressed={post.liked}
                  onClick={() => toggleLike(post.id)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2"
                >
                  {post.liked ? (
                    <AiFillHeart className="w-6 h-6 text-red-500" />
                  ) : (
                    <AiOutlineHeart className="w-6 h-6 text-white" />
                  )}
                </motion.button>

                <button
                  type="button"
                  aria-label="Comment on post"
                  className="p-2"
                >
                  <AiOutlineComment className="w-6 h-6 text-white" />
                </button>

                <button
                  type="button"
                  aria-label="Share post"
                  className="p-2"
                >
                  <AiOutlineShareAlt className="w-6 h-6 text-white" />
                </button>
              </div>

              <button
                type="button"
                aria-label="Save post"
                className="p-2"
              >
                <AiOutlineHeart className="w-6 h-6 text-white" />
              </button>
            </div>

            <p className="text-white font-semibold text-sm">
              {post.likes} likes
            </p>

            <div>
              <p className="text-white text-sm">
                <span className="font-semibold">
                  {post.author}
                </span>{' '}
                {post.caption}
              </p>

              <button
                type="button"
                aria-label="View comments"
                className="text-gray-400 text-sm hover:text-gray-300 mt-1"
              >
                View all {post.comments} comments
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
