"use client"


import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Users, TrendingUp, DollarSign, Package } from "lucide-react"
import { DashboardStats } from "@/types/user"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { DashboardData, MonthlyRevenue, UserAnalyticsDataPoint } from "@/lib/types/overall"


interface DashboardPresenterProps {
  stats: DashboardStats | null
  isLoading: boolean
  error: string | null
  data:DashboardData;
  analytics:UserAnalyticsDataPoint[];
  revenueAnalytics:MonthlyRevenue[]
}



const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function DashboardPresenter({ stats, isLoading, error,data,analytics,revenueAnalytics }: DashboardPresenterProps) {
  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading dashboard...</div>
  }

  if (error) {
    return <div className="bg-destructive/10 text-destructive p-4 rounded-lg">Error: {error}</div>
  }

  console.log('data',data)
  console.log('analytics',analytics)



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
                <p className="text-2xl font-bold text-primary">{data?.activeSubscriptions ? data?.activeSubscriptions : 0}</p>
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
                <p className="text-2xl font-bold text-primary">${data?.monthlyRevenue?.amount || 0}</p>
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
                <p className="text-2xl font-bold text-primary">{data?.totalListings || 0}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Users Analytics</h3>
            <p className="text-xs text-muted-foreground">March, 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics}>
                <defs>
                  <linearGradient id="colorUserCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6BA814" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6BA814" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)" 
                  tickFormatter={(value) => MONTHS[value - 1] || value}
                />
                <YAxis stroke="var(--color-muted-foreground)" domain={[0, 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: "var(--color-card)" }} />
                <Area 
                  type="monotone" 
                  dataKey="userCount" 
                  stroke="#6BA814" 
                  fillOpacity={1} 
                  fill="url(#colorUserCount)" 
                  strokeWidth={2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold">Revenue Trend</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--color-card)" }} />
                <Bar dataKey="amount" fill="#6BA814" />
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
