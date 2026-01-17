import type { User } from "@/types/user"

export interface UserManagementState {
  users: User[]
  isLoading: boolean
  error: string | null
  pagination: {
    page: number
    pageSize: number
    total: number
  }
}

export interface UserFilters {
  status?: "Active" | "Inactive"
  plan?: "Starter" | "Professional" | "Enterprise"
}
