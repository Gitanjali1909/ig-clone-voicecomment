'use client'

import { useEffect, useState } from 'react'
import FollowersModal from '@/components/FollowersModal'

interface User {
  username: string
  bio: string
  avatar: string
  posts: number
  followers: number
  following: number
}

type ModalType = 'Followers' | 'Following' | null

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<ModalType>(null)

  useEffect(() => {
    const mockUser: User = {
      username: 'pretty_user',
      bio: 'Building cool things 🚀',
      avatar: 'https://picsum.photos/200',
      posts: 24,
      followers: 128,
      following: 76,
    }

    setUser(mockUser)
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading profile...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

          {/* Avatar */}
          <div className="w-32 h-32">
            <img
              src={user.avatar}
              alt={`${user.username} avatar`}
              className="w-full h-full rounded-full object-cover border border-zinc-700"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-4">

            {/* Username + Edit */}
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                {user.username}
              </h2>
              <button className="px-4 py-1.5 border border-zinc-700 rounded-lg text-sm hover:bg-zinc-900 transition">
                Edit Profile
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <span>
                <strong>{user.posts}</strong> posts
              </span>

              <button
                onClick={() => {
                  setModalTitle('Followers')
                  setModalOpen(true)
                }}
                className="hover:underline"
              >
                <strong>{user.followers}</strong> followers
              </button>

              <button
                onClick={() => {
                  setModalTitle('Following')
                  setModalOpen(true)
                }}
                className="hover:underline"
              >
                <strong>{user.following}</strong> following
              </button>
            </div>

            {/* Bio */}
            <div>
              <p className="text-sm text-zinc-300">
                {user.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 my-10"></div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-4">
          {Array.from({ length: user.posts }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-zinc-900 hover:opacity-80 transition cursor-pointer"
            >
              <img
                src={`https://picsum.photos/500?random=post${i}`}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

      </div>

      {modalTitle && (
        <FollowersModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setModalTitle(null)
          }}
          title={modalTitle}
        />
      )}
    </div>
  )
}
