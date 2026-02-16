'use client'
import { useState } from 'react'
import { MdClose, MdSend } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  sender: 'user' | 'other'
  timestamp: string
}

interface Chat {
  id: string
  username: string
  avatar: string
  lastMessage: string
  unread: boolean
}

interface InboxProps {
  onClose: () => void
}

export default function Inbox({ onClose }: InboxProps) {
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', username: 'jessica_92', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1', lastMessage: 'Haha love this! 😂', unread: true },
    { id: '2', username: 'alex_photographer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2', lastMessage: 'Thanks for the follow back!', unread: false },
    { id: '3', username: 'sarah_travels', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3', lastMessage: 'Where was this taken?', unread: true },
    { id: '4', username: 'mike_fitness', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4', lastMessage: 'Great workout tips!', unread: false },
  ])
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey! Love your content', sender: 'other', timestamp: '10:30 AM' },
    { id: '2', text: 'Thanks! Really appreciate it', sender: 'user', timestamp: '10:32 AM' },
    { id: '3', text: 'Haha love this! 😂', sender: 'other', timestamp: '10:35 AM' },
  ])
  const [messageText, setMessageText] = useState('')

  const sendMessage = () => {
    if (!messageText.trim()) return
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, newMessage])
    setMessageText('')
  }

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="w-full max-w-sm h-[80vh] bg-black border border-white/10 rounded-xl flex flex-col overflow-hidden">
          
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Messages</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-lg">×</button>
          </div>

          {activeChat === null ? (
            <div className="flex-1 overflow-y-auto">
              {chats.map(chat => (
                <motion.button key={chat.id} onClick={() => setActiveChat(chat.id)} whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }} className="w-full px-3 py-2.5 border-b border-white/5 flex items-center gap-2.5 transition-colors text-left hover:bg-white/3">
                  <img src={chat.avatar} alt={chat.username} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-xs ${chat.unread ? 'text-white' : 'text-gray-300'}`}>{chat.username}</p>
                    <p className={`text-xs truncate mt-0.5 ${chat.unread ? 'text-white' : 'text-gray-500'}`}>{chat.lastMessage}</p>
                  </div>
                  {chat.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                </motion.button>
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/10">
                <motion.button onClick={() => setActiveChat(null)} className="p-1 hover:bg-white/10 rounded-lg text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </motion.button>
                <img src={chats.find(c => c.id === activeChat)?.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <p className="font-semibold text-xs text-white">{chats.find(c => c.id === activeChat)?.username}</p>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 flex flex-col justify-end">
                {messages.map(msg => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-1.5 rounded-xl max-w-xs text-xs ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white/10 text-white'}`}>
                      <p>{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-white/10 px-3 py-2.5 bg-black flex gap-1.5">
                <input type="text" placeholder="Message..." value={messageText} onChange={e => setMessageText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-lg focus:outline-none focus:border-white/20 text-xs transition-all" />
                <motion.button onClick={sendMessage} disabled={!messageText.trim()} whileTap={{ scale: 0.95 }} className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-lg transition-colors disabled:cursor-not-allowed flex-shrink-0 text-xs font-semibold">
                  Send
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
