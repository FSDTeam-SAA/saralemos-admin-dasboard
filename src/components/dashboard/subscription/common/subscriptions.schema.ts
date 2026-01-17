import { z } from "zod"

export const createSubscriptionSchema = z.object({
  name: z.enum(["Free", "Starter", "Professional", "Enterprise"]),
  price: z.number().min(0, "Price must be 0 or greater"),
  billingPeriod: z.enum(["month", "year"]),
  description: z.string().min(1, "Description is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
})

export type CreateSubscriptionValues = z.infer<typeof createSubscriptionSchema>

export const createPromoCodeSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").max(20, "Code must be at most 20 characters"),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().min(0.01, "Discount value must be greater than 0"),
  maxUses: z.number().min(1, "Max uses must be at least 1"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  applicablePlans: z.array(z.string()).min(1, "Select at least one plan"),
})

export type CreatePromoCodeValues = z.infer<typeof createPromoCodeSchema>
