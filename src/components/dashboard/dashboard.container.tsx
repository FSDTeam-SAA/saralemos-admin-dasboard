"use client"

import { useOverAllView } from "@/lib/hooks/useOverAllView"
import { DashboardPresenter } from "./dashboard.presenter"



export function DashboardContainer() {
  const {data}=useOverAllView()
  const overallviewdata=data?.data
  console.log('over all view',overallviewdata)
  // TODO: Integrate with useQuery when API is available
  return <DashboardPresenter stats={null} isLoading={false} error={null} data={overallviewdata} />
}
