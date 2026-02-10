'use client'

import { useState, useRef } from 'react'
import { MdPlayArrow, MdPause } from 'react-icons/md'

interface VoicePlayerProps {
  audioUrl: string
}

export default function VoicePlayer({ audioUrl }: VoicePlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function togglePlay() {
    if (!audioRef.current) return

    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-zinc-800 rounded-lg">
      <button
        onClick={togglePlay}
        aria-label={playing ? 'Pause audio' : 'Play audio'}
        title={playing ? 'Pause audio' : 'Play audio'}
        className="flex-shrink-0 p-2 hover:bg-zinc-700 rounded-full"
      >
        {playing ? (
          <MdPause className="w-5 h-5 text-white" />
        ) : (
          <MdPlayArrow className="w-5 h-5 text-white" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={current}
          aria-label="Audio progress"
          title="Audio progress"
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.currentTime = Number(e.target.value)
            }
          }}
          className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <span className="text-xs text-zinc-400 whitespace-nowrap">
        {formatTime(current)} / {formatTime(duration)}
      </span>

      <audio
        ref={audioRef}
        src={audioUrl}
        onLoadedMetadata={(e) =>
          setDuration(e.currentTarget.duration)
        }
        onTimeUpdate={(e) =>
          setCurrent(e.currentTarget.currentTime)
        }
        onEnded={() => setPlaying(false)}
      />
    </div>
  )
}
