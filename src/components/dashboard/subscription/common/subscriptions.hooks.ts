"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { subscriptionsApi } from "@/lib/api/api"
import type { SubscriptionPlan } from "./subscriptions.types"
import { Subscription, SubscriptionDelete, SubscriptionFetch } from "@/lib/api/subscription"
import { toast } from "sonner"

export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => SubscriptionFetch(),
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
    mutationFn: (data: Partial<SubscriptionPlan> ) => Subscription(data),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
      queryClient.invalidateQueries({ queryKey: ["revenue-metrics"] })
      toast.success(res?.message || "Subscription plan created successfully")
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create subscription plan")
    }
  })
}

export const useDeletePlan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => SubscriptionDelete(id),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
      toast.success(res?.message || "Subscription plan deleted successfully")
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete subscription plan")
    }
  })
}


