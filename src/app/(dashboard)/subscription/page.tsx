"use client"

import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout"
import { SubscriptionsContainer } from "@/components/dashboard/subscription/common"



export default function SubscriptionsPage() {
  return (
    <DashboardLayout title="Subscriptions & Promo Codes" description="Manage plans, pricing, and promotional offers">
      <SubscriptionsContainer />
    </DashboardLayout>
  )
}
