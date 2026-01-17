"use client"

import { Trash2 } from "lucide-react"
import type { SubscriptionPlan } from "./subscriptions.types"

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan
  onDelete: (id: string) => void
  isHighlighted?: boolean
}

export function SubscriptionPlanCard({ plan, onDelete, isHighlighted = false }: SubscriptionPlanCardProps) {
  return (
    <div
      className={`rounded-lg p-6 flex flex-col gap-4 ${
        isHighlighted
          ? "bg-green-600 text-white border-2 border-green-600"
          : "bg-background border border-border text-foreground"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className={`text-lg font-semibold ${isHighlighted ? "text-white" : "text-foreground"}`}>{plan.name}</h3>
          <p className={`text-sm ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}>{plan.description}</p>
        </div>
        <button
          onClick={() => onDelete(plan.id)}
          className={`p-2 rounded transition-colors ${
            isHighlighted ? "hover:bg-green-700" : "hover:bg-destructive/10"
          }`}
        >
          <Trash2 className={`w-4 h-4 ${isHighlighted ? "text-white" : "text-destructive"}`} />
        </button>
      </div>

      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-bold ${isHighlighted ? "text-white" : "text-green-600"}`}>${plan.price}</span>
        <span className={`text-sm ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}>
          /{plan.billingPeriod}
        </span>
      </div>

      <div className="space-y-2">
        <p className={`text-sm font-medium ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}>Features:</p>
        <ul className="space-y-1">
          {plan.features.map((feature, idx) => (
            <li key={idx} className={`text-sm ${isHighlighted ? "text-white" : "text-foreground"}`}>
              • {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs mt-auto pt-4 border-t border-opacity-20 border-current">
        <div>
          <p className={`${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}>Active Subscribers</p>
          <p className={`font-semibold ${isHighlighted ? "text-white" : "text-foreground"}`}>
            {plan.activeSubscribers}
          </p>
        </div>
        <div>
          <p className={`${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}>Monthly Revenue</p>
          <p className={`font-semibold ${isHighlighted ? "text-white" : "text-foreground"}`}>${plan.monthlyRevenue}</p>
        </div>
      </div>
    </div>
  )
}
