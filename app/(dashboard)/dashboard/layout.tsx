import type { Metadata } from "next"
import Navbar from "@/components/dashboard/Navbar"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {children}
      </main>
    </div>
  )
}