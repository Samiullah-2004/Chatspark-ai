import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1F1F23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <h1 className="text-white font-bold text-lg tracking-tight">
            ChatSpark<span className="text-[#A1A1AA]">.ai</span>
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-[#A1A1AA] hover:text-white transition px-3 py-2 rounded-lg hover:bg-[#1F1F23]"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all active:scale-95"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 border border-[#1F1F23] rounded-full px-4 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-[#A1A1AA] text-xs">Now in Beta — Free to use</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto">
          Build AI Chatbots
          <br />
          <span className="text-[#A1A1AA]">From Your Documents</span>
        </h1>

        <p className="text-[#A1A1AA] text-lg sm:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
          Upload your PDFs, train an AI chatbot on your content, and embed it on your website in minutes. No coding required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/register"
            className="bg-white text-black font-semibold px-8 py-3.5 rounded-xl hover:bg-zinc-200 transition-all active:scale-95 text-sm w-full sm:w-auto"
          >
            Start for Free
          </Link>
          <Link
            href="/login"
            className="border border-[#1F1F23] text-white font-semibold px-8 py-3.5 rounded-xl hover:border-[#3F3F46] hover:bg-[#111111] transition-all text-sm w-full sm:w-auto"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-[#1F1F23]">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl sm:text-4xl font-bold">
            Everything you need
          </h2>
          <p className="text-[#A1A1AA] mt-3 text-sm sm:text-base max-w-xl mx-auto">
            A complete platform to build, deploy, and manage AI chatbots for your business
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: "📄",
              title: "Upload Documents",
              desc: "Upload PDFs, Word docs, and text files. Your chatbot learns from your content automatically.",
            },
            {
              icon: "🤖",
              title: "AI Powered Answers",
              desc: "Powered by state of the art LLMs. Your chatbot answers questions accurately from your documents.",
            },
            {
              icon: "🔗",
              title: "Easy Embedding",
              desc: "Copy one line of code and paste it on your website. Works with any platform.",
            },
            {
              icon: "📊",
              title: "Analytics Dashboard",
              desc: "Track conversations, messages, and user engagement with detailed analytics.",
            },
            {
              icon: "⚡",
              title: "Instant Setup",
              desc: "Go from signup to live chatbot in under 5 minutes. No technical knowledge required.",
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              desc: "Your documents are encrypted and stored securely. Only your chatbot can access them.",
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="bg-[#111111] border border-[#1F1F23] hover:border-[#3F3F46] rounded-xl p-6 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1F1F23] group-hover:bg-[#2A2A2E] flex items-center justify-center text-xl mb-4 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">
                {feature.title}
              </h3>
              <p className="text-[#A1A1AA] text-xs leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-[#1F1F23]">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl sm:text-4xl font-bold">
            How it works
          </h2>
          <p className="text-[#A1A1AA] mt-3 text-sm max-w-xl mx-auto">
            Get your AI chatbot live in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Create a Chatbot",
              desc: "Sign up and create your first chatbot in seconds. Give it a name and welcome message.",
            },
            {
              step: "02",
              title: "Upload Your Docs",
              desc: "Upload PDFs or paste your content. Our AI will process and learn from your documents.",
            },
            {
              step: "03",
              title: "Embed on Website",
              desc: "Copy the embed code and paste it on your website. Your chatbot is now live.",
            },
          ].map((step) => (
            <div key={step.step} className="text-center">
              <div className="text-5xl font-bold text-[#1F1F23] mb-4">
                {step.step}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-[#1F1F23]">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl sm:text-4xl font-bold">
            Simple Pricing
          </h2>
          <p className="text-[#A1A1AA] mt-3 text-sm max-w-xl mx-auto">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            {
              name: "Free",
              price: "$0",
              desc: "Perfect for getting started",
              features: ["1 Chatbot", "10 Documents", "100 Messages/month"],
              cta: "Get Started",
              highlight: false,
            },
            {
              name: "Basic",
              price: "$9",
              desc: "For growing businesses",
              features: ["3 Chatbots", "50 Documents", "1,000 Messages/month"],
              cta: "Start Basic",
              highlight: true,
            },
            {
              name: "Pro",
              price: "$29",
              desc: "For power users",
              features: ["Unlimited Chatbots", "Unlimited Documents", "Unlimited Messages"],
              cta: "Start Pro",
              highlight: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`bg-[#111111] border rounded-xl p-6 flex flex-col gap-5 ${
                plan.highlight ? "border-white" : "border-[#1F1F23]"
              }`}
            >
              {plan.highlight && (
                <span className="text-xs bg-white text-black font-semibold px-3 py-1 rounded-full w-fit">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-white text-3xl font-bold">{plan.price}</span>
                  <span className="text-[#A1A1AA] text-xs">/month</span>
                </div>
                <p className="text-[#A1A1AA] text-xs mt-1">{plan.desc}</p>
              </div>
              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-white text-xs">✓</span>
                    <span className="text-[#A1A1AA] text-xs">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`w-full text-center text-sm font-semibold py-2.5 rounded-lg transition-all active:scale-95 ${
                  plan.highlight
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "border border-[#1F1F23] text-white hover:border-[#3F3F46] hover:bg-[#1F1F23]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-[#1F1F23]">
        <div className="bg-[#111111] border border-[#1F1F23] rounded-2xl p-10 sm:p-16 text-center">
          <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base max-w-xl mx-auto mb-8">
            Join thousands of businesses using ChatSpark AI to automate their customer support.
          </p>
          <Link
            href="/register"
            className="bg-white text-black font-semibold px-8 py-3.5 rounded-xl hover:bg-zinc-200 transition-all active:scale-95 text-sm inline-block"
          >
            Start for Free Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1F1F23] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-white font-bold text-lg tracking-tight">
            ChatSpark<span className="text-[#A1A1AA]">.ai</span>
          </h1>
          <p className="text-[#A1A1AA] text-xs">
            Built with Next.js, TypeScript, PostgreSQL and Groq AI
          </p>
        </div>
      </footer>

    </div>
  )
}