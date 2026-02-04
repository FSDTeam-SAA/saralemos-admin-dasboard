import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout'
import InformationChangeWraper from '@/components/dashboard/setting/detailsChange/InformationChangeWraper'
import React from 'react'

const page = () => {
  return (
    <DashboardLayout title="Profile Settings" description="Update your personal information">
        <InformationChangeWraper />
    </DashboardLayout>
  )
}

export default page