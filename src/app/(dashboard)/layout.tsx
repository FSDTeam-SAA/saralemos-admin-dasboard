
import { Sidebar } from "@/components/dashboard/sidebar"
import type React from "react"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
