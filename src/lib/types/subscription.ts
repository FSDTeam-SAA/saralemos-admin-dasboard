export interface MonthlyRevenue {
  amount: number;
  currency: string;
  paymentCount: number;
  month: string;
}

export interface ChurnRate {
  percentage: number;
  churnedUsers: number;
  totalUsersEver: number;
}

export interface RetentionRate {
  percentage: number;
  description: string;
}

export interface AdditionalMetrics {
  allTimeRevenue: number;
  totalPayments: number;
  averageRevenuePerUser: number;
}

 export interface PlanAnalyticsData {
  planId: string;
  activeUsers: number;
  monthlyRevenue: MonthlyRevenue;
  churnRate: ChurnRate;
  retentionRate: RetentionRate;
  additionalMetrics: AdditionalMetrics;
}

export interface PlanAnalyticsResponse {
  status: boolean;
  message: string;
  data: PlanAnalyticsData;
}



// types/payment-metrics.ts

export interface MRRBreakdown {
  monthly: number;
  yearly: number;
  quarterly: number;
}

export interface MRRData {
  value: number;
  currency: string;
  description: string;
  breakdown: MRRBreakdown;
}

export interface ARPUData {
  value: number;
  currency: string;
  description: string;
  activeUsers: number;
}

export interface LTVData {
  value: number;
  currency: string;
  description: string;
  assumedLifespanMonths: number;
}

export interface CACData {
  value: number;
  currency: string;
  description: string;
  note: string;
}

export interface AdditionalMetrics {
  totalPayments: number;
  totalRevenueAllTime: number;
  totalUsers: number;
  activeSubscriptions: number;
  LTVtoCAC: number;
}

export interface PaymentMetricsData {
  MRR: MRRData;
  ARPU: ARPUData;
  LTV: LTVData;
  CAC: CACData;
  additionalMetrics: AdditionalMetrics;
}

export interface PaymentMetricsResponse {
  status: boolean;
  message: string;
  data: PaymentMetricsData;
}

// You can also export a type alias if needed
export type { PaymentMetricsResponse as PaymentMetricsType };

// Optional: Helper types for specific metrics if needed elsewhere
export type { MRRData as MonthlyRecurringRevenue };
export type { ARPUData as AverageRevenuePerUser };
export type { LTVData as CustomerLifetimeValue };
export type { CACData as CustomerAcquisitionCost };