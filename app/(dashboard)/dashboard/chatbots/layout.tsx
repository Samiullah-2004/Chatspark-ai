import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Chatbots",
}

export default function ChatbotsLayout({ children }: { children: React.ReactNode }) {
  return children
}