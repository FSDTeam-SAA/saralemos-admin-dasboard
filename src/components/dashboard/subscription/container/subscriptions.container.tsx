"use client"

import { useState } from "react"
import {
  useSubscriptionPlans,

  useRevenueMetrics,
  useCreatePlan,
  useDeletePlan,
 
} from "../common/subscriptions.hooks"
import { SubscriptionsPresenter } from "./subscriptions.presenter"
import type { CreateSubscriptionValues } from "../common/subscriptions.schema"

export function SubscriptionsContainer() {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const {
    data,
    isLoading: isLoadingPlans,
    error: errorPlans,
  } = useSubscriptionPlans()

  const { data: metricsResponse } = useRevenueMetrics()

  const createPlanMutation = useCreatePlan()
  const deletePlanMutation = useDeletePlan()


  const handleCreatePlan = (data: CreateSubscriptionValues) => {
    console.log("Received data in handleCreatePlan:", data)
    createPlanMutation.mutate({
      name: data.name,
      price: data.price,
      billingCycle: data.duration,
      description: data.description,
      features: data.features,
    })
  }

  const plans = data?.data || []

  const metrics = metricsResponse?.data || {
    mrr: 9108,
    arpu: 99,
    ltv: 1782,
    cacRatio: 3.2,
    mrrChange: 12.45,
    conversionRate: 37,
  }
  // const totalPages = plansResponse?.data?.total ? Math.ceil(plansResponse.data.total / pageSize) : 1

  return (
    <SubscriptionsPresenter
      plans={plans}
      metrics={metrics}
      isLoading={isLoadingPlans}
      error={errorPlans?.message || null}
      onCreatePlan={handleCreatePlan}
      onDeletePlan={(id) => deletePlanMutation.mutate(id)}
    
      isCreatingPlan={createPlanMutation.isPending}
      onPageChange={setCurrentPage}
      currentPage={currentPage}
      // totalPages={totalPages}
    />
  )
}

export default SubscriptionsContainer
