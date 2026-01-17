"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { subscriptionsApi } from "@/lib/api/api"
import type { SubscriptionPlan, PromoCode } from "./subscriptions.types"

export const useSubscriptionPlans = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ["subscriptions", page, pageSize],
    queryFn: () => subscriptionsApi.getPlans(page, pageSize),
  })
}

export const usePromoCodes = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ["promo-codes", page, pageSize],
    queryFn: () => subscriptionsApi.getPromoCodes(page, pageSize),
  })
}

export const useRevenueMetrics = () => {
  return useQuery({
    queryKey: ["revenue-metrics"],
    queryFn: () => subscriptionsApi.getRevenueMetrics(),
  })
}

export const useCreatePlan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<SubscriptionPlan, "id" | "createdAt" | "updatedAt">) => subscriptionsApi.createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
      queryClient.invalidateQueries({ queryKey: ["revenue-metrics"] })
    },
  })
}

export const useDeletePlan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => subscriptionsApi.deletePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
    },
  })
}

export const useCreatePromoCode = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<PromoCode, "id" | "createdAt" | "updatedAt" | "currentUses">) =>
      subscriptionsApi.createPromoCode(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promo-codes"] })
    },
  })
}

export const useDeletePromoCode = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => subscriptionsApi.deletePromoCode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promo-codes"] })
    },
  })
}
