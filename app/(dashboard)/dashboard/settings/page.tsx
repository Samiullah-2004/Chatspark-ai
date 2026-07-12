"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { signOut } from "next-auth/react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)

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
          Preferences
        </p>
        <h1 className="text-white text-2xl sm:text-3xl font-semibold">
          Settings
        </h1>
        <p className="text-[#A1A1AA] text-sm mt-1">
          Manage your account preferences
        </p>
      </motion.div>

      <div className="max-w-2xl space-y-6">

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6"
        >
          <h2 className="text-white text-sm font-semibold border-b border-[#1F1F23] pb-3 mb-5">
            Notifications
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white text-sm font-medium">Email Notifications</h3>
              <p className="text-[#A1A1AA] text-xs mt-1">
                Receive updates about your chatbot activity
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full transition-all relative ${
                notifications ? "bg-white" : "bg-[#1F1F23]"
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-black absolute top-1 transition-all ${
                notifications ? "left-6" : "left-1"
              }`} />
            </button>
          </div>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6"
        >
          <h2 className="text-white text-sm font-semibold border-b border-[#1F1F23] pb-3 mb-5">
            Account
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="text-white text-sm font-medium">Sign Out</h3>
                <p className="text-[#A1A1AA] text-xs mt-1">
                  Sign out of your account
                </p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-sm text-white border border-[#1F1F23] hover:border-[#3F3F46] px-4 py-2 rounded-lg transition-all hover:bg-[#1F1F23]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6"
        >
          <h2 className="text-white text-sm font-semibold border-b border-[#1F1F23] pb-3 mb-5">
            About
          </h2>
          <div className="space-y-3">
            {[
              { label: "Version", value: "1.0.0" },
              { label: "Plan", value: "Free" },
              { label: "Built with", value: "Next.js + TypeScript + PostgreSQL" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1">
                <span className="text-[#A1A1AA] text-sm">{item.label}</span>
                <span className="text-white text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}