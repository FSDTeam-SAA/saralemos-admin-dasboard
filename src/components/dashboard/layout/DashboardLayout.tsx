import type React from "react"
import { Sidebar } from "../sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {(title || description) && (
            <div className="mb-6">
              {title && <h1 className="text-3xl font-bold mb-2">{title}</h1>}
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  )
}
