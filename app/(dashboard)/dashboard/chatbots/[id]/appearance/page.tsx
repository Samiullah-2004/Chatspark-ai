"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AppearancePage() {
  const { id } = useParams()
  const router = useRouter()
  const [welcomeMessage, setWelcomeMessage] = useState("Hi! How can I help you?")
  const [placeholder, setPlaceholder] = useState("Ask me anything...")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/chatbot/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ welcomeMessage, placeholder }),
      })
      if (res.ok) setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch {
      console.error("Failed to update appearance")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-0">

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F23] pb-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/dashboard/chatbots" className="text-[#A1A1AA] text-xs hover:text-white transition">Chatbots</Link>
            <span className="text-[#A1A1AA] text-xs">/</span>
            <Link href={`/dashboard/chatbots/${id}`} className="text-[#A1A1AA] text-xs hover:text-white transition">Chatbot</Link>
            <span className="text-[#A1A1AA] text-xs">/</span>
            <span className="text-white text-xs">Appearance</span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-semibold">Appearance</h1>
          <p className="text-[#A1A1AA] text-sm mt-1">Customize your chat widget</p>
        </div>
        <a
          href={`/widget/${id}`}
          target="_blank"
          className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all w-fit"
        >
          Preview Widget
        </a>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6 space-y-5"
        >
          <h2 className="text-white text-sm font-semibold border-b border-[#1F1F23] pb-3">
            Widget Settings
          </h2>

          <div>
            <label className="text-xs text-[#A1A1AA] uppercase tracking-wider mb-2 block">
              Welcome Message
            </label>
            <input
              type="text"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#1F1F23] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-white transition text-sm"
            />
            <p className="text-xs text-[#A1A1AA] mt-1">First message visitors see</p>
          </div>

          <div>
            <label className="text-xs text-[#A1A1AA] uppercase tracking-wider mb-2 block">
              Input Placeholder
            </label>
            <input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#1F1F23] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-white transition text-sm"
            />
            <p className="text-xs text-[#A1A1AA] mt-1">Text shown in the chat input box</p>
          </div>

          {success && (
            <div className="border border-green-500/50 bg-green-500/10 rounded-lg px-4 py-3">
              <p className="text-green-400 text-sm">Saved successfully!</p>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6"
        >
          <h2 className="text-white text-sm font-semibold border-b border-[#1F1F23] pb-3 mb-5">
            Live Preview
          </h2>

          <div className="bg-[#0A0A0A] border border-[#1F1F23] rounded-xl overflow-hidden relative flex flex-col" style={{ height: "400px" }}>

            {/* Widget Header */}
            <div className="px-4 py-3 border-b border-[#1F1F23] flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#1F1F23] flex items-center justify-center">
                <span className="text-xs">🤖</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">AI Assistant</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[#A1A1AA] text-xs">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 flex-1 overflow-y-auto">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1F1F23] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">🤖</span>
                </div>
                <div className="bg-[#1F1F23] rounded-2xl rounded-tl-none px-3 py-2 max-w-xs">
                  <p className="text-white text-xs">{welcomeMessage}</p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-[#1F1F23]">
              <div className="flex items-center gap-2 bg-[#111111] border border-[#1F1F23] rounded-xl px-3 py-2">
                <span className="text-[#A1A1AA] text-xs flex-1">{placeholder}</span>
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black text-xs">→</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}