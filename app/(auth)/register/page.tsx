import RegisterForm from "@/components/auth/RegisterForm"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Create your account on{" "}
            <span className="text-white underline decoration-white">
              ChatSpark AI
            </span>
          </h1>
          <p className="text-[#A1A1AA] mt-2">
            Start building your AI chatbot today
          </p>
        </div>
        <RegisterForm />
      </div>
    </main>
  )
}