"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function EmbedPage() {
  const { id } = useParams()
  const [copied, setCopied] = useState(false)

  const embedCode = `<!-- ChatSpark AI Widget -->
<script>
  window.ChatSparkConfig = {
    chatbotId: "${id}"
  };
</script>
<script src="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/embed.js" async></script>`

  const iframeCode = `<iframe
  src="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/widget/${id}"
  width="400"
  height="600"
  frameborder="0"
  style="border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.2);"
></iframe>`

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
            <Link href="/dashboard/chatbots" className="text-[#A1A1AA] text-xs hover:text-white transition">
              Chatbots
            </Link>
            <span className="text-[#A1A1AA] text-xs">/</span>
            <Link href={`/dashboard/chatbots/${id}`} className="text-[#A1A1AA] text-xs hover:text-white transition">
              Chatbot
            </Link>
            <span className="text-[#A1A1AA] text-xs">/</span>
            <span className="text-white text-xs">Embed</span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-semibold">
            Embed Code
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">
            Add your chatbot to any website
          </p>
        </div>
        <a
          href={`/widget/${id}`}
          target="_blank"
          className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all w-fit"
        >
          Preview Widget
        </a>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { step: "1", title: "Copy the code", desc: "Copy the embed script below" },
          { step: "2", title: "Paste on website", desc: "Add it before closing body tag" },
          { step: "3", title: "Go live", desc: "Your chatbot is ready to use" },
        ].map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-[#111111] border border-[#1F1F23] rounded-xl p-5 flex items-start gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center flex-shrink-0">
              {item.step}
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold">{item.title}</h3>
              <p className="text-[#A1A1AA] text-xs mt-1">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Script Embed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-[#111111] border border-[#1F1F23] rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F23]">
          <div>
            <h2 className="text-white text-sm font-semibold">
              Script Embed
            </h2>
            <p className="text-[#A1A1AA] text-xs mt-0.5">
              Recommended — paste before closing body tag
            </p>
          </div>
          <button
            onClick={() => handleCopy(embedCode)}
            className="text-xs bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all active:scale-95"
          >
            {copied ? "Copied! ✓" : "Copy Code"}
          </button>
        </div>
        <pre className="px-6 py-5 text-xs text-[#A1A1AA] overflow-x-auto leading-relaxed">
          <code>{embedCode}</code>
        </pre>
      </motion.div>

      {/* iFrame Embed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-[#111111] border border-[#1F1F23] rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F23]">
          <div>
            <h2 className="text-white text-sm font-semibold">
              iFrame Embed
            </h2>
            <p className="text-[#A1A1AA] text-xs mt-0.5">
              Embed as a fixed widget anywhere on your page
            </p>
          </div>
          <button
            onClick={() => handleCopy(iframeCode)}
            className="text-xs bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all active:scale-95"
          >
            {copied ? "Copied! ✓" : "Copy Code"}
          </button>
        </div>
        <pre className="px-6 py-5 text-xs text-[#A1A1AA] overflow-x-auto leading-relaxed">
          <code>{iframeCode}</code>
        </pre>
      </motion.div>

      {/* Direct Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-white text-sm font-semibold">
            Direct Link
          </h2>
          <p className="text-[#A1A1AA] text-xs mt-1">
            Share this link directly with anyone
          </p>
          <p className="text-white text-xs mt-2 font-mono bg-[#0A0A0A] px-3 py-2 rounded-lg border border-[#1F1F23] mt-2">
            {typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/widget/{id}
          </p>
        </div>
        <button
          onClick={() => handleCopy(`${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/widget/${id}`)}
          className="text-xs bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all active:scale-95 w-fit flex-shrink-0"
        >
          Copy Link
        </button>
      </motion.div>

    </div>
  )
}