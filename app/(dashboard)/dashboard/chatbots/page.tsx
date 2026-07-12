"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Chatbot {
  id: string
  name: string
  description: string | null
  isActive: boolean
  createdAt: string
  _count: {
    documents: number
    conversations: number
  }
}

export default function ChatbotsPage() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChatbots = async () => {
      try {
        const res = await fetch("/api/chatbot")
        const data = await res.json()
        setChatbots(data)
      } catch {
        console.error("Failed to fetch chatbots")
      } finally {
        setLoading(false)
      }
    }
    fetchChatbots()
  }, [])

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-0">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F23] pb-6"
      >
        <div>
          <p className="text-[#A1A1AA] text-xs uppercase tracking-widest font-medium mb-1">
            Manage
          </p>
          <h1 className="text-white text-2xl sm:text-3xl font-semibold">
            My Chatbots
          </h1>
        </div>
        <Link
          href="/dashboard/chatbots/new"
          className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 active:scale-95 transition-all w-fit"
        >
          + New Chatbot
        </Link>
      </motion.div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : chatbots.length === 0 ? (

        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-[#111111] border border-[#1F1F23] rounded-xl px-6 py-24 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="w-16 h-16 rounded-2xl bg-[#1F1F23] flex items-center justify-center mb-6"
          >
            <span className="text-3xl">🤖</span>
          </motion.div>
          <h2 className="text-white text-lg font-semibold">
            No chatbots yet
          </h2>
          <p className="text-[#A1A1AA] text-sm mt-2 max-w-sm">
            Create your first AI chatbot, upload your documents and embed it on your website in minutes.
          </p>
          <Link
            href="/dashboard/chatbots/new"
            className="mt-6 bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-zinc-200 active:scale-95 transition-all"
          >
            Create First Chatbot
          </Link>
        </motion.div>

      ) : (

        /* Chatbots Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chatbots.map((chatbot, i) => (
            <motion.div
              key={chatbot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                href={`/dashboard/chatbots/${chatbot.id}`}
                className="bg-[#111111] border border-[#1F1F23] hover:border-[#3F3F46] rounded-xl p-6 flex flex-col gap-4 transition-all group h-full"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#1F1F23] group-hover:bg-[#2A2A2E] flex items-center justify-center text-xl transition-all">
                    🤖
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-lg border ${chatbot.isActive
                    ? "border-green-500/30 text-green-400 bg-green-500/10"
                    : "border-[#1F1F23] text-[#A1A1AA]"
                    }`}>
                    {chatbot.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {chatbot.name}
                  </h3>
                  {chatbot.description && (
                    <p className="text-[#A1A1AA] text-xs mt-1 line-clamp-2">
                      {chatbot.description}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">📄</span>
                    <span className="text-[#A1A1AA] text-xs">
                      {chatbot._count.documents} docs
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">💬</span>
                    <span className="text-[#A1A1AA] text-xs">
                      {chatbot._count.conversations} chats
                    </span>
                  </div>
                </div>

                <div className="h-px bg-[#1F1F23] group-hover:bg-[#3F3F46] transition-all" />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#A1A1AA]">
                    {new Date(chatbot.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`/widget/${chatbot.id}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-[#A1A1AA] hover:text-white border border-[#1F1F23] hover:border-[#3F3F46] px-2 py-1 rounded-lg transition"
                    >
                      Widget ↗
                    </a>
                    <span className="text-xs text-[#A1A1AA] group-hover:text-white transition">
                      Manage →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  )
}