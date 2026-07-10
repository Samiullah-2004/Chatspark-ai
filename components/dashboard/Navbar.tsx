"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Chatbots", href: "/dashboard/chatbots" },
  { label: "Analytics", href: "/dashboard/analytics" },
  { label: "Settings", href: "/dashboard/settings" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1F1F23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">

          {/* Logo */}
          <Link href="/dashboard" className="text-white font-bold text-lg tracking-tight">
            ChatSpark<span className="text-[#A1A1AA]">.ai</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  pathname === link.href
                    ? "text-white bg-[#1F1F23]"
                    : "text-[#A1A1AA] hover:text-white hover:bg-[#1F1F23]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard/chatbots/new"
              className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 active:scale-95 transition-all"
            >
              + New Chatbot
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-sm text-[#A1A1AA] hover:text-white transition px-3 py-2 rounded-lg hover:bg-[#1F1F23]"
            >
              Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-white transition-all"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-white transition-all"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-white transition-all"
            />
          </button>

        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 bg-[#0A0A0A] border-b border-[#1F1F23] md:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm transition-all ${
                    pathname === link.href
                      ? "text-white bg-[#1F1F23]"
                      : "text-[#A1A1AA] hover:text-white hover:bg-[#1F1F23]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[#1F1F23] space-y-1">
                <Link
                  href="/dashboard/chatbots/new"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center bg-white text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-zinc-200 transition-all"
                >
                  + New Chatbot
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full text-sm text-[#A1A1AA] hover:text-white transition px-4 py-2.5 rounded-lg hover:bg-[#1F1F23] text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}