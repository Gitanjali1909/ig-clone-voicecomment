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
  const [chats] = useState<Chat[]>([
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
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    setMessages(prev => [...prev, newMessage])
    setMessageText('')
  }

  const currentChat = chats.find(c => c.id === activeChat)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center z-50"
      >
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-full md:w-96 md:rounded-2xl md:border md:border-white/10 h-screen md:h-[90vh] bg-black flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-black">Messages</h2>
            <button
              aria-label="Close inbox"
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <MdClose className="w-5 h-5 text-white" />
            </button>
          </div>

          {activeChat === null ? (
            /* Chat List */
            <div className="flex-1 overflow-y-auto">
              {chats.map(chat => (
                <motion.button
                  key={chat.id}
                  aria-label={`Open chat with ${chat.username}`}
                  onClick={() => setActiveChat(chat.id)}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="w-full px-4 py-3 border-b border-white/5 flex items-center gap-3 text-left hover:bg-white/5 transition-colors"
                >
                  <img
                    src={chat.avatar}
                    alt={chat.username}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`font-semibold text-sm ${chat.unread ? 'text-white' : 'text-gray-300'}`}>
                        {chat.username}
                      </p>
                      <span className="text-xs text-gray-500">2m</span>
                    </div>
                    <p className={`text-xs truncate ${chat.unread ? 'text-white' : 'text-gray-500'}`}>
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                  )}
                </motion.button>
              ))}
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <button
                  aria-label="Go back to inbox"
                  onClick={() => setActiveChat(null)}
                  className="p-1 hover:bg-white/10 rounded-full"
                >
                  <span className="text-white text-lg">←</span>
                </button>

                <img
                  src={currentChat?.avatar}
                  alt={currentChat?.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-semibold text-sm text-white">
                  {currentChat?.username}
                </p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 flex flex-col">
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-xs ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-white/10 p-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Message..."
                  aria-label="Type your message"
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/10 text-white placeholder-gray-500 rounded-full focus:outline-none focus:border-white/30 text-sm"
                />

                <motion.button
                  aria-label="Send message"
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-full transition-colors"
                >
                  <MdSend className="w-5 h-5" />
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
