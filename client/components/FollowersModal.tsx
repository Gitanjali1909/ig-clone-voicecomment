'use client'

import { useState } from 'react'
import { MdClose } from 'react-icons/md'

interface FollowersModalProps {
  isOpen: boolean
  onClose: () => void
  title: 'Followers' | 'Following'
}

export default function FollowersModal({
  isOpen,
  onClose,
  title,
}: FollowersModalProps) {
  const [followers] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      username: `user_${i + 1}`,
      avatar: `https://picsum.photos/40/40?random=follower${i}`,
      isFollowing: i % 3 === 0,
    }))
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end z-50">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="followers-modal-title"
        className="w-full bg-black rounded-t-2xl max-h-screen overflow-y-auto"
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-white/10 bg-black">
          <h2
            id="followers-modal-title"
            className="text-lg font-bold text-white"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <MdClose className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="divide-y divide-white/10">
          {followers.map((user) => (
            <div
              key={user.id}
              className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={`${user.username}'s avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-white font-semibold text-sm">
                  {user.username}
                </p>
              </div>

              <button
                type="button"
                aria-label={
                  user.isFollowing
                    ? `Unfollow ${user.username}`
                    : `Follow ${user.username}`
                }
                className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition-colors ${
                  user.isFollowing
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {user.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
