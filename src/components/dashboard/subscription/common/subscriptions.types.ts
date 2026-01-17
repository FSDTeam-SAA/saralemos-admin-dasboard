export type SubscriptionTier = "Free" | "Starter" | "Professional" | "Enterprise"
export type PromoStatus = "Active" | "Expired" | "Inactive"

export interface SubscriptionPlan {
  id: string
  name: SubscriptionTier
  price: number
  billingPeriod: "month" | "year"
  description: string
  features: string[]
  activeSubscribers: number
  monthlyRevenue: number
  conversionRate: number
  churnRate: number
  createdAt: string
  updatedAt: string
}

export interface PromoCode {
  id: string
  code: string
  discountType: "percentage" | "fixed"
  discountValue: number
  maxUses: number
  currentUses: number
  expiryDate: string
  status: PromoStatus
  applicablePlans: string[]
  createdAt: string
  updatedAt: string
}

export interface RevenueMetrics {
  mrr: number
  arpu: number
  ltv: number
  cacRatio: number
  mrrChange: number
  conversionRate: number
}

export interface SubscriptionsState {
  plans: SubscriptionPlan[]
  promoCodes: PromoCode[]
  metrics: RevenueMetrics
  isLoading: boolean
  error: string | null
}
