import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Chatbot",
}

export default function NewChatbotLayout({ children }: { children: React.ReactNode }) {
  return children
}