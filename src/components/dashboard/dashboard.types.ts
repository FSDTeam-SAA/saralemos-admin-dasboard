import { DashboardStats } from "@/types/user"
import type React from "react"

export interface DashboardState {
  stats: DashboardStats | null
  isLoading: boolean
  error: string | null
}

export interface StatCard {
  label: string
  value: string | number
  icon: React.ReactNode
}
