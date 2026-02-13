'use client'

import { useEffect } from 'react'

interface FollowersModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

export default function FollowersModal({
  isOpen,
  onClose,
  title,
}: FollowersModalProps) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const mockUsers = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    username: `user_${i}`,
    avatar: `https://picsum.photos/100/100?random=${i}`,
  }))

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-black border border-zinc-800 rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex items-center justify-center px-4 py-4 border-b border-zinc-800">
          <h2 className="text-white font-semibold text-sm">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 text-zinc-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Users */}
        <div className="max-h-[400px] overflow-y-auto divide-y divide-zinc-800">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-zinc-900 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                />
                <span className="text-sm text-white">
                  {user.username}
                </span>
              </div>

              <button className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
