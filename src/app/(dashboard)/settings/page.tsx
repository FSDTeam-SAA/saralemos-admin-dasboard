"use client";

import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import SettingsMain from "@/components/dashboard/setting/SettingsMain";

const page = () => {
  return (
    <DashboardLayout
      title="Subscriptions & Promo Codes"
      description="Manage plans, pricing, and promotional offers"
    >
      <SettingsMain />
    </DashboardLayout>
  );
};

export default page;
