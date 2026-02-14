'use client'

import { useState } from 'react'
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineEllipsis,
  AiOutlineMail,
  AiOutlineBook
} from 'react-icons/ai'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [posts, setPosts] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      author: `user${i}`,
      avatar: `https://picsum.photos/40/40?random=user${i}`,
      image: `https://picsum.photos/600/600?random=post${i}`,
      liked: false,
      likes: 234 + i * 50,
      caption: 'Amazing moment captured! Love this place.',
      comments: 12 + i * 2,
      timestamp: '2 hours ago',
    }))
  )

  const stories = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    username: i === 0 ? 'Your Story' : `user${i}`,
    avatar: `https://picsum.photos/60/60?random=story${i}`,
    hasStory: i !== 0,
  }))

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    )
  }

  return (
    <div className="max-w-2xl mx-auto pb-10">

      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-black text-white">Instagram</h1>

        <button
          type="button"
          aria-label="Open messages"
          className="p-2 hover:bg-white/10 rounded-lg transition"
        >
          <AiOutlineMail className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* STORIES */}
      <div className="sticky top-[57px] z-40 bg-black border-b border-white/10">
        <div className="px-4 py-4 overflow-x-auto">
          <div className="flex gap-4">
            {stories.map((story) => (
              <motion.button
                key={story.id}
                type="button"
                aria-label={`View story from ${story.username}`}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div
                  className={`w-16 h-16 rounded-full p-[2px] ${
                    story.hasStory
                      ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
                      : 'bg-white/10'
                  }`}
                >
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-full h-full rounded-full object-cover border-2 border-black"
                  />
                </div>

                <span className="text-xs text-white w-16 truncate text-center">
                  {story.username}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* POSTS */}
      <div>
        {posts.map((post) => (
          <div key={post.id} className="border-b border-white/10 py-4">

            {/* POST HEADER */}
            <div className="px-4 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={`${post.author} avatar`}
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
                aria-label="Post options"
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <AiOutlineEllipsis className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* IMAGE */}
            <div className="relative mb-4 w-full aspect-square overflow-hidden bg-gray-900 rounded-lg">
              <img
                src={post.image}
                alt={`Post by ${post.author}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* ACTIONS */}
            <div className="px-4 space-y-3">
              <div className="flex items-center justify-between">

                <div className="flex gap-3">
                  <motion.button
                    type="button"
                    aria-label={post.liked ? 'Unlike post' : 'Like post'}
                    aria-pressed={post.liked}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLike(post.id)}
                    className="p-1"
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
                    className="p-1"
                  >
                    <AiOutlineComment className="w-6 h-6 text-white" />
                  </button>

                  <button
                    type="button"
                    aria-label="Share post"
                    className="p-1"
                  >
                    <AiOutlineShareAlt className="w-6 h-6 text-white" />
                  </button>
                </div>

                <button
                  type="button"
                  aria-label="Save post"
                  className="p-1"
                >
                  <AiOutlineBook className="w-6 h-6 text-white" />
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
                  aria-label={`View all ${post.comments} comments`}
                  className="text-gray-400 text-sm hover:text-gray-300 mt-1"
                >
                  View all {post.comments} comments
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
