'use client'
import { useState, useEffect } from 'react'
import { AiOutlineSearch, AiOutlineClockCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'

export default function SearchPage() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState(['#travel', '#photography', '#food'])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.trim()) {
        setLoading(true)
        try {
          const mockResults = Array.from({ length: search.length > 3 ? 20 : 12 }, (_, i) => ({
            id: i,
            src: `https://picsum.photos/300/300?random=search${i}`,
            featured: i % 5 === 0
          }))
          setResults(mockResults)
        } finally {
          setLoading(false)
        }
      } else {
        setResults([])
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const mockPosts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    src: `https://picsum.photos/300/300?random=${i}`,
    featured: i % 5 === 0
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8 sticky top-5 bg-black/80 backdrop-blur-md py-4 -mx-4 px-4 z-30">
        <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-full border border-white/10">
          <AiOutlineSearch className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search users, tags..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm" autoFocus />
        </div>
      </div>

      {!search ? (
        <div className="space-y-5">
          <div>
            <h2 className="text-white font-semibold mb-3">Recent searches</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((tag, i) => (
                <motion.button key={i} whileHover={{ scale: 1.05 }} onClick={() => setSearch(tag)} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors flex items-center gap-2">
                  <AiOutlineClockCircle className="w-4 h-4" /> {tag}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-white font-semibold mb-3">Explore</h2>
            <div className="grid grid-cols-3 gap-1 auto-rows-max">
              {mockPosts.map(post => (
                <div key={post.id} className={`relative overflow-hidden bg-gray-900 rounded-lg cursor-pointer group ${post.featured ? 'col-span-2 row-span-2' : ''}`} style={{ paddingBottom: post.featured ? '50%' : '100%' }}>
                  <img src={post.src} alt="post" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="text-white text-sm font-semibold">View</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-12"><span className="animate-spin text-2xl">⏳</span></div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 auto-rows-max">
              {results.map(post => (
                <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`relative overflow-hidden bg-gray-900 rounded-lg cursor-pointer group ${post.featured ? 'col-span-2 row-span-2' : ''}`} style={{ paddingBottom: post.featured ? '50%' : '100%' }}>
                  <img src={post.src} alt="post" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="text-white text-sm font-semibold">View</span></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12"><p className="text-gray-400">No results found for &quot;{search}&quot;</p></div>
          )}
        </div>
      )}
    </div>
  )
}
