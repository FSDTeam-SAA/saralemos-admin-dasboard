"use client";

import { TrendingUp, Users, DollarSign, Zap } from "lucide-react";
import { PaymentMetricsData } from "@/lib/types/subscription";

interface RevenueMetricsProps {
  revenuemetricsData?: PaymentMetricsData;
}

export function RevenueMetricsComponent({
  revenuemetricsData,
}: RevenueMetricsProps) {
  if (!revenuemetricsData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-border rounded-xl p-5 h-[120px]" />
        ))}
      </div>
    );
  }
console.log('revienew',revenuemetricsData)
  const metricCards = [
    {
      label: "MRR",
      value: `$${revenuemetricsData?.MRR?.value.toLocaleString() || 0}`,
      
      change: revenuemetricsData?.MRR?.description,
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      label: "ARPU",
      value: `$${revenuemetricsData?.ARPU?.value.toLocaleString() || 0}`,
      change: revenuemetricsData?.ARPU?.description,
      icon: Users,
      color: "text-[#65A30D]",
    },
    {
      label: "LTV",
      value: `$${revenuemetricsData?.LTV?.value.toLocaleString() || 0}`,
      change: revenuemetricsData?.LTV?.description,
      icon: DollarSign,
      color: "text-amber-600",
    },
    {
      label: "CAC Ratio",
      value: `${revenuemetricsData?.CAC?.value || 0}`,
      change: revenuemetricsData?.CAC?.note,
      icon: Zap,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards.map((metric) => {
console.log('dis',metric.change)
        return (
          <div
            key={metric.label}
            className="bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </p>
                <p className="text-2xl text-primary font-black  mt-2">
                  {metric.value ? metric.value : 0}
                </p>
                <p className="text-[12px] font-medium text-[#4A5565] mt-1 ">
                  {metric.change}
                </p>
              </div>
              {/* <div className={`${metric.color} bg-current bg-opacity-10 p-2.5 rounded-xl`}>
                <Icon className="w-5 h-5" />
              </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
