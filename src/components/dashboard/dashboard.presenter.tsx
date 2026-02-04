"use client"


import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, TrendingUp, DollarSign, Package, Info, Calendar } from "lucide-react"
import { DashboardStats } from "@/types/user"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { DashboardData, UserAnalyticsDataPoint, RevenueTrendDataPoint } from "@/lib/types/overall"
import { User } from "@/lib/types/users"


interface DashboardPresenterProps {
  stats: DashboardStats | null
  isLoading: boolean
  error: string | null
  data: DashboardData | undefined;
  analytics: UserAnalyticsDataPoint[];
  revenueAnalytics: RevenueTrendDataPoint[];
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
  // Normalize data to ensure all 12 months are represented
  const chartData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const existingData = analytics.find((d) => d.month === month);
    return existingData || { month, userCount: 0 };
  });

//   const normalizedAnalytics = analytics?.map(item => ({
//   ...item,
//   date: new Date(item.date),
// }));


  const normalizedRevenueData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const existingData = revenueAnalytics.find((d) => d.month === month);
    return {
      month,
      totalRevenue: existingData ? existingData.totalRevenue : 0,
    };
  });

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
        <Card className="shadow-xs border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-zinc-800">Usage Analytics</h3>
              <div className="p-1 rounded-full hover:bg-zinc-100 cursor-pointer transition-colors">
                <Info className="w-5 h-5 text-zinc-400" />
              </div>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
            {new Date(analytics?.[0]?.date).toLocaleString("en-US", {
                 month: "long",
                 year: "numeric",
            })}
              <Calendar className="w-4 h-4 text-[#6BA814]" />
            </button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6BA814" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6BA814" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#F1F1F1" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717A', fontSize: 12 }}
                  dy={10}
                  tickFormatter={(value) => MONTHS[value - 1]}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717A', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                  domain={[0, 'auto']}
                  tickCount={5}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "white", 
                    borderRadius: '8px',
                    border: '1px solid #E4E4E7',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                  }} 
                  formatter={(value) => [`${value}`, 'Users']}
                  labelFormatter={(label) => MONTHS[label - 1]}
                /> 
                <Area 
                  type="monotone" 
                  dataKey="userCount" 
                  stroke="#6BA814" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorUsage)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-zinc-800">Revenue Trend</h3>
              <div className="p-1 rounded-full hover:bg-zinc-100 cursor-pointer transition-colors">
                <Info className="w-5 h-5 text-zinc-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={normalizedRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#F1F1F1" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717A', fontSize: 12 }}
                  dy={10}
                  tickFormatter={(value) => MONTHS[value - 1]}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717A', fontSize: 12 }}
                  tickFormatter={(value) => `${value}`}
                  domain={[0, 'auto']}
                  tickCount={5}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    backgroundColor: "white", 
                    borderRadius: '8px',
                    border: '1px solid #E4E4E7',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                  }} 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  labelFormatter={(label) => MONTHS[label - 1]}
                />
                <Bar 
                  dataKey="totalRevenue" 
                  fill="#6BA814" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                />
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
