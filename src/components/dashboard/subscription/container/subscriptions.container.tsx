"use client"

import { useState } from "react"
import {
  useSubscriptionPlans,
  usePromoCodes,
  useRevenueMetrics,
  useCreatePlan,
  useDeletePlan,
  useDeletePromoCode,
} from "../common/subscriptions.hooks"
import { SubscriptionsPresenter } from "./subscriptions.presenter"
import type { CreateSubscriptionValues } from "../common/subscriptions.schema"

export function SubscriptionsContainer() {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const {
    data: plansResponse,
    isLoading: isLoadingPlans,
    error: errorPlans,
  } = useSubscriptionPlans(currentPage, pageSize)
  const { data: promoResponse, isLoading: isLoadingPromo } = usePromoCodes(currentPage, pageSize)
  const { data: metricsResponse } = useRevenueMetrics()

  const createPlanMutation = useCreatePlan()
  const deletePlanMutation = useDeletePlan()
  const deletePromoMutation = useDeletePromoCode()

  const handleCreatePlan = (data: CreateSubscriptionValues) => {
    createPlanMutation.mutate({
      name: data.name,
      price: data.price,
      billingPeriod: data.billingPeriod,
      description: data.description,
      features: data.features,
      activeSubscribers: 0,
      monthlyRevenue: 0,
      conversionRate: 0,
      churnRate: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  const plans = plansResponse?.data?.items || []
  const promoCodes = promoResponse?.data?.items || []
  const metrics = metricsResponse?.data || {
    mrr: 9108,
    arpu: 99,
    ltv: 1782,
    cacRatio: 3.2,
    mrrChange: 12.45,
    conversionRate: 37,
  }
  const totalPages = plansResponse?.data?.total ? Math.ceil(plansResponse.data.total / pageSize) : 1

  return (
    <SubscriptionsPresenter
      plans={plans}
      promoCodes={promoCodes}
      metrics={metrics}
      isLoading={isLoadingPlans || isLoadingPromo}
      error={errorPlans?.error || null}
      onCreatePlan={handleCreatePlan}
      onDeletePlan={(id) => deletePlanMutation.mutate(id)}
      onDeletePromoCode={(id) => deletePromoMutation.mutate(id)}
      isCreatingPlan={createPlanMutation.isPending}
      onPageChange={setCurrentPage}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}

export default SubscriptionsContainer
