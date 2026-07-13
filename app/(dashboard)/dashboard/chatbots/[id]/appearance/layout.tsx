import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Appearance",
}

export default function AppearanceLayout({ children }: { children: React.ReactNode }) {
  return children
}