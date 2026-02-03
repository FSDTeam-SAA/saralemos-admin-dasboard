"use client";

import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import SettingsMain from "@/components/dashboard/setting/SettingsMain";
import Setup from "@/components/dashboard/setting/Setup";

const page = () => {
  return (
    <DashboardLayout
      title="Subscriptions & Promo Codes"
      description="Manage plans, pricing, and promotional offers"
    >
      {/* <SettingsMain /> */}
      <Setup />
    </DashboardLayout>
  );
};

export default page;
