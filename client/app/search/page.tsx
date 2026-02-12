'use client'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchPage() {
  const [search, setSearch] = useState('')

  const mockPosts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    src: `https://picsum.photos/300/300?random=${i}`,
    featured: i % 5 === 0
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full">
          <AiOutlineSearch className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 auto-rows-max">
        {mockPosts.map(post => (
          <div key={post.id} className={`relative overflow-hidden bg-gray-900 rounded-lg cursor-pointer group ${post.featured ? 'col-span-2 row-span-2' : ''}`} style={{ paddingBottom: post.featured ? '50%' : '100%' }}>
            <img src={post.src} alt="post" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-sm font-semibold">View</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
