"use client"


import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, TrendingUp, DollarSign, Package } from "lucide-react"
import { DashboardStats } from "@/types/user"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { DashboardData } from "@/lib/types/overall"


interface DashboardPresenterProps {
  stats: DashboardStats | null
  isLoading: boolean
  error: string | null
  data:DashboardData;
}

const usageData = [
  { month: "Jan", value: 60 },
  { month: "Feb", value: 80 },
  { month: "Mar", value: 120 },
  { month: "Apr", value: 100 },
  { month: "May", value: 150 },
  { month: "June", value: 180 },
  { month: "Jul", value: 160 },
  { month: "Aug", value: 140 },
  { month: "Sep", value: 100 },
  { month: "Oct", value: 120 },
  { month: "Nov", value: 110 },
  { month: "Dec", value: 130 },
]

const revenueData = [
  { month: "Jan", revenue: 10000 },
  { month: "Feb", revenue: 12000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 18000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 28000 },
]

export function DashboardPresenter({ stats, isLoading, error,data }: DashboardPresenterProps) {
  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading dashboard...</div>
  }

  if (error) {
    return <div className="bg-destructive/10 text-destructive p-4 rounded-lg">Error: {error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-primary">{data?.totalUsers || 248}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                <p className="text-2xl font-bold text-primary">{data?.activeSubscriptions || 92}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-primary">${data?.monthlyRevenue?.amount || 20300}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Listings Processed</p>
                <p className="text-2xl font-bold text-primary">{stats?.listingsProcessed || 85}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Usage Analytics</h3>
            <p className="text-xs text-muted-foreground">March, 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--color-card)" }} />
                <Line type="monotone" dataKey="value" stroke="#6BA814" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold">Revenue Trend</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--color-card)" }} />
                <Bar dataKey="revenue" fill="#6BA814" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Recent Activity</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: "Sarah Johnson", action: "New user registered", time: "5 minutes ago" },
              { user: "John Doe", action: "Upgraded to Premium", time: "23 minutes ago" },
              { user: "52ft Sunseeker", action: "New listing Added", time: "1 hour ago" },
            ].map((activity, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-sm">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
