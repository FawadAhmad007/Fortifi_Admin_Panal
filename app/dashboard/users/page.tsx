"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CryptoChart } from "@/components/crypto-chart"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Search,
  Users,
  UserPlus,
  UserCheck,
  UserX,
  TrendingUp,
  Calendar,
  Globe,
  Filter,
  RefreshCw,
  Eye,
} from "lucide-react"

// Mock user data
const mockUsers = Array.from({ length: 50 }).map((_, i) => ({
  id: `USER-${1000 + i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 5 === 0 ? "inactive" : "active",
  role: i % 10 === 0 ? "admin" : "user",
  country: ["United States", "United Kingdom", "Germany", "France", "Canada", "Japan", "Australia"][i % 7],
  registeredAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  lastLogin: new Date(Date.now() - i * 12 * 60 * 60 * 1000).toISOString(),
  avatar: `/placeholder.svg?height=40&width=40`,
}))

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("all")

  const itemsPerPage = 10

  // Filter users based on search term and status
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Paginate users
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // User growth chart data
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [120, 145, 132, 178, 205, 242],
        borderColor: "#A700E6",
        backgroundColor: "rgba(167, 0, 230, 0.1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  // User activity chart data
  const userActivityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Active Users",
        data: [1250, 1420, 1380, 1450, 1520, 1100, 980],
        borderColor: "#00E396",
        backgroundColor: "rgba(0, 227, 150, 0.1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  // User status distribution chart data
  const userStatusData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "User Status",
        data: [42, 8],
        backgroundColor: ["#00E396", "#FF3B5F"],
        borderWidth: 0,
      },
    ],
  }

  // User by country chart data
  const usersByCountryData = {
    labels: ["United States", "United Kingdom", "Germany", "France", "Canada", "Japan", "Australia"],
    datasets: [
      {
        label: "Users by Country",
        data: [28, 12, 8, 6, 5, 4, 3],
        backgroundColor: ["#A700E6", "#00E396", "#FEB019", "#FF3B5F", "#775DD0", "#3F51B5", "#03A9F4"],
        borderWidth: 0,
      },
    ],
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Analytics</h1>
            <p className="text-muted-foreground">Monitor and analyze user activity</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-secondary-600 text-primary-300 border-primary-700 px-3 py-1">
              <RefreshCw className="mr-1 h-3 w-3" />
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
              value="users"
              className={
                activeTab === "users"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              User List
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className={
                activeTab === "activity"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="crypto-card-primary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-primary-200" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1,248</div>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +12% from last month
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-success">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Active Users</CardTitle>
                  <UserCheck className="h-4 w-4 text-white/80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1,042</div>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-white/20 text-white hover:bg-white/30">83.5% of total users</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-warning">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">New Users</CardTitle>
                  <UserPlus className="h-4 w-4 text-white/80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">78</div>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-white/20 text-white hover:bg-white/30">Last 7 days</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-destructive">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Inactive Users</CardTitle>
                  <UserX className="h-4 w-4 text-white/80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">206</div>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-white/20 text-white hover:bg-white/30">16.5% of total users</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">User Growth</CardTitle>
                  <CardDescription className="text-gray-400">New user registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="line" height={300} data={userGrowthData} />
                </CardContent>
              </Card>

              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">Daily Active Users</CardTitle>
                  <CardDescription className="text-gray-400">User activity over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="area" height={300} data={userActivityData} />
                </CardContent>
              </Card>

              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">User Status</CardTitle>
                  <CardDescription className="text-gray-400">Distribution of active vs inactive users</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="doughnut" height={300} data={userStatusData} />
                </CardContent>
              </Card>

              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">Users by Country</CardTitle>
                  <CardDescription className="text-gray-400">Geographic distribution of users</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="pie" height={300} data={usersByCountryData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription className="text-gray-400">View and manage all registered users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search by name, email, or ID..."
                      className="w-full pl-8 bg-secondary-500 border-white/10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      className="bg-secondary-500 border-white/10 rounded-md px-3 py-2 text-sm"
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value)
                        setCurrentPage(1) // Reset to first page when filter changes
                      }}
                    >
                      <option value="all">All Users</option>
                      <option value="active">Active Users</option>
                      <option value="inactive">Inactive Users</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-lg glass-effect overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Registered
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedUsers.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                              No users found matching your search.
                            </td>
                          </tr>
                        ) : (
                          paginatedUsers.map((user) => (
                            <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="bg-primary-900 text-primary-200">
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-white">{user.name}</p>
                                    <p className="text-sm text-gray-400">{user.email}</p>
                                    <p className="text-xs text-gray-500">{user.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <Badge
                                  className={
                                    user.status === "active" ? "bg-success text-white" : "bg-destructive text-white"
                                  }
                                >
                                  {user.status === "active" ? "Active" : "Inactive"}
                                </Badge>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <Badge variant="outline" className="border-white/20 text-gray-300">
                                  {user.role === "admin" ? "Admin" : "User"}
                                </Badge>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Globe className="h-3 w-3 mr-1 text-gray-400" />
                                  <span className="text-gray-300">{user.country}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                                  <span className="text-gray-300">
                                    {new Date(user.registeredAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-gray-400 hover:text-white hover:bg-white/10"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View details</span>
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>

                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNumber: number

                        // Logic to show pages around current page
                        if (totalPages <= 5) {
                          pageNumber = i + 1
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i
                        } else {
                          pageNumber = currentPage - 2 + i
                        }

                        // Show ellipsis for large page counts
                        if (totalPages > 5) {
                          if (i === 0 && currentPage > 3) {
                            return (
                              <PaginationItem key="start">
                                <PaginationLink
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage(1)
                                  }}
                                >
                                  1
                                </PaginationLink>
                              </PaginationItem>
                            )
                          }

                          if (i === 1 && currentPage > 3) {
                            return (
                              <PaginationItem key="ellipsis-start">
                                <PaginationEllipsis />
                              </PaginationItem>
                            )
                          }

                          if (i === 3 && currentPage < totalPages - 2) {
                            return (
                              <PaginationItem key="ellipsis-end">
                                <PaginationEllipsis />
                              </PaginationItem>
                            )
                          }

                          if (i === 4 && currentPage < totalPages - 2) {
                            return (
                              <PaginationItem key="end">
                                <PaginationLink
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage(totalPages)
                                  }}
                                >
                                  {totalPages}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          }
                        }

                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              isActive={currentPage === pageNumber}
                              onClick={(e) => {
                                e.preventDefault()
                                setCurrentPage(pageNumber)
                              }}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">User Activity</CardTitle>
                <CardDescription className="text-gray-400">Recent user activity and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Activity Overview</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Daily Active Users</span>
                        <span className="text-white font-medium">1,245</span>
                      </div>
                      <div className="w-full bg-secondary-500 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Monthly Active Users</span>
                        <span className="text-white font-medium">3,872</span>
                      </div>
                      <div className="w-full bg-secondary-500 rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Average Session Duration</span>
                        <span className="text-white font-medium">12m 34s</span>
                      </div>
                      <div className="w-full bg-secondary-500 rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Bounce Rate</span>
                        <span className="text-white font-medium">24.8%</span>
                      </div>
                      <div className="w-full bg-secondary-500 rounded-full h-2">
                        <div className="bg-destructive h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">User Engagement</h3>
                    <CryptoChart
                      type="bar"
                      height={240}
                      data={{
                        labels: ["Login", "Profile View", "Settings", "Transactions", "Support", "Logout"],
                        datasets: [
                          {
                            label: "Page Views",
                            data: [4250, 3120, 1890, 5430, 2100, 3650],
                            backgroundColor: "#A700E6",
                            borderWidth: 0,
                          },
                        ],
                      }}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg glass-effect">
                        <Avatar className="mt-1">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback className="bg-primary-900 text-primary-200">{`U${i + 1}`}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium text-white">User {i + 1}</p>
                            <span className="text-xs text-gray-400">
                              {new Date(Date.now() - i * 30 * 60 * 1000).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">
                            {
                              [
                                "Logged in from a new device",
                                "Updated profile information",
                                "Completed KYC verification",
                                "Changed account settings",
                                "Viewed market data",
                              ][i]
                            }
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

