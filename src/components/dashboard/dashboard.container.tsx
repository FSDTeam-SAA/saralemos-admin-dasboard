"use client"

import { useOverAllView, useRevenue, useUserAnalytics } from "@/lib/hooks/useOverAllView"
import { DashboardPresenter } from "./dashboard.presenter"
import { useUsers } from "./UserManagement/common/user-management.hooks"



export function DashboardContainer() {
  const { data: overallData, isLoading: overallLoading, error: overallError } = useOverAllView()
  const { data: analytics, isLoading: analyticsLoading, error: analyticsError } = useUserAnalytics()
  const { data: userData, isLoading: usersLoading, error: usersError } = useUsers()
  const { data: revenueData, isLoading: revenueLoading, error: revenueError } = useRevenue('2025-01-01', '2026-12-31')

  const isLoading = overallLoading || analyticsLoading || usersLoading || revenueLoading
  const error = (
    (overallError )?.message || 
    (analyticsError )?.message || 
    (usersError )?.message || 
    (revenueError)?.message || 
    null
  )

  const overallviewdata = overallData?.data
  const users = userData?.data?.data?.users || []

  return (
    <DashboardPresenter 
      stats={null} 
      isLoading={isLoading} 
      error={error} 
      data={overallviewdata} 
      analytics={analytics?.data || []} 
      revenueAnalytics={revenueData?.data || []}
      userData={users}
    />
  )
}
