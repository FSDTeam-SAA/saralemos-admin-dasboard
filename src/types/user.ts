export type UserStatus = "Active" | "Inactive"
export type UserPlan = "Starter" | "Professional" | "Enterprise"
export type SubscriptionTier = "Free" | "Starter" | "Professional" | "Enterprise"
export type PromoStatus = "Active" | "Expired" | "Inactive"



export interface HeroSection {
  id: string
  title: string
  subTitle: string
  imageUrl: string | null
  videoUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface DashboardStats {
  totalUsers: number
  activeSubscriptions: number
  monthlyRevenue: number
  listingsProcessed: number
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  duration: "month" | "year"
  description: string
  features: string[]

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
