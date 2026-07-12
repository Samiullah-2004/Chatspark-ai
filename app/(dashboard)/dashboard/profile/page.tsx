"use client"

import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [name, setName] = useState(session?.user?.name ?? "")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      if (!res.ok) {
        setError("Failed to update profile")
        return
      }

      await update({ name })
      setSuccess(true)
    } catch {
      setError("Something went wrong")
    } finally {
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
          Account
        </p>
        <h1 className="text-white text-2xl sm:text-3xl font-semibold">
          Profile
        </h1>
        <p className="text-[#A1A1AA] text-sm mt-1">
          Manage your personal information
        </p>
      </motion.div>

      <div className="max-w-2xl space-y-6">

        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6 flex items-center gap-5"
        >
          <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center text-2xl font-bold flex-shrink-0">
            {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div>
            <h2 className="text-white font-semibold">
              {session?.user?.name ?? "User"}
            </h2>
            <p className="text-[#A1A1AA] text-sm mt-0.5">
              {session?.user?.email}
            </p>
            <span className="text-xs border border-[#1F1F23] text-[#A1A1AA] px-2 py-0.5 rounded-md mt-2 inline-block">
              Free Plan
            </span>
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6"
        >
          <h2 className="text-white text-sm font-semibold border-b border-[#1F1F23] pb-3 mb-5">
            Personal Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-[#A1A1AA] uppercase tracking-wider mb-2 block">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-[#0A0A0A] border border-[#1F1F23] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-white transition text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-[#A1A1AA] uppercase tracking-wider mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                value={session?.user?.email ?? ""}
                disabled
                className="w-full bg-[#0A0A0A] border border-[#1F1F23] rounded-lg px-4 py-3 text-[#A1A1AA] text-sm cursor-not-allowed"
              />
              <p className="text-xs text-[#A1A1AA] mt-1">
                Email cannot be changed
              </p>
            </div>

            {error && (
              <div className="border border-red-500/50 bg-red-500/10 rounded-lg px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="border border-green-500/50 bg-green-500/10 rounded-lg px-4 py-3">
                <p className="text-green-400 text-sm">Profile updated successfully!</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-[#111111] border border-red-500/20 rounded-xl p-6"
        >
          <h2 className="text-red-400 text-sm font-semibold border-b border-red-500/20 pb-3 mb-5">
            Danger Zone
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-sm font-medium">Delete Account</h3>
              <p className="text-[#A1A1AA] text-xs mt-1">
                Permanently delete your account and all data. This cannot be undone.
              </p>
            </div>
            <button className="text-sm text-red-400 border border-red-500/30 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all w-fit flex-shrink-0">
              Delete Account
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}