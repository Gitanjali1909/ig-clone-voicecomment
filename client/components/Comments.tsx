'use client'

import { useState } from 'react'
import VoiceRecorder from './VoiceRecorder'
import VoicePlayer from './VoicePlayer'
import { MdClose } from 'react-icons/md'

interface Comment {
  id: string
  username: string
  avatar: string
  text?: string
  audioUrl?: string
  timestamp: string
}

interface CommentsProps {
  reelId: number
  onClose: () => void
}

export default function Comments({ reelId, onClose }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'user1',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
      text: 'This is amazing!',
      timestamp: '2m ago',
    },
    {
      id: '2',
      username: 'user2',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      timestamp: '5m ago',
    },
  ])

  const [commentText, setCommentText] = useState('')

  function addTextComment() {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      username: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
      text: commentText,
      timestamp: 'now',
    }

    setComments(prev => [...prev, newComment])
    setCommentText('')
  }

  function addVoiceComment(audioUrl: string) {
    const newComment: Comment = {
      id: Date.now().toString(),
      username: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
      audioUrl,
      timestamp: 'now',
    }

    setComments(prev => [...prev, newComment])
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <h2 className="text-lg font-bold text-white">Comments</h2>

        <button
          onClick={onClose}
          aria-label="Close comments"
          title="Close comments"
          className="p-2 hover:bg-zinc-800 rounded-full"
        >
          <MdClose className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-3">
            <img
              src={comment.avatar || '/placeholder.svg'}
              alt={comment.username}
              className="w-8 h-8 rounded-full"
            />

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-white">
                  {comment.username}
                </span>
                <span className="text-xs text-zinc-500">
                  {comment.timestamp}
                </span>
              </div>

              {comment.text && (
                <p className="text-sm text-zinc-300">{comment.text}</p>
              )}

              {comment.audioUrl && (
                <VoicePlayer audioUrl={comment.audioUrl} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="border-t border-zinc-800 p-4 space-y-3">
        <VoiceRecorder onUpload={addVoiceComment} />

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTextComment()}
            className="flex-1 px-3 py-2 bg-zinc-800 text-white placeholder-zinc-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <button
            onClick={addTextComment}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
