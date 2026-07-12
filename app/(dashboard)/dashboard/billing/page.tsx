"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    current: true,
    features: [
      "1 Chatbot",
      "10 Documents",
      "100 Messages/month",
      "Basic Analytics",
      "ChatSpark branding",
    ],
  },
  {
    name: "Basic",
    price: "$9",
    period: "per month",
    current: false,
    features: [
      "3 Chatbots",
      "50 Documents",
      "1,000 Messages/month",
      "Advanced Analytics",
      "Remove branding",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    current: false,
    features: [
      "Unlimited Chatbots",
      "Unlimited Documents",
      "Unlimited Messages",
      "Priority Support",
      "Custom Domain",
    ],
  },
]

export default function BillingPage() {
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
          Subscription
        </p>
        <h1 className="text-white text-2xl sm:text-3xl font-semibold">
          Billing
        </h1>
        <p className="text-[#A1A1AA] text-sm mt-1">
          Manage your subscription and usage
        </p>
      </motion.div>

      {/* Current Plan Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <p className="text-[#A1A1AA] text-xs uppercase tracking-wider mb-1">Current Plan</p>
          <h2 className="text-white text-2xl font-bold">Free Plan</h2>
          <p className="text-[#A1A1AA] text-sm mt-1">
            You are on the free plan. Upgrade to unlock more features.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs border border-green-500/30 text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg">
            Active
          </span>
          <span className="text-white font-bold text-xl">$0 / mo</span>
        </div>
      </motion.div>

      {/* Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-[#111111] border border-[#1F1F23] rounded-xl p-6"
      >
        <h2 className="text-white text-sm font-semibold border-b border-[#1F1F23] pb-3 mb-5">
          Current Usage
        </h2>
        <div className="space-y-4">
          {[
            { label: "Chatbots", used: 1, total: 1 },
            { label: "Messages this month", used: 0, total: 100 },
            { label: "Documents", used: 2, total: 10 },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-[#A1A1AA]">{item.label}</span>
                <span className="text-sm text-white font-medium">
                  {item.used} / {item.total}
                </span>
              </div>
              <div className="h-2 bg-[#1F1F23] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((item.used / item.total) * 100, 100)}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className={`h-2 rounded-full ${
                    (item.used / item.total) >= 0.9 ? "bg-red-400" :
                    (item.used / item.total) >= 0.7 ? "bg-yellow-400" : "bg-white"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h2 className="text-white text-sm font-semibold mb-4">
          Available Plans
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className={`bg-[#111111] border rounded-xl p-6 flex flex-col gap-5 ${
                plan.current
                  ? "border-white"
                  : "border-[#1F1F23] hover:border-[#3F3F46]"
              } transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                  {plan.current && (
                    <span className="text-xs bg-white text-black font-semibold px-2 py-0.5 rounded-md">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-white text-3xl font-bold">{plan.price}</span>
                  <span className="text-[#A1A1AA] text-xs">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-white text-xs">✓</span>
                    <span className="text-[#A1A1AA] text-xs">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.current}
                className={`w-full text-sm font-semibold py-2.5 rounded-lg transition-all active:scale-95 ${
                  plan.current
                    ? "bg-[#1F1F23] text-[#A1A1AA] cursor-not-allowed"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}