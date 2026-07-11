"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const stats = [
  {
    label: "Active Chatbots",
    value: "0",
    change: "No chatbots yet",
    icon: "🤖",
    href: "/dashboard/chatbots/new",
  },
  {
    label: "Documents Trained",
    value: "0",
    change: "No documents yet",
    icon: "📄",
    href: "/dashboard/chatbots",
  },
  {
    label: "Total Conversations",
    value: "0",
    change: "No conversations yet",
    icon: "💬",
    href: "/dashboard/analytics",
  },
  {
    label: "Messages This Month",
    value: "0",
    change: "No messages yet",
    icon: "📊",
    href: "/dashboard/analytics",
  },
]

const quickActions = [
  { label: "Create Chatbot", href: "/dashboard/chatbots/new", icon: "🤖", desc: "Deploy a new AI chatbot" },
  { label: "Upload Document", href: "/dashboard/chatbots", icon: "📄", desc: "Train with your data" },
  { label: "Get Embed Code", href: "/dashboard/chatbots", icon: "🔗", desc: "Add widget to website" },
  { label: "View Analytics", href: "/dashboard/analytics", icon: "📊", desc: "Track performance" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
}

export default function DashboardPage() {
  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-0">

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F23] pb-6"
      >
        <div>
          <p className="text-[#A1A1AA] text-xs uppercase tracking-widest font-medium mb-1">
            Overview
          </p>
          <h1 className="text-white text-2xl sm:text-3xl font-semibold">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#A1A1AA] border border-[#1F1F23] px-3 py-1.5 rounded-lg">
            Free Plan
          </span>
          <Link
            href="/dashboard/chatbots/new"
            className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 active:scale-95 transition-all"
          >
            + New Chatbot
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Link
              href={stat.href}
              className="bg-[#111111] border border-[#1F1F23] hover:border-[#3F3F46] rounded-xl p-5 transition-all duration-300 group flex flex-col gap-3 h-full"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-xs text-[#A1A1AA] group-hover:text-white transition">
                  →
                </span>
              </div>
              <div>
                <p className="text-[#A1A1AA] text-xs font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
                <h2 className="text-white text-4xl font-bold mt-1">
                  {stat.value}
                </h2>
              </div>
              <div className="h-px bg-[#1F1F23] group-hover:bg-[#3F3F46] transition-all duration-300" />
              <p className="text-[#A1A1AA] text-xs">{stat.change}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Conversations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="lg:col-span-2 bg-[#111111] border border-[#1F1F23] rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#1F1F23]">
            <h2 className="text-white text-sm font-semibold">
              Recent Conversations
            </h2>
            <Link
              href="/dashboard/analytics"
              className="text-xs text-[#A1A1AA] hover:text-white transition"
            >
              View all →
            </Link>
          </div>

          <div className="hidden sm:grid grid-cols-3 px-6 py-3 border-b border-[#1F1F23]">
            <span className="text-xs text-[#A1A1AA] uppercase tracking-wider">Chatbot</span>
            <span className="text-xs text-[#A1A1AA] uppercase tracking-wider">Messages</span>
            <span className="text-xs text-[#A1A1AA] uppercase tracking-wider">Time</span>
          </div>

          <div className="px-5 sm:px-6 py-16 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="w-12 h-12 rounded-full bg-[#1F1F23] flex items-center justify-center mb-4"
            >
              <span className="text-xl">💬</span>
            </motion.div>
            <p className="text-white text-sm font-medium">
              No conversations yet
            </p>
            <p className="text-[#A1A1AA] text-xs mt-1 max-w-xs">
              Once your chatbot starts getting messages, they will appear here.
            </p>
            <Link
              href="/dashboard/chatbots/new"
              className="mt-5 text-xs border border-[#1F1F23] hover:border-[#3F3F46] text-white px-4 py-2 rounded-lg transition-all hover:bg-[#1F1F23] active:scale-95"
            >
              Create your first chatbot
            </Link>
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-4">

          {/* Plan Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-[#111111] border border-[#1F1F23] rounded-xl overflow-hidden"
          >
            <div className="px-5 sm:px-6 py-4 border-b border-[#1F1F23] flex items-center justify-between">
              <h2 className="text-white text-sm font-semibold">Current Plan</h2>
              <span className="text-xs bg-[#1F1F23] text-[#A1A1AA] px-2 py-1 rounded-md">
                Active
              </span>
            </div>
            <div className="px-5 sm:px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-xl">Free</span>
                <span className="text-xs text-[#A1A1AA]">$0 / month</span>
              </div>

              {[
                { label: "Chatbots", used: 0, total: 1 },
                { label: "Messages", used: 0, total: 100 },
                { label: "Documents", used: 0, total: 10 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-[#A1A1AA]">{item.label}</span>
                    <span className="text-xs text-white">{item.used} / {item.total}</span>
                  </div>
                  <div className="h-1.5 bg-[#1F1F23] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.used / item.total) * 100}%` }}
                      transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                      className="h-1.5 bg-white rounded-full"
                    />
                  </div>
                </div>
              ))}

              <Link
                href="/dashboard/billing"
                className="block text-center text-xs bg-white text-black font-semibold px-4 py-2.5 rounded-lg hover:bg-zinc-200 active:scale-95 transition-all mt-2"
              >
                Upgrade Plan
              </Link>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-[#111111] border border-[#1F1F23] rounded-xl overflow-hidden"
          >
            <div className="px-5 sm:px-6 py-4 border-b border-[#1F1F23]">
              <h2 className="text-white text-sm font-semibold">Quick Actions</h2>
            </div>
            <div className="divide-y divide-[#1F1F23]">
              {quickActions.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-5 sm:px-6 py-3.5 hover:bg-[#1F1F23] transition-all group"
                  >
                    <span className="text-lg w-8 h-8 flex items-center justify-center bg-[#1F1F23] group-hover:bg-[#2A2A2E] rounded-lg transition-all">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">
                        {item.label}
                      </p>
                      <p className="text-xs text-[#A1A1AA] truncate">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-[#A1A1AA] group-hover:text-white group-hover:translate-x-1 transition-all text-xs">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  )
}