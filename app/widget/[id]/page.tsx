"use client"

import { useParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface Chatbot {
  id: string
  name: string
  welcomeMessage: string
  placeholder: string
}

export default function WidgetPage() {
  const { id } = useParams()
  const [chatbot, setChatbot] = useState<Chatbot | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        const res = await fetch(`/api/widget/${id}`)
        const data = await res.json()
        setChatbot(data)
        setMessages([
          { role: "assistant", content: data.welcomeMessage },
        ])
      } catch {
        console.error("Failed to fetch chatbot")
      }
    }
    fetchChatbot()
  }, [id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatbotId: id,
          question: userMessage,
          conversationId,
        }),
      })

      const data = await res.json()
      setConversationId(data.conversationId)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!chatbot) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-[#111111] border border-[#1F1F23] rounded-2xl overflow-hidden flex flex-col"
        style={{ height: "600px" }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#1F1F23] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1F1F23] flex items-center justify-center">
            <span className="text-sm">🤖</span>
          </div>
          <div>
            <h1 className="text-white text-sm font-semibold">
              {chatbot.name}
            </h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[#A1A1AA] text-xs">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-[#1F1F23] flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                    <span className="text-xs">🤖</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-white text-black rounded-tr-none"
                      : "bg-[#1F1F23] text-white rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="w-6 h-6 rounded-full bg-[#1F1F23] flex items-center justify-center mr-2 flex-shrink-0">
                <span className="text-xs">🤖</span>
              </div>
              <div className="bg-[#1F1F23] px-4 py-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A1A1AA] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A1A1AA] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A1A1AA] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-4 border-t border-[#1F1F23]">
          <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#1F1F23] rounded-xl px-4 py-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={chatbot.placeholder}
              className="flex-1 bg-transparent text-white text-sm placeholder-[#A1A1AA] focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="w-7 h-7 bg-white rounded-lg flex items-center justify-center hover:bg-zinc-200 disabled:opacity-50 transition-all active:scale-95 flex-shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="black" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[#A1A1AA] text-xs mt-2">
            Powered by <span className="text-white">ChatSpark AI</span>
          </p>
        </div>
      </motion.div>
    </div>
  )
}