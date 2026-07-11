"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function ChatbotsPage() {
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

      {/* Empty State */}
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

    </div>
  )
}