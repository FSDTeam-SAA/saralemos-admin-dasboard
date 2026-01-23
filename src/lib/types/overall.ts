export type MonthlyRevenue = {
  amount: number;
  currency: string;
  paymentCount: number;
  month: string;
};

export type DashboardData = {
  totalUsers: number;
  activeSubscriptions: number;
  monthlyRevenue: MonthlyRevenue;
  inactiveUsers: number;
  totalListings: number;
};

export type DashboardResponse = {
  status: boolean;
  message: string;
  data: DashboardData;
};


// types/user-analytics.ts

export interface UserAnalyticsDataPoint {
  userCount: number;
  year: number;
  month: number; // 1-12 representing January-December
  date: string; // ISO 8601 date string
}

export interface UserAnalyticsResponse {
  status: boolean;
  message: string;
  data: UserAnalyticsDataPoint[];
}