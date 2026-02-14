"use client"

import { useState } from "react"
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineEllipsis,
  AiOutlineMail,
} from "react-icons/ai"
import { motion } from "framer-motion"
import Comments from "@/components/Comments"
import Inbox from "@/components/Inbox"

interface Post {
  id: number
  author: string
  avatar: string
  image: string
  liked: boolean
  likes: number
  caption: string
  comments: number
  timestamp: string
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      author: "username",
      avatar: `https://picsum.photos/40/40?random=user${i}`,
      image: `https://picsum.photos/600/600?random=post${i}`,
      liked: false,
      likes: 234 + i * 50,
      caption: "Amazing moment captured! Love this place.",
      comments: 12 + i * 2,
      timestamp: "2 hours ago",
    }))
  )

  const [activePost, setActivePost] = useState<number | null>(null)
  const [showInbox, setShowInbox] = useState(false)

  const stories = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    username: i === 0 ? "Your Story" : `user${i}`,
    avatar: `https://picsum.photos/60/60?random=story${i}`,
    hasStory: i !== 0,
  }))

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

  const handleShare = (postId: number) => {
    const url = `${window.location.origin}/home/${postId}`

    if (navigator.share) {
      navigator.share({ title: "Check out this post", url })
    } else {
      navigator.clipboard.writeText(url)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between z-40">
        <h1 className="text-xl font-black">Instagram</h1>

        <motion.button
          onClick={() => setShowInbox(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Open inbox"
          title="Open inbox"
        >
          <AiOutlineMail className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Stories */}
      <div className="border-b border-white/10">
        <div className="px-4 py-4 overflow-x-auto">
          <div className="flex gap-4">
            {stories.map((story) => (
              <motion.div
                key={story.id}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
              >
                <div
                  className={`w-16 h-16 rounded-full p-0.5 flex items-center justify-center ${
                    story.hasStory
                      ? "bg-gradient-to-br from-purple-500 to-pink-500"
                      : "bg-white/10"
                  }`}
                >
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-full h-full rounded-full object-cover border-2 border-black"
                  />
                </div>

                <span className="text-xs text-center truncate w-16">
                  {story.username.length > 8
                    ? story.username.slice(0, 7) + "."
                    : story.username}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="border-b border-white/10 py-4">
          {/* Post Header */}
          <div className="px-4 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-semibold text-sm">
                  {post.author}
                </p>
                <p className="text-gray-400 text-xs">{post.timestamp}</p>
              </div>
            </div>

            <button
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="More options"
              title="More options"
            >
              <AiOutlineEllipsis className="w-5 h-5" />
            </button>
          </div>

          {/* Image */}
          <div className="relative mb-4 w-full aspect-square overflow-hidden bg-gray-900 rounded-lg">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Actions */}
          <div className="px-4 space-y-3">
            <div className="flex gap-2">
              <motion.button
                onClick={() => toggleLike(post.id)}
                whileTap={{ scale: 0.9 }}
                className="icon-button"
                aria-label={post.liked ? "Unlike post" : "Like post"}
                title={post.liked ? "Unlike post" : "Like post"}
              >
                {post.liked ? (
                  <AiFillHeart className="w-6 h-6 text-red-500" />
                ) : (
                  <AiOutlineHeart className="w-6 h-6 text-white" />
                )}
              </motion.button>

              <motion.button
                onClick={() => setActivePost(post.id)}
                whileTap={{ scale: 0.9 }}
                className="icon-button"
                aria-label="Open comments"
                title="Open comments"
              >
                <AiOutlineComment className="w-6 h-6 text-white" />
              </motion.button>

              <motion.button
                onClick={() => handleShare(post.id)}
                whileTap={{ scale: 0.9 }}
                className="icon-button"
                aria-label="Share post"
                title="Share post"
              >
                <AiOutlineShareAlt className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            <p className="text-white font-semibold text-sm">
              {post.likes} likes
            </p>

            <div>
              <p className="text-white text-sm">
                <span className="font-semibold">{post.author}</span>{" "}
                {post.caption}
              </p>

              <button
                onClick={() => setActivePost(post.id)}
                className="text-gray-400 text-sm hover:text-gray-300 mt-1"
                aria-label="View all comments"
                title="View all comments"
              >
                View all {post.comments} comments
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modals */}
      {activePost !== null && (
        <Comments
          reelId={activePost}   // ✅ FIXED: reelId passed
          onClose={() => setActivePost(null)}
        />
      )}

      {showInbox && <Inbox onClose={() => setShowInbox(false)} />}
    </div>
  )
}
