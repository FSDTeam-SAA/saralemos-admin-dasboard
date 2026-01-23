"use client"


import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts"
import { Users, TrendingUp, DollarSign, Package } from "lucide-react"
import { DashboardStats } from "@/types/user"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { DashboardData, MonthlyRevenue, UserAnalyticsDataPoint } from "@/lib/types/overall"
import { User } from "@/lib/types/users"


interface DashboardPresenterProps {
  stats: DashboardStats | null
  isLoading: boolean
  error: string | null
  data: DashboardData | undefined;
  analytics: UserAnalyticsDataPoint[];
  revenueAnalytics: MonthlyRevenue[];
  userData: User[]
}



const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function DashboardPresenter({ stats, isLoading, error,data,analytics,revenueAnalytics,userData }: DashboardPresenterProps) {
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
              <LineChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)" 
                  tickFormatter={(value) => MONTHS[value - 1] || value}
                />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--color-card)" }} />
                <Line type="monotone" dataKey="userCount" stroke="#6BA814" strokeWidth={2} />
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
              <BarChart data={revenueAnalytics} margin={{ bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6BA814" 
                  tick={{ fill: '#6BA814' }}
                >
                  <Label value="Month" position="insideBottom" offset={-15} fill="#6BA814" />
                </XAxis>
                <YAxis 
                  stroke="#6BA814" 
                  tick={{ fill: '#6BA814' }}
                >
                  <Label value="Amount" angle={-90} position="insideLeft" offset={0} style={{ textAnchor: 'middle' }} fill="#6BA814" />
                </YAxis>
                <Tooltip contentStyle={{ backgroundColor: "var(--color-card)" }} />
                <Bar dataKey="amount" fill="#6BA814" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Recent Registered Users</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.length > 0 ? (
              userData.slice(0, 5).map((user, i) => (
                <div key={user._id || i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{user.fullName || user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent registered users</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
