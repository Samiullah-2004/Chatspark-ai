import type { Metadata } from "next"
import LoginForm from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Login",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back to{" "}
            <span className="text-white underline decoration-white">
              ChatSpark AI
            </span>
          </h1>
          <p className="text-[#A1A1AA] mt-2">
            Login to manage your chatbots
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}