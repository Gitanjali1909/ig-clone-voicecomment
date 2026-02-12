'use client'

import { useState, useRef, useEffect } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

export default function CreatePage() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)
  }

  const handleSubmit = async () => {
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('caption', caption)

      await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      })

      alert('Post created!')

      setFile(null)
      setPreviewUrl(null)
      setCaption('')
    } catch (error) {
      console.error(error)
      alert('Something went wrong.')
    } finally {
      setUploading(false)
    }
  }

  const isVideo = file?.type.startsWith('video')

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Create new post</h1>

      {!previewUrl ? (
        <div>
          <label
            htmlFor="file-upload"
            className="block border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-white/40 transition-colors"
          >
            <AiOutlineCloudUpload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-white font-semibold mb-1">Click to upload</p>
            <p className="text-gray-400 text-sm">PNG, JPG, GIF or MP4</p>
          </label>

          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload media"
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
            {isVideo ? (
              <video
                src={previewUrl}
                className="absolute inset-0 w-full h-full object-cover"
                controls
              />
            ) : (
              <img
                src={previewUrl}
                alt="Selected preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>

          <div>
            <label
              htmlFor="caption"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Caption
            </label>

            <textarea
              id="caption"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 resize-none h-24"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setFile(null)
                setPreviewUrl(null)
              }}
              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={uploading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              {uploading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
