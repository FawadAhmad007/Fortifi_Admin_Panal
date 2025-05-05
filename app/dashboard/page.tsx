"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CryptoChart } from "@/components/crypto-chart"
import { kycData, newsData, kycAnalyticsData } from "@/lib/data"
import { Users, CheckCircle, XCircle, Clock, TrendingUp, ArrowRight, Eye, Calendar } from "lucide-react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Filter recent KYC submissions (pending)
  const recentKyc = kycData
    .filter((kyc) => kyc.status === "pending")
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 4)

  // Filter featured news
  const featuredNews = newsData
    .filter((news) => news.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3)

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

  // Bitcoin price chart data
  const bitcoinPriceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: [42000, 38000, 41000, 45000, 52000, 58000],
        borderColor: "#FEB019",
        backgroundColor: "rgba(254, 176, 25, 0.1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to your admin panel</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-secondary-600 text-primary-300 border-primary-700 px-3 py-1">
              <Clock className="mr-1 h-3 w-3" />
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
            <button className="px-4 py-2 border border-white/10 rounded-md text-sm font-medium text-white hover:bg-white/5">
              Refresh
            </button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="bg-secondary-600 p-1">
              <TabsTrigger
                value="overview"
                className={
                  activeTab === "overview"
                    ? "bg-primary text-white data-[state=active]:bg-primary"
                    : "text-gray-400 hover:text-white"
                }
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className={
                  activeTab === "analytics"
                    ? "bg-primary text-white data-[state=active]:bg-primary"
                    : "text-gray-400 hover:text-white"
                }
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="market"
                className={
                  activeTab === "market"
                    ? "bg-primary text-white data-[state=active]:bg-primary"
                    : "text-gray-400 hover:text-white"
                }
              >
                Market
              </TabsTrigger>
            </TabsList>

            <div className="hidden md:block">
              <a
                href="/dashboard/analytics"
                className="inline-flex items-center text-primary-300 hover:text-primary-200 hover:underline"
              >
                View Full Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="crypto-card-primary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total KYC Submissions</CardTitle>
                  <Users className="h-4 w-4 text-primary-200" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{kycAnalyticsData.totalSubmissions}</div>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +14% from last month
                    </Badge>
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
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      {kycAnalyticsData.approvalRate}% approval rate
                    </Badge>
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
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      {((kycAnalyticsData.pending / kycAnalyticsData.totalSubmissions) * 100).toFixed(1)}% of total
                    </Badge>
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
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      {((kycAnalyticsData.rejected / kycAnalyticsData.totalSubmissions) * 100).toFixed(1)}% rejection
                      rate
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">Recent KYC Submissions</CardTitle>
                  <CardDescription className="text-gray-400">Latest KYC submissions requiring review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentKyc.map((kyc) => (
                      <div key={kyc.id} className="flex items-center justify-between rounded-lg glass-effect p-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={kyc.avatar} alt={kyc.name} />
                            <AvatarFallback className="bg-primary-900 text-primary-200">
                              {kyc.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none text-white">{kyc.name}</p>
                            <p className="text-xs text-gray-400">
                              {kyc.documentType} • {kyc.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-amber-500 text-amber-500">
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </Badge>
                          <a
                            href={`/dashboard/kyc/${kyc.id}`}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-center">
                    <a
                      href="/dashboard/kyc"
                      className="inline-flex items-center justify-center px-4 py-2 border border-white/10 rounded-md text-sm font-medium text-white hover:bg-white/5"
                    >
                      View All KYC Submissions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3 crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">Featured News</CardTitle>
                  <CardDescription className="text-gray-400">Latest featured news articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredNews.map((news) => (
                      <div key={news.id} className="rounded-lg glass-effect overflow-hidden">
                        <div className="relative h-32 w-full">
                          <Image
                            src={news.imageUrl || "/placeholder.svg?height=300&width=500"}
                            alt={news.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-3">
                            <Badge className="bg-primary-600 hover:bg-primary-500 text-white">{news.category}</Badge>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-white line-clamp-1">{news.title}</h3>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{news.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center text-xs text-gray-400">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(news.publishedAt).toLocaleDateString()}
                            </div>
                            <a
                              href={`/dashboard/news/${news.id}`}
                              className="inline-flex items-center px-2 py-1 text-xs text-primary-300 hover:text-primary-200 hover:underline"
                            >
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-center">
                    <a
                      href="/dashboard/news"
                      className="inline-flex items-center justify-center px-4 py-2 border border-white/10 rounded-md text-sm font-medium text-white hover:bg-white/5"
                    >
                      View All News
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
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
            </div>

            <div className="flex justify-center">
              <a
                href="/dashboard/analytics"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary/90 rounded-md text-sm font-medium text-white"
              >
                View Full Analytics Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Bitcoin Price Trend</CardTitle>
                <CardDescription className="text-gray-400">BTC price over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <CryptoChart type="line" height={300} data={bitcoinPriceData} />
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <a
                href="/dashboard/market"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary/90 rounded-md text-sm font-medium text-white"
              >
                View Full Market Data
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

