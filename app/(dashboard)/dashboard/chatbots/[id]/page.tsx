"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"


interface Chatbot {
  id: string
  name: string
  description: string | null
  welcomeMessage: string
  isActive: boolean
  createdAt: string
  _count: {
    documents: number
    conversations: number
  }
}

export default function ChatbotDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [chatbot, setChatbot] = useState<Chatbot | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This will delete the chatbot and all its data permanently.")) return
    setDeleting(true)
    try {
      await fetch(`/api/chatbot/${id}`, { method: "DELETE" })
      router.push("/dashboard/chatbots")
    } catch {
      console.error("Failed to delete chatbot")
      setDeleting(false)
    }
  }

  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        const res = await fetch(`/api/chatbot/${id}`)
        if (!res.ok) {
          router.push("/dashboard/chatbots")
          return
        }
        const data = await res.json()
        setChatbot(data)
      } catch {
        router.push("/dashboard/chatbots")
      } finally {
        setLoading(false)
      }
    }
    fetchChatbot()
  }, [id, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!chatbot) return null

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
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard/chatbots"
              className="text-[#A1A1AA] text-xs hover:text-white transition"
            >
              Chatbots
            </Link>
            <span className="text-[#A1A1AA] text-xs">/</span>
            <span className="text-white text-xs">{chatbot.name}</span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-semibold">
            {chatbot.name}
          </h1>
          {chatbot.description && (
            <p className="text-[#A1A1AA] text-sm mt-1">
              {chatbot.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/widget/${chatbot.id}`}
            target="_blank"
            className="text-xs bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all"
          >
            Open Widget ↗
          </a>
          <span className={`text-xs px-3 py-1.5 rounded-lg border ${chatbot.isActive
            ? "border-green-500/30 text-green-400 bg-green-500/10"
            : "border-[#1F1F23] text-[#A1A1AA]"
            }`}>
            {chatbot.isActive ? "Active" : "Inactive"}
          </span>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Documents", value: chatbot._count.documents, icon: "📄" },
          { label: "Conversations", value: chatbot._count.conversations, icon: "💬" },
          { label: "Status", value: chatbot.isActive ? "Active" : "Inactive", icon: "🟢" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-[#111111] border border-[#1F1F23] rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span>{stat.icon}</span>
              <p className="text-[#A1A1AA] text-xs uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
            <h2 className="text-white text-2xl font-bold">
              {stat.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: "Upload Documents",
            desc: "Train your chatbot with PDFs and text files",
            icon: "📄",
            href: `/dashboard/chatbots/${id}/documents`,
            action: "Upload now",
          },
          {
            title: "Customize Appearance",
            desc: "Change colors, logo and widget style",
            icon: "🎨",
            href: `/dashboard/chatbots/${id}/appearance`,
            action: "Customize",
          },
          {
            title: "Get Embed Code",
            desc: "Copy the widget code to add to your website",
            icon: "🔗",
            href: `/dashboard/chatbots/${id}/embed`,
            action: "Get code",
          },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          >
            <Link
              href={card.href}
              className="bg-[#111111] border border-[#1F1F23] hover:border-[#3F3F46] rounded-xl p-6 flex flex-col gap-4 transition-all group h-full"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1F1F23] flex items-center justify-center text-xl group-hover:bg-[#2A2A2E] transition-all">
                {card.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  {card.title}
                </h3>
                <p className="text-[#A1A1AA] text-xs mt-1">
                  {card.desc}
                </p>
              </div>
              <span className="text-xs text-[#A1A1AA] group-hover:text-white transition mt-auto flex items-center gap-1">
                {card.action} →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Welcome Message Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6"
      >
        <h2 className="text-white text-sm font-semibold mb-4 border-b border-[#1F1F23] pb-3">
          Welcome Message Preview
        </h2>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1F1F23] flex items-center justify-center text-sm flex-shrink-0">
            🤖
          </div>
          <div className="bg-[#1F1F23] rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
            <p className="text-white text-sm">{chatbot.welcomeMessage}</p>
          </div>
        </div>
      </motion.div>

    </div>
  )
}