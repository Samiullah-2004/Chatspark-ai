"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"

interface AnalyticsData {
  totalConversations: number
  totalMessages: number
  totalChatbots: number
  totalDocuments: number
  recentConversations: {
    id: string
    chatbotName: string
    messageCount: number
    startedAt: string
  }[]
  topChatbots: {
    id: string
    name: string
    conversations: number
    messages: number
  }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/dashboard/stats")
        const json = await res.json()
        setData({
          totalConversations: json.stats.totalConversations,
          totalMessages: json.stats.totalMessages,
          totalChatbots: json.stats.totalChatbots,
          totalDocuments: json.stats.totalDocuments,
          recentConversations: json.recentConversations,
          topChatbots: json.topChatbots || [],
        })
      } catch {
        console.error("Failed to fetch analytics")
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
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
            Insights
          </p>
          <h1 className="text-white text-2xl sm:text-3xl font-semibold">
            Analytics
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">
            Track your chatbot performance
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Conversations", value: data?.totalConversations ?? 0, icon: "💬" },
          { label: "Total Messages", value: data?.totalMessages ?? 0, icon: "📨" },
          { label: "Active Chatbots", value: data?.totalChatbots ?? 0, icon: "🤖" },
          { label: "Documents Trained", value: data?.totalDocuments ?? 0, icon: "📄" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="bg-[#111111] border border-[#1F1F23] rounded-xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-[#A1A1AA] text-xs font-medium uppercase tracking-wider">
                {stat.label}
              </p>
              {loading ? (
                <div className="h-10 w-16 bg-[#1F1F23] rounded-lg animate-pulse mt-1" />
              ) : (
                <h2 className="text-white text-4xl font-bold mt-1">
                  {stat.value}
                </h2>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Conversations Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="bg-[#111111] border border-[#1F1F23] rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F23]">
          <h2 className="text-white text-sm font-semibold">
            All Conversations
          </h2>
          <span className="text-xs text-[#A1A1AA]">
            {data?.totalConversations ?? 0} total
          </span>
        </div>

        <div className="hidden sm:grid grid-cols-3 px-6 py-3 border-b border-[#1F1F23]">
          <span className="text-xs text-[#A1A1AA] uppercase tracking-wider">Chatbot</span>
          <span className="text-xs text-[#A1A1AA] uppercase tracking-wider">Messages</span>
          <span className="text-xs text-[#A1A1AA] uppercase tracking-wider">Date</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !data?.recentConversations.length ? (
          <div className="px-6 py-16 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#1F1F23] flex items-center justify-center mb-4">
              <span className="text-xl">💬</span>
            </div>
            <p className="text-white text-sm font-medium">No conversations yet</p>
            <p className="text-[#A1A1AA] text-xs mt-1 max-w-xs">
              Once users start chatting with your chatbot, conversations will appear here.
            </p>
            <Link
              href="/dashboard/chatbots"
              className="mt-5 text-xs border border-[#1F1F23] hover:border-[#3F3F46] text-white px-4 py-2 rounded-lg transition-all hover:bg-[#1F1F23]"
            >
              View Chatbots
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#1F1F23]">
            {data.recentConversations.map((conv, i) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 hover:bg-[#1F1F23] transition gap-1 sm:gap-0"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">🤖</span>
                  <span className="text-white text-sm truncate">{conv.chatbotName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs bg-[#1F1F23] text-white px-2 py-0.5 rounded-md">
                    {conv.messageCount} messages
                  </span>
                </div>
                <span className="text-[#A1A1AA] text-sm">
                  {new Date(conv.startedAt).toLocaleDateString()}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Message Rate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6"
      >
        <h2 className="text-white text-sm font-semibold mb-6 border-b border-[#1F1F23] pb-3">
          Usage Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              label: "Avg Messages per Conversation",
              value: data?.totalConversations
                ? (data.totalMessages / data.totalConversations).toFixed(1)
                : "0",
            },
            {
              label: "Avg Docs per Chatbot",
              value: data?.totalChatbots
                ? (data.totalDocuments / data.totalChatbots).toFixed(1)
                : "0",
            },
            {
              label: "Conversations per Chatbot",
              value: data?.totalChatbots
                ? (data.totalConversations / data.totalChatbots).toFixed(1)
                : "0",
            },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <h3 className="text-white text-3xl font-bold">{item.value}</h3>
              <p className="text-[#A1A1AA] text-xs mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}