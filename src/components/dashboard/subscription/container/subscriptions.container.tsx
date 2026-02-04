"use client";

import { useState } from "react";
import {
  useSubscriptionPlans,
  useCreatePlan,
  useDeletePlan,
} from "../common/subscriptions.hooks";
import { SubscriptionsPresenter } from "./subscriptions.presenter";
import type { CreateSubscriptionValues } from "../common/subscriptions.schema";
import {
  useSingleSubscription,
  useSubscriptionRevenue,
} from "@/lib/hooks/useSubscription";

export function SubscriptionsContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState("");
  const pageSize = 10;

  const {
    data,
    isLoading: isLoadingPlans,
    error: errorPlans,
  } = useSubscriptionPlans();
  const { data: singleData } = useSingleSubscription(id);

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
  const singleplan = singleData?.data || {};

  // const totalPages = plansResponse?.data?.total ? Math.ceil(plansResponse.data.total / pageSize) : 1

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
      singleplan={singleplan}
      revenuemetricsData={revenuemetricsData?.data}
      // totalPages={totalPages}
    />
  );
}

export default SubscriptionsContainer;
