import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { UserManagementContainer } from "@/components/dashboard/UserManagement/container/user-management.container";

export const metadata = {
  title: "User Management",
  description: "Manage user accounts and subscriptions",
};

export default function UserManagementPage() {
  return (
    <DashboardLayout
      title="User Management"
      description="Manage user accounts and subscriptions"
    >
      <UserManagementContainer />
    </DashboardLayout>
  );
}
