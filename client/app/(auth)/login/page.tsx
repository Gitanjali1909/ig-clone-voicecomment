'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if (!res.ok) { setError(data.message || 'Login failed'); setLoading(false); return }
      localStorage.setItem('token', data.token)
      router.push('/home')
    } catch {
      setError('Error occurred. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black mb-2">Instagram</h1>
          <p className="text-gray-400">Share your moments</p>
        </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input type="email" placeholder="Email or username" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all" />
            </div>
            <div>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all" />
            </div>

            {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</motion.div>}

            <button type="submit" disabled={loading} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors mt-4">
              {loading ? <span className="inline-flex items-center gap-2"><span className="animate-spin">⏳</span> Logging in...</span> : 'Log in'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button className="w-full py-2.5 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors">Log in with Facebook</button>

        <p className="text-center text-gray-400 text-sm mt-8">Don&apos;t have an account? <Link href="/signup" className="text-white hover:text-gray-200 font-semibold">Sign up</Link></p>
      </motion.div>
    </div>
  )
}
