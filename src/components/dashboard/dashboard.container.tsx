"use client"

import { useOverAllView, useRevenue, useUserAnalytics } from "@/lib/hooks/useOverAllView"
import { DashboardPresenter } from "./dashboard.presenter"



export function DashboardContainer() {
  const {data}=useOverAllView()
  const {data:analytics}=useUserAnalytics()
  const {data:revenueData}=useRevenue('2025-01-01', '2026-12-31')

  const overallviewdata=data?.data
  console.log('over all view',overallviewdata)
  console.log('reve',revenueData)
  // TODO: Integrate with useQuery when API is available
  return (
    <DashboardPresenter 
      stats={null} 
      isLoading={false} 
      error={null} 
      data={overallviewdata} 
      analytics={analytics?.data || []} 
      revenueAnalytics={revenueData?.data || []}
    />
  )
}
