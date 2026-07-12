import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Embed Code",
}

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return children
}