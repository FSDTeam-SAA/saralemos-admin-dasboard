/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiResponse, PaginatedResponse } from "@/types/api"
import type { User, HeroSection, DashboardStats, SubscriptionPlan, PromoCode, RevenueMetrics } from "@/types/user"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return { data, error: null, success: true }
  } catch (error) {
    return {
      data: null as any,
      error: error instanceof Error ? error.message : "Unknown error",
      success: false,
    }
  }
}

// User Management API
export const userApi = {
  getUsers: (page = 1, pageSize = 10) => apiCall<PaginatedResponse<User>>(`/users?page=${page}&pageSize=${pageSize}`),

  getUserById: (id: string) => apiCall<User>(`/users/${id}`),

  createUser: (data: Omit<User, "id">) =>
    apiCall<User>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateUser: (id: string, data: Partial<User>) =>
    apiCall<User>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteUser: (id: string) =>
    apiCall<void>(`/users/${id}`, {
      method: "DELETE",
    }),
}

// Hero Section API
export const heroApi = {
  getHeroSections: (page = 1, pageSize = 10) =>
    apiCall<PaginatedResponse<HeroSection>>(`/hero-sections?page=${page}&pageSize=${pageSize}`),

  getHeroById: (id: string) => apiCall<HeroSection>(`/hero-sections/${id}`),

  createHero: (data: Omit<HeroSection, "id" | "createdAt" | "updatedAt">) =>
    apiCall<HeroSection>("/hero-sections", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateHero: (id: string, data: Partial<HeroSection>) =>
    apiCall<HeroSection>(`/hero-sections/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteHero: (id: string) =>
    apiCall<void>(`/hero-sections/${id}`, {
      method: "DELETE",
    }),
}

// Dashboard API
export const dashboardApi = {
  getStats: () => apiCall<DashboardStats>("/dashboard/stats"),
}

// Subscriptions API
export const subscriptionsApi = {
  getPlans: (page = 1, pageSize = 10) =>
    apiCall<PaginatedResponse<SubscriptionPlan>>(`/subscriptions/plans?page=${page}&pageSize=${pageSize}`),

  createPlan: (data: Omit<SubscriptionPlan, "id" | "createdAt" | "updatedAt">) =>
    apiCall<SubscriptionPlan>("/subscriptions/plans", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deletePlan: (id: string) =>
    apiCall<void>(`/subscriptions/plans/${id}`, {
      method: "DELETE",
    }),

  getPromoCodes: (page = 1, pageSize = 10) =>
    apiCall<PaginatedResponse<PromoCode>>(`/subscriptions/promo-codes?page=${page}&pageSize=${pageSize}`),

  createPromoCode: (data: Omit<PromoCode, "id" | "createdAt" | "updatedAt" | "currentUses">) =>
    apiCall<PromoCode>("/subscriptions/promo-codes", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deletePromoCode: (id: string) =>
    apiCall<void>(`/subscriptions/promo-codes/${id}`, {
      method: "DELETE",
    }),

  getRevenueMetrics: () => apiCall<RevenueMetrics>("/subscriptions/metrics"),
}
