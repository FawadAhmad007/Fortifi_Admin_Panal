"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { kycData, type KycStatus } from "@/lib/data"
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function KycPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const router = useRouter()

  // Filter KYC records based on search term and status filter
  const filteredKyc = kycData.filter((kyc) => {
    const matchesSearch =
      kyc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kyc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kyc.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || kyc.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Paginate KYC records
  const totalPages = Math.ceil(filteredKyc.length / itemsPerPage)
  const paginatedKyc = filteredKyc.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Status badge component
  const StatusBadge = ({ status }: { status: KycStatus }) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-success hover:bg-success/80 text-white">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-warning text-warning">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">KYC Management</h1>
          <p className="text-muted-foreground">Review and manage KYC submissions</p>
        </div>

        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="text-white">KYC Submissions</CardTitle>
            <CardDescription className="text-gray-400">View and manage all KYC submissions from users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search by name, email, or ID..."
                    className="w-full pl-8 bg-secondary-500 border-white/10"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1) // Reset to first page when search changes
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => {
                      setStatusFilter(value)
                      setCurrentPage(1) // Reset to first page when filter changes
                    }}
                  >
                    <SelectTrigger className="w-[180px] bg-secondary-500 border-white/10">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary-500 border-white/10">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-lg glass-effect overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-white/10 hover:bg-transparent">
                      <TableHead className="text-gray-400">User</TableHead>
                      <TableHead className="text-gray-400">Document</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Submitted</TableHead>
                      <TableHead className="text-right text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedKyc.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-gray-400">
                          No KYC submissions found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedKyc.map((kyc) => (
                        <TableRow key={kyc.id} className="border-b border-white/10 hover:bg-white/5">
                          <TableCell>
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
                              <div>
                                <p className="font-medium text-white">{kyc.name}</p>
                                <p className="text-sm text-gray-400">{kyc.email}</p>
                                <p className="text-xs text-gray-500">{kyc.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{kyc.documentType}</p>
                              <p className="text-sm text-gray-400">{kyc.documentId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={kyc.status} />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{new Date(kyc.submittedAt).toLocaleDateString()}</p>
                              <p className="text-xs text-gray-400">{new Date(kyc.submittedAt).toLocaleTimeString()}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/dashboard/kyc/${kyc.id}`)}
                              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md ${
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>

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
                            <button
                              key="start"
                              onClick={() => setCurrentPage(1)}
                              className="h-9 w-9 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/10"
                            >
                              1
                            </button>
                          )
                        }

                        if (i === 1 && currentPage > 3) {
                          return (
                            <span key="ellipsis-start" className="flex h-9 w-9 items-center justify-center">
                              <MoreHorizontal className="h-4 w-4" />
                            </span>
                          )
                        }

                        if (i === 3 && currentPage < totalPages - 2) {
                          return (
                            <span key="ellipsis-end" className="flex h-9 w-9 items-center justify-center">
                              <MoreHorizontal className="h-4 w-4" />
                            </span>
                          )
                        }

                        if (i === 4 && currentPage < totalPages - 2) {
                          return (
                            <button
                              key="end"
                              onClick={() => setCurrentPage(totalPages)}
                              className="h-9 w-9 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/10"
                            >
                              {totalPages}
                            </button>
                          )
                        }
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`h-9 w-9 flex items-center justify-center rounded-md ${
                            currentPage === pageNumber
                              ? "bg-primary text-white"
                              : "text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    })}

                    <button
                      onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md ${
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

