"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CryptoChart } from "@/components/crypto-chart"
import { kycAnalyticsData } from "@/lib/data"
import { Calendar, ArrowUpDown, Users, CheckCircle, XCircle, Clock } from "lucide-react"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("kyc")

  // KYC submissions by day chart data
  const kycSubmissionsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "KYC Submissions",
        data: kycAnalyticsData.submissionsByDay,
        borderColor: "#A700E6",
        backgroundColor: "rgba(167, 0, 230, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  // KYC status distribution chart data
  const kycStatusData = {
    labels: ["Approved", "Rejected", "Pending"],
    datasets: [
      {
        label: "KYC Status",
        data: [kycAnalyticsData.approved, kycAnalyticsData.rejected, kycAnalyticsData.pending],
        backgroundColor: ["#00E396", "#FF3B5F", "#FEB019"],
        borderWidth: 0,
      },
    ],
  }

  // Processing time chart data
  const processingTimeData = {
    labels: ["0-4h", "4-8h", "8-12h", "12-24h", "24h+"],
    datasets: [
      {
        label: "Processing Time",
        data: [15, 25, 30, 18, 12],
        backgroundColor: "#A700E6",
        borderWidth: 0,
      },
    ],
  }

  // Submissions by country chart data
  const submissionsByCountryData = {
    labels: kycAnalyticsData.submissionsByCountry.map((item) => item.country),
    datasets: [
      {
        label: "Submissions by Country",
        data: kycAnalyticsData.submissionsByCountry.map((item) => item.count),
        backgroundColor: ["#A700E6", "#00E396", "#FEB019", "#FF3B5F", "#775DD0", "#3F51B5"],
        borderWidth: 0,
      },
    ],
  }

  // Approval rate over time chart data
  const approvalRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Approval Rate",
        data: [65, 68, 62, 70, 75, 69.5],
        borderColor: "#00E396",
        backgroundColor: "rgba(0, 227, 150, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  // Rejection reasons chart data
  const rejectionReasonsData = {
    labels: ["Invalid Document", "Expired ID", "Poor Quality", "Mismatch Info", "Other"],
    datasets: [
      {
        label: "Rejection Reasons",
        data: [35, 25, 20, 15, 5],
        backgroundColor: "#FF3B5F",
        borderWidth: 0,
      },
    ],
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Detailed analytics and insights</p>
        </div>

        <Tabs defaultValue="kyc" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary-600 p-1">
            <TabsTrigger
              value="kyc"
              className={
                activeTab === "kyc"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              KYC Analytics
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className={
                activeTab === "users"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              User Analytics
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className={
                activeTab === "performance"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kyc" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="crypto-card-primary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total KYC Submissions</CardTitle>
                  <Users className="h-4 w-4 text-primary-200" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{kycAnalyticsData.totalSubmissions}</div>
                  <div className="flex items-center mt-1">
                    <ArrowUpDown className="mr-1 h-3 w-3 text-primary-200" />
                    <span className="text-xs text-primary-200">+14% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-success">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Approved KYC</CardTitle>
                  <CheckCircle className="h-4 w-4 text-white/80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{kycAnalyticsData.approved}</div>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-white/80">{kycAnalyticsData.approvalRate}% approval rate</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-warning">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Pending KYC</CardTitle>
                  <Clock className="h-4 w-4 text-white/80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{kycAnalyticsData.pending}</div>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-white/80">
                      {((kycAnalyticsData.pending / kycAnalyticsData.totalSubmissions) * 100).toFixed(1)}% of total
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-destructive">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Rejected KYC</CardTitle>
                  <XCircle className="h-4 w-4 text-white/80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{kycAnalyticsData.rejected}</div>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-white/80">
                      {((kycAnalyticsData.rejected / kycAnalyticsData.totalSubmissions) * 100).toFixed(1)}% rejection
                      rate
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">KYC Submissions Trend</CardTitle>
                  <CardDescription className="text-gray-400">Daily submissions over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="line" height={300} data={kycSubmissionsData} />
                </CardContent>
              </Card>

              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">KYC Status Distribution</CardTitle>
                  <CardDescription className="text-gray-400">Breakdown of KYC statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="doughnut" height={300} data={kycStatusData} />
                </CardContent>
              </Card>

              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">Processing Time</CardTitle>
                  <CardDescription className="text-gray-400">Average time to process KYC submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="bar" height={300} data={processingTimeData} />
                </CardContent>
              </Card>

              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">Submissions by Country</CardTitle>
                  <CardDescription className="text-gray-400">
                    Geographic distribution of KYC submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="pie" height={300} data={submissionsByCountryData} />
                </CardContent>
              </Card>

              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">Approval Rate Over Time</CardTitle>
                  <CardDescription className="text-gray-400">Monthly approval rate trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="area" height={300} data={approvalRateData} />
                </CardContent>
              </Card>

              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">Rejection Reasons</CardTitle>
                  <CardDescription className="text-gray-400">Common reasons for KYC rejection</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="bar" height={300} data={rejectionReasonsData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">User Analytics</CardTitle>
                <CardDescription className="text-gray-400">User growth and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-white">Coming Soon</p>
                  <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">
                    User analytics dashboard is currently under development and will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Performance Analytics</CardTitle>
                <CardDescription className="text-gray-400">System performance and metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-white">Coming Soon</p>
                  <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">
                    Performance analytics dashboard is currently under development and will be available in the next
                    update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

