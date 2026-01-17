"use client"

import { DashboardPresenter } from "./dashboard.presenter"



export function DashboardContainer() {
  // TODO: Integrate with useQuery when API is available
  return <DashboardPresenter stats={null} isLoading={false} error={null} />
}
