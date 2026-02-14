'use client'

import { useState, useRef } from 'react'
import { AiOutlineCloudUpload, AiOutlineX } from 'react-icons/ai'
import { motion } from 'framer-motion'

export default function CreatePage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_CAPTION = 2200

  const handleFileChange = (file: File) => {
    if (file && file.size <= 104857600) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileChange(file)
  }

  const handleSubmit = async () => {
    if (!preview) return
    setUploading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setUploading(false)
    setPreview(null)
    setCaption('')
    alert('Post created!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <h1 className="text-2xl font-black mb-8 text-white">
          Create new post
        </h1>

        {!preview ? (
          <motion.button
            type="button"
            aria-label="Upload media"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            animate={{
              borderColor: dragActive ? '#fff' : 'rgba(255,255,255,0.2)',
              backgroundColor: dragActive
                ? 'rgba(255,255,255,0.05)'
                : 'transparent',
            }}
            className="w-full border-2 border-dashed border-white/20 rounded-2xl p-12 text-center cursor-pointer transition-colors"
          >
            <motion.div
              animate={{ scale: dragActive ? 1.1 : 1 }}
              className="mb-4"
            >
              <AiOutlineCloudUpload className="w-16 h-16 text-gray-400 mx-auto" />
            </motion.div>

            <p className="text-white font-semibold mb-1">
              Drag media here
            </p>
            <p className="text-gray-400 text-sm">
              or click to select
            </p>
            <p className="text-gray-500 text-xs mt-2">
              PNG, JPG, GIF or MP4 up to 100MB
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              aria-label="Select media file"
              onChange={(e) =>
                e.target.files?.[0] &&
                handleFileChange(e.target.files[0])
              }
              className="hidden"
            />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gray-900">
              <button
                type="button"
                aria-label="Remove selected media"
                onClick={() => setPreview(null)}
                className="absolute top-2 left-2 p-2 bg-black/50 hover:bg-black rounded-full z-10 transition-colors"
              >
                <AiOutlineX className="w-5 h-5 text-white" />
              </button>

              <div className="relative aspect-video">
                {preview.startsWith('data:video') ? (
                  <video
                    src={preview}
                    className="absolute inset-0 w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Selected media preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="caption"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Caption
                </label>

                <textarea
                  id="caption"
                  value={caption}
                  onChange={(e) =>
                    setCaption(
                      e.target.value.slice(0, MAX_CAPTION)
                    )
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 resize-none h-24 text-sm"
                />

                <p className="text-xs text-gray-500 mt-1 text-right">
                  {caption.length}/{MAX_CAPTION}
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  type="button"
                  aria-label="Cancel post creation"
                  onClick={() => setPreview(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="button"
                  aria-label="Share post"
                  onClick={handleSubmit}
                  disabled={uploading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-xl font-semibold transition-colors"
                >
                  {uploading ? 'Posting...' : 'Share'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
