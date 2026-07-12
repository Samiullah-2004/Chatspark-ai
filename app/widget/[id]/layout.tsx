import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chat Widget",
}

export default function WidgetLayout({ children }: { children: React.ReactNode }) {
  return children
}