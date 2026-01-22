export type MonthlyRevenue = {
  amount: number;
  currency: string;
  paymentCount: number;
  month: string;
};

export type DashboardData = {
  [x: string]: number;
  totalUsers: number;
  activeSubscriptions: number;
  monthlyRevenue: MonthlyRevenue;
  inactiveUsers: number;
};

export type DashboardResponse = {
  status: boolean;
  message: string;
  data: DashboardData;
};