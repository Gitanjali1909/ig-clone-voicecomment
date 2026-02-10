'use client'
import { useState, useRef } from 'react'
import { MdMic, MdStop } from 'react-icons/md'

interface VoiceRecorderProps {
  onUpload?: (audioUrl: string) => void
}

export default function VoiceRecorder({ onUpload }: VoiceRecorderProps) {
  const [recording, setRecording] = useState(false)
  const [duration, setDuration] = useState(0)
  const [preview, setPreview] = useState<string | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<BlobPart[]>([])
  const timer = useRef<NodeJS.Timeout | null>(null)

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRecorder.current = recorder
      chunks.current = []
      setDuration(0)
      setRecording(true)

      recorder.ondataavailable = e => chunks.current.push(e.data)
      recorder.start()

      timer.current = setInterval(() => {
        setDuration(d => {
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

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' })
      const url = URL.createObjectURL(blob)
      setPreview(url)
    }
  }

  async function uploadAudio() {
    if (!preview) return
    try {
      const blob = await fetch(preview).then(r => r.blob())
      const formData = new FormData()
      formData.append('audio', blob, 'voice.webm')

      const res = await fetch('/api/upload/voice', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) onUpload?.(data.url)
      setPreview(null)
    } catch (e) {
      console.error('Upload failed:', e)
    }
  }

  return (
    <div className="flex flex-col gap-3 p-3 bg-zinc-900 rounded-lg">
      {!preview ? (
        <>
          <button onClick={recording ? stopRecording : startRecording} className={`flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition ${recording ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
            {recording ? <MdStop className="w-5 h-5" /> : <MdMic className="w-5 h-5" />}
            {recording ? `Stop (${duration}s)` : 'Record'}
          </button>
          {duration > 0 && !recording && <p className="text-sm text-zinc-400 text-center">Ready to upload</p>}
        </>
      ) : (
        <>
          <audio src={preview} controls className="w-full" />
          <div className="flex gap-2">
            <button onClick={() => setPreview(null)} className="flex-1 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg">Cancel</button>
            <button onClick={uploadAudio} className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">Upload</button>
          </div>
        </>
      )}
    </div>
  )
}
