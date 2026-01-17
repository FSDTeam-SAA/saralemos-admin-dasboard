import { DashboardContainer } from "@/components/dashboard/dashboard.container";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";

export const metadata = {
  title: "Dashboard Overview",
  description: "Monitor platform performance and user activity",
};

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard Overview"
      description="Monitor platform performance and user activity"
    >
      <DashboardContainer />
    </DashboardLayout>
  );
}
