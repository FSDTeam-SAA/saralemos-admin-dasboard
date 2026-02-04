"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {  RevenueMetrics, SubscriptionPlan } from "../common";
import { CreateSubscriptionValues } from "../common/subscriptions.schema";

import { SubscriptionPlanCard } from "../common/subscription-plan-card";
import { CreateSubscriptionModal } from "../common/create-subscription-modal";
import { RevenueMetricsComponent } from "../common/revenue-metrics";
import { PaymentMetricsData, PlanAnalyticsData } from "@/lib/types/subscription";

interface SubscriptionsPresenterProps {
  plans: SubscriptionPlan[];
  // promoCodes: PromoCode[]

  isLoading: boolean;
  error?: string | null;
  onCreatePlan: (data: CreateSubscriptionValues) => void;
  onDeletePlan: (id: string) => void;
  // onDeletePromoCode: (id: string) => void
  isCreatingPlan?: boolean;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages?: number;
  seeDetail:(id:string)=>void;
  selectedId: string;
  singleplan:PlanAnalyticsData;
    revenuemetricsData:PaymentMetricsData;
}

export function SubscriptionsPresenter({
  plans,


  isLoading,
  error,
  onCreatePlan,
  onDeletePlan,
  seeDetail,
  selectedId,
singleplan,
revenuemetricsData,
  isCreatingPlan = false,
}: SubscriptionsPresenterProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-muted-foreground">
          Loading subscriptions...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Revenue Metrics */}
      <RevenueMetricsComponent revenuemetricsData={revenuemetricsData} />

      {/* Subscription Plans */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            Subscription Plans
          </h2>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Subscription
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
          {plans.map((plan, index) => (
            <SubscriptionPlanCard
              key={index}
              plan={plan}
              onDelete={onDeletePlan}
              isHighlighted={index===1}
              seeDetail={seeDetail}
              selectedId={selectedId}
              singleplan={singleplan}
            />
          ))}
        </div>
      </div>

      {/* Promo Code Management */}
      {/* <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Promo Code Management</h2>
        <PromoCodeTable data={promoCodes} onDelete={onDeletePromoCode} />

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-muted-foreground">
            Showing 1 to {promoCodes.length} of {promoCodes.length} results
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50"
            >
              ←
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === i + 1 ? "bg-green-600 text-white" : "border border-border"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      </div> */}

      {/* Create Subscription Modal */}
      <CreateSubscriptionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={(data) => {
          onCreatePlan(data);
          setShowCreateModal(false);
        }}
        isLoading={isCreatingPlan}
      />
    </div>
  );
}

