"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function NewChatbotPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [welcomeMessage, setWelcomeMessage] = useState("Hi! How can I help you?")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, welcomeMessage }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Something went wrong")
        setLoading(false)
        return
      }

      router.push(`/dashboard/chatbots/${data.id}`)
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-0">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-[#1F1F23] pb-6"
      >
        <p className="text-[#A1A1AA] text-xs uppercase tracking-widest font-medium mb-1">
          Create
        </p>
        <h1 className="text-white text-2xl sm:text-3xl font-semibold">
          New Chatbot
        </h1>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Chatbot Name */}
          <div className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6 space-y-4">
            <h2 className="text-white text-sm font-semibold border-b border-[#1F1F23] pb-3">
              Basic Information
            </h2>

            <div>
              <label className="text-xs text-[#A1A1AA] uppercase tracking-wider mb-2 block">
                Chatbot Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Customer Support Bot"
                required
                className="w-full bg-[#0A0A0A] border border-[#1F1F23] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#3F3F46] transition text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-[#A1A1AA] uppercase tracking-wider mb-2 block">
                Description
                <span className="normal-case ml-1 text-[#A1A1AA]">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this chatbot for?"
                rows={3}
                className="w-full bg-[#0A0A0A] border border-[#1F1F23] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#3F3F46] transition text-sm resize-none"
              />
            </div>
          </div>

          {/* Widget Settings */}
          <div className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6 space-y-4">
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
                placeholder="Hi! How can I help you?"
                className="w-full bg-[#0A0A0A] border border-[#1F1F23] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#3F3F46] transition text-sm"
              />
              <p className="text-xs text-[#A1A1AA] mt-2">
                This is the first message your visitors will see.
              </p>
            </div>
          </div>

          {error && (
            <div className="border border-red-500/50 bg-red-500/10 rounded-lg px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Chatbot"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="text-sm text-[#A1A1AA] hover:text-white px-6 py-2.5 rounded-lg border border-[#1F1F23] hover:border-[#3F3F46] transition-all"
            >
              Cancel
            </button>
          </div>

        </form>
      </motion.div>

    </div>
  )
}