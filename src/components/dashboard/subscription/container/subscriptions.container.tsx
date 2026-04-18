"use client";

import { useState } from "react";
import {
  useSubscriptionPlans,
  useCreatePlan,
  useDeletePlan,
} from "../common/subscriptions.hooks";
import { SubscriptionsPresenter } from "./subscriptions.presenter";
import type { CreateSubscriptionValues } from "../common/subscriptions.schema";
import { useSubscriptionRevenue } from "@/lib/hooks/useSubscription";

export function SubscriptionsContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState("");

  const {
    data,
    isLoading: isLoadingPlans,
    error: errorPlans,
  } = useSubscriptionPlans();

  const { data: revenuemetricsData } = useSubscriptionRevenue();

  const createPlanMutation = useCreatePlan();
  const deletePlanMutation = useDeletePlan();

  const handleCreatePlan = (data: CreateSubscriptionValues) => {
    console.log("Received data in handleCreatePlan:", data);
    createPlanMutation.mutate({
      name: data.name,
      price: data.price,
      billingCycle: data.duration,
      description: data.description,
      features: data.features,
      allowedListings:data.allowedListings,
    });
  };

  const plans = data?.data || [];

  return (
    <SubscriptionsPresenter
      plans={plans}
      isLoading={isLoadingPlans}
      error={errorPlans?.message || null}
      onCreatePlan={handleCreatePlan}
      onDeletePlan={(id) => deletePlanMutation.mutate(id)}
      isCreatingPlan={createPlanMutation.isPending}
      onPageChange={setCurrentPage}
      currentPage={currentPage}
      seeDetail={(newId) => setId((prev) => (prev === newId ? "" : newId))}
      selectedId={id}
      revenuemetricsData={revenuemetricsData?.data}
    />
  );
}

export default SubscriptionsContainer;
