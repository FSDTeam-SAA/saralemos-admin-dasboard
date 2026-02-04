import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout'
import ChangePasswordWraper from '@/components/dashboard/setting/changepassword/ChangePasswordWraper'
import React from 'react'

const page = () => {
  return (
    <DashboardLayout title="Change Password" description="Secure your account by updating your password">
        <ChangePasswordWraper />
    </DashboardLayout>
  )
}

export default page