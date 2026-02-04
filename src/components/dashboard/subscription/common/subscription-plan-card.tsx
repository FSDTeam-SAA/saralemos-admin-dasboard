"use client";

import {
  Trash2,
  Users,
  TrendingUp,
  RefreshCw,
  BarChart3,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { SubscriptionPlan } from "./subscriptions.types";
import { PlanAnalyticsData } from "@/lib/types/subscription";
import { motion, AnimatePresence } from "framer-motion";

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  onDelete: (id: string) => void;
  isHighlighted?: boolean;
  seeDetail: (id: string) => void;
  selectedId: string;
  singleplan: PlanAnalyticsData;
}

export function SubscriptionPlanCard({
  plan,
  onDelete,
  isHighlighted = true,
  seeDetail,
  selectedId,
  singleplan,
}: SubscriptionPlanCardProps) {
  const isSelected = selectedId === plan._id;

  return (
    <motion.div
      layout
      onClick={() => seeDetail(plan._id)}
      className={`rounded-xl p-6 flex flex-col gap-4 transition-all duration-300 cursor-pointer overflow-hidden ${
        isHighlighted
          ? "bg-[#65A30D] text-white shadow-lg ring-2 ring-[#65A30D] ring-offset-2"
          : "bg-white border border-border text-foreground hover:border-[#65A30D]/50 shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={`text-xl font-bold ${isHighlighted ? "text-white" : "text-foreground"}`}
            >
              {plan.name}
            </h3>
            {isSelected ? (
              <ChevronUp
                className={`w-4 h-4 ${isHighlighted ? "text-white" : "text-[#65A30D]"}`}
              />
            ) : (
              <ChevronDown
                className={`w-4 h-4 ${isHighlighted ? "text-white/70" : "text-muted-foreground"}`}
              />
            )}
          </div>
          <p
            className={`text-sm mt-1 leading-relaxed ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}
          >
            {plan.description}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(plan._id);
          }}
          className={`p-2 rounded-full transition-colors ${
            isHighlighted ? "hover:bg-green-700/50" : "hover:bg-destructive/10"
          }`}
        >
          <Trash2
            className={`w-4 h-4 ${isHighlighted ? "text-white" : "text-destructive"}`}
          />
        </button>
      </div>

      <div className="flex items-baseline gap-1">
        <span
          className={`text-4xl font-black ${isHighlighted ? "text-white" : "text-[#65A30D]"}`}
        >
          ${plan.price}
        </span>
        <span
          className={`text-sm font-medium ${isHighlighted ? "text-green-50/80" : "text-muted-foreground"}`}
        >
          /{plan.billingCycle}
        </span>
      </div>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-opacity-20 border-current pt-4 space-y-6"
          >
            {/* Analytics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {singleplan.activeUsers && ( <div
                className={`p-3 rounded-lg ${isHighlighted ? "bg-white/10" : "bg-gray-50 border border-gray-100"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Users
                    size={14}
                    className={
                      isHighlighted ? "text-green-50" : "text-[#65A30D]"
                    }
                  />
                  <span
                    className={`text-[10px] font-bold uppercase tracking-tighter ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}
                  >
                    Active Users
                  </span>
                </div>
                <p
                  className={`text-lg font-black ${isHighlighted ? "text-white" : "text-foreground"}`}
                >
                  {singleplan.activeUsers.toLocaleString()}
                </p>
              </div>)

              }
             
             {singleplan.monthlyRevenue &&( <div
                className={`p-3 rounded-lg ${isHighlighted ? "bg-white/10" : "bg-gray-50 border border-gray-100"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp
                    size={14}
                    className={
                      isHighlighted ? "text-green-50" : "text-[#65A30D]"
                    }
                  />
                  <span
                    className={`text-[10px] font-bold uppercase tracking-tighter ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}
                  >
                    Revenue (MRR)
                  </span>
                </div>
                <p
                  className={`text-lg font-black ${isHighlighted ? "text-white" : "text-foreground"}`}
                >
                  ${singleplan.monthlyRevenue.amount.toLocaleString()}
                </p>
              </div>)

             }
              
              {singleplan.churnRate &&( <div
                className={`p-3 rounded-lg ${isHighlighted ? "bg-white/10" : "bg-gray-50 border border-gray-100"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3
                    size={14}
                    className={
                      isHighlighted ? "text-green-50" : "text-[#65A30D]"
                    }
                  />
                  <span
                    className={`text-[10px] font-bold uppercase tracking-tighter ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}
                  >
                    Churn Rate
                  </span>
                </div>
                <p
                  className={`text-lg font-black ${isHighlighted ? "text-white" : "text-foreground"}`}
                >
                  {singleplan.churnRate.percentage}%
                </p>
              </div>)

              }

             
            {singleplan.retentionRate &&(
  <div
                className={`p-3 rounded-lg ${isHighlighted ? "bg-white/10" : "bg-gray-50 border border-gray-100"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <RefreshCw
                    size={14}
                    className={
                      isHighlighted ? "text-green-50" : "text-[#65A30D]"
                    }
                  />
                  <span
                    className={`text-[10px] font-bold uppercase tracking-tighter ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}
                  >
                    Retention
                  </span>
                </div>
                <p
                  className={`text-lg font-black ${isHighlighted ? "text-white" : "text-foreground"}`}
                >
                  {singleplan.retentionRate.percentage}%
                </p>
              </div>
            )

            }

            
            </div>
            <div
              className={`p-3 rounded-lg ${isHighlighted ? "bg-white/10" : "bg-gray-50 border border-gray-100"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {/* <RefreshCw
                  size={14}
                  className={isHighlighted ? "text-green-50" : "text-[#65A30D]"}
                /> */}
                <span
                  className={`text-[10px] font-bold uppercase tracking-tighter ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}
                >
                  AllowedListings
                </span>
              </div>
              <p
                className={`text-lg font-black ${isHighlighted ? "text-white" : "text-foreground"}`}
              >
                {plan.allowedListings}
              </p>
            </div>

            {/* All-time Stats */}
            {
              singleplan.additionalMetrics && (     <div
              className={`p-4 rounded-lg flex items-center justify-between ${isHighlighted ? "bg-white/20" : "bg-[#65A30D]/5 border border-[#65A30D]/10"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${isHighlighted ? "bg-white/20" : "bg-[#65A30D]/10"}`}
                >
                  <DollarSign
                    size={20}
                    className={isHighlighted ? "text-white" : "text-[#65A30D]"}
                  />
                </div>
                <div>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-tighter ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}
                  >
                    All-time Revenue
                  </p>
                  <p
                    className={`text-xl font-black ${isHighlighted ? "text-white" : "text-foreground"}`}
                  >
                    $
                    {singleplan.additionalMetrics.allTimeRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-[10px] font-bold uppercase tracking-tighter ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}
                >
                  Total Payments
                </p>
                <p
                  className={`text-lg font-bold ${isHighlighted ? "text-white" : "text-foreground"}`}
                >
                  {singleplan.additionalMetrics.totalPayments}
                </p>
              </div>
            </div>)
            }
       

            {/* Features Section */}
            <div className="space-y-3">
              <p
                className={`text-sm font-bold uppercase tracking-wider ${isHighlighted ? "text-green-50" : "text-muted-foreground"}`}
              >
                Key Features
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span
                      className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${isHighlighted ? "bg-white" : "bg-[#65A30D]"}`}
                    />
                    <span
                      className={
                        isHighlighted ? "text-white" : "text-foreground"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
