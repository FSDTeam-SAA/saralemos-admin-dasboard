import type React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <div className="p-8">
      {(title || description) && (
        <div className="mb-6">
          {title && <h1 className="text-2xl text-[#65A30D] font-bold mb-2">{title}</h1>}
          {description && <p className="text-muted-foreground text-sm font-normal">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
