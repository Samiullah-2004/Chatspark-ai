"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

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
  const searchParams = useSearchParams()
  const theme = searchParams.get("theme") === "light" ? "light" : "dark"
  const accent = searchParams.get("accent") || "#2563eb"

  const isDark = theme === "dark"
  const bg = isDark ? "#0A0A0A" : "#FFFFFF"
  const surface = isDark ? "#111111" : "#F7F7F8"
  const border = isDark ? "#1F1F23" : "#E5E5E8"
  const textPrimary = isDark ? "#FFFFFF" : "#111111"
  const textSecondary = isDark ? "#A1A1AA" : "#71717A"
  const bubbleAssistant = isDark ? "#1F1F23" : "#EFEFF1"
  const bubbleUser = accent

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
        setMessages([{ role: "assistant", content: data.welcomeMessage }])
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
        body: JSON.stringify({ chatbotId: id, question: userMessage, conversationId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Chat request failed")
      setConversationId(data.conversationId)
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }])
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
      <div className="h-screen w-screen flex items-center justify-center" style={{ backgroundColor: bg }}>
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: accent, borderTopColor: "transparent" }} />
      </div>
    )
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ backgroundColor: surface }}>
      <div className="px-5 py-4 flex items-center gap-3 flex-shrink-0" style={{ borderBottom: `1px solid ${border}` }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: bg }}>
          <span className="text-sm">🤖</span>
        </div>
        <div>
          <h1 className="text-sm font-semibold" style={{ color: textPrimary }}>{chatbot.name}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-xs" style={{ color: textSecondary }}>Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-0">
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
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1" style={{ backgroundColor: bg }}>
                  <span className="text-xs">🤖</span>
                </div>
              )}
              <div
                className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm chat-markdown"
                style={
                  msg.role === "user"
                    ? { backgroundColor: bubbleUser, color: "#FFFFFF", borderTopRightRadius: 0 }
                    : { backgroundColor: bubbleAssistant, color: textPrimary, borderTopLeftRadius: 0 }
                }
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0" style={{ backgroundColor: bg }}>
              <span className="text-xs">🤖</span>
            </div>
            <div className="px-4 py-3 rounded-2xl" style={{ backgroundColor: bubbleAssistant, borderTopLeftRadius: 0 }}>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: textSecondary, animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: textSecondary, animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: textSecondary, animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-4 flex-shrink-0" style={{ borderTop: `1px solid ${border}` }}>
        <div className="flex items-center gap-2 rounded-xl px-4 py-2.5" style={{ backgroundColor: bg, border: `1px solid ${border}` }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={chatbot.placeholder}
            className="flex-1 bg-transparent text-sm focus:outline-none"
            style={{ color: textPrimary }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-7 h-7 rounded-lg flex items-center justify-center disabled:opacity-50 transition-all active:scale-95 flex-shrink-0"
            style={{ backgroundColor: accent }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs mt-2" style={{ color: textSecondary }}>
          Powered by{' '}
          <a
            href="https://chatspark-ai-9hwh.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: textPrimary }}
            className="hover:underline"
          >
            ChatSpark AI
          </a>
        </p>
      </div>
    </div>
  )
}