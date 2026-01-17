"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { subscriptionsApi } from "@/lib/api/api"
import type { SubscriptionPlan } from "./subscriptions.types"
import { Subscription, SubscriptionDelete, SubscriptionFetch } from "@/lib/api/subscription"

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
      queryClient.invalidateQueries({ queryKey: ["revenue-metrics"] })
    },
  })
}

export const useDeletePlan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => SubscriptionDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
    },
  })
}


