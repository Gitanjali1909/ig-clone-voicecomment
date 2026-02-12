'use client'

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
  if (!isOpen) return null

  const mockUsers = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    username: `user_${i}`,
    avatar: `https://picsum.photos/50/50?random=modal${i}`,
  }))

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-md rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h2 className="font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-sm text-white">{user.username}</p>
              </div>
              <button className="text-sm text-blue-500 font-semibold">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
