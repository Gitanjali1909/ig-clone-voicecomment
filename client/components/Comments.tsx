'use client'
import { useState, useRef, useEffect } from 'react'
import VoicePlayer from './VoicePlayer'
import { MdMic, MdStop, MdSend } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'

interface Comment {
  id: string
  username: string
  avatar: string
  text?: string
  audioUrl?: string
}

interface CommentsProps {
  onClose: () => void
}

export default function Comments({ onClose }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', username: '_kib_riaa.00', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1', text: 'Omg she\'s my diva 💗' },
    { id: '2', username: 'fr_niduu', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2', text: 'Ate and left no crumbs 😭❤️' },
    { id: '3', username: 'toib_aa08', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3', text: 'Oooooo lailaaa pyaari lg rhi ho😂' },
    { id: '4', username: 'tf.haniaa_', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4', text: 'This goes hard gurl!! ❤️🍓' },
  ])
  const [commentText, setCommentText] = useState('')
  const [recording, setRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [loading, setLoading] = useState(false)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<BlobPart[]>([])
  const timer = useRef<NodeJS.Timeout | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  async function addTextComment() {
    if (!commentText.trim()) return
    setLoading(true)
    const newComment: Comment = {
      id: Date.now().toString(),
      username: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
      text: commentText
    }
    setComments([newComment, ...comments])
    setCommentText('')
    await new Promise(resolve => setTimeout(resolve, 300))
    setLoading(false)
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRecorder.current = recorder
      chunks.current = []
      setRecordingDuration(0)
      setRecording(true)

      recorder.ondataavailable = e => chunks.current.push(e.data)
      recorder.start()

      timer.current = setInterval(() => {
        setRecordingDuration(d => {
          if (d >= 10) stopRecording()
          return d + 1
        })
      }, 1000)
    } catch (e) {
      console.error('Mic access denied:', e)
    }
  }

  function stopRecording() {
    if (!mediaRecorder.current) return
    mediaRecorder.current.stop()
    mediaRecorder.current.stream.getTracks().forEach(t => t.stop())
    if (timer.current) clearInterval(timer.current)
    setRecording(false)

    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' })
      await uploadVoiceComment(blob)
    }
  }

  async function uploadVoiceComment(blob: Blob) {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('audio', blob, 'voice.webm')

      const res = await fetch('/api/upload/voice', { method: 'POST', body: formData })
      const data = await res.json()
      
      if (data.url) {
        const newComment: Comment = {
          id: Date.now().toString(),
          username: 'You',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
          audioUrl: data.url
        }
        setComments([newComment, ...comments])
      }
    } catch (e) {
      console.error('Voice upload failed:', e)
    } finally {
      setLoading(false)
    }
  }

  const toggleHideComment = (id: string) => {
    setComments(comments.filter(c => c.id !== id))
  }

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleBackdropClick} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="w-full max-w-sm bg-black border border-white/10 rounded-xl flex flex-col max-h-[75vh] overflow-hidden">
          
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Comments</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-lg">×</button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2">
            {comments.length === 0 ? (
              <p className="text-center text-gray-500 text-xs py-6">No comments yet</p>
            ) : (
              <div className="space-y-2">
                {comments.map(comment => (
                  <motion.div key={comment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-2">
                    <div className="flex gap-2">
                      <img src={comment.avatar || '/placeholder.svg'} alt={comment.username} className="w-8 h-8 rounded-full flex-shrink-0 object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="bg-white/5 rounded-lg px-3 py-1.5">
                          <p className="text-white font-semibold text-xs">{comment.username}</p>
                          {comment.text && <p className="text-white text-xs mt-0.5 break-words">{comment.text}</p>}
                          {comment.audioUrl && <div className="mt-1.5 -mx-1 -my-1"><VoicePlayer audioUrl={comment.audioUrl} /></div>}
                        </div>
                        <div className="flex items-center gap-2 px-1 mt-1">
                          <button className="text-gray-500 hover:text-white text-xs transition-colors">Like</button>
                          <button className="text-gray-500 hover:text-white text-xs transition-colors">Reply</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-3 bg-black">
            {recording && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-400 text-xs mb-2">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                <span>Recording {recordingDuration}s</span>
              </motion.div>
            )}

            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !recording && addTextComment()}
                disabled={recording}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-lg focus:outline-none focus:border-white/20 focus:ring-0 text-xs disabled:opacity-50 transition-all"
              />
              <motion.button onClick={recording ? stopRecording : startRecording} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`p-1.5 rounded-lg transition-colors flex-shrink-0 text-xs ${recording ? 'text-red-400 bg-red-500/10' : 'text-white hover:bg-white/10'}`}>
                {recording ? <MdStop className="w-4 h-4" /> : <MdMic className="w-4 h-4" />}
              </motion.button>
              <motion.button onClick={addTextComment} disabled={!commentText.trim() || loading} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-lg transition-colors disabled:cursor-not-allowed flex-shrink-0 text-xs font-semibold">
                Post
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
