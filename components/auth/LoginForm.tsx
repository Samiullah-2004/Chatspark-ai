"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid email or password")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  const handleGitHub = async () => {
    await signIn("github", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="bg-[#111111] border border-[#1F1F23] rounded-2xl p-8 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-[#A1A1AA] mb-1 block">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full bg-[#0A0A0A] border border-[#1F1F23] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-white transition"
          />
        </div>

        <div>
          <label className="text-sm text-[#A1A1AA] mb-1 block">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full bg-[#0A0A0A] border border-[#1F1F23] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-white transition"
          />
        </div>

        {error && (
          <div className="border border-red-500 rounded-lg px-4 py-3">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white hover:bg-zinc-200 text-black font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-[#1F1F23]" />
        <span className="mx-4 text-[#A1A1AA] text-sm">OR</span>
        <div className="flex-1 border-t border-[#1F1F23]" />
      </div>

      <button
        onClick={handleGitHub}
        className="w-full flex items-center justify-center gap-3 bg-[#0A0A0A] border border-[#1F1F23] hover:border-white text-white font-semibold py-3 rounded-lg transition"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        Continue with GitHub
      </button>

      <p className="text-center text-[#A1A1AA] text-sm mt-6">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-white hover:underline">
          Register
        </a>
      </p>
    </div>
  )
}