import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chatbot Details",
}

export default function ChatbotDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}