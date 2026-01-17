import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { HeroManagementContainer } from "@/components/dashboard/updatehero/container/hero-management.container";

export const metadata = {
  title: "Update Hero Section",
  description: "Update hero section content and media",
};

export default function HeroPage() {
  return (
    <DashboardLayout
      title="Subscriptions & Promo Codes"
      description="Manage plans, pricing, and promotional offers"
    >
      <HeroManagementContainer />
    </DashboardLayout>
  );
}
