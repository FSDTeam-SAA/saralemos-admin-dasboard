"use client"

import { TrendingUp, Users, DollarSign, Zap } from "lucide-react"
import type { RevenueMetrics as MetricsType } from "./subscriptions.types"

interface RevenueMetricsProps {
  metrics: MetricsType
}

export function RevenueMetricsComponent({ metrics }: RevenueMetricsProps) {
  const metricCards = [
    {
      label: "Total MRR",
      value: `$${metrics.mrr.toLocaleString()}`,
      change: `+${metrics.mrrChange.toFixed(1)}% this month`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "ARPU",
      value: `$${metrics.arpu.toFixed(2)}`,
      change: "Avg per premium user",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      label: "LTV",
      value: `$${metrics.ltv.toLocaleString()}`,
      change: "Customer lifetime value",
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: "CAC Ratio",
      value: `${metrics.cacRatio.toFixed(2)}x`,
      change: "LTV/CAC healthy",
      icon: Zap,
      color: "text-amber-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards.map((metric) => {
        const Icon = metric.icon
        return (
          <div key={metric.label} className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold text-foreground mt-2">{metric.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
              </div>
              <div className={`${metric.color} bg-opacity-10 p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
