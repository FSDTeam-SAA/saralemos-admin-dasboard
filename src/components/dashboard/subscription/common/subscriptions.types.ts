export type SubscriptionTier =
  | "Free"
  | "Starter"
  | "Professional"
  | "Enterprise";
export type PromoStatus = "Active" | "Expired" | "Inactive";

export interface SubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  billingCycle: string;
  description: string;
  isActive: boolean;
  features: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  popular?: boolean;
  featured?: boolean;
  tagline?: string;
  cta?: string;
  period?: string;
}

export interface ApiResponse {
  status: boolean;
  message: string;
  data: SubscriptionPlan[];
}

export interface PromoCode {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxUses: number;
  currentUses: number;
  expiryDate: string;
  status: PromoStatus;
  applicablePlans: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RevenueMetrics {
  mrr: number;
  arpu: number;
  ltv: number;
  cacRatio: number;
  mrrChange: number;
  conversionRate: number;
}

export interface SubscriptionsState {
  plans: SubscriptionPlan[];
  // promoCodes: PromoCode[];
  metrics: RevenueMetrics;
  isLoading: boolean;
  error: string | null;
}
