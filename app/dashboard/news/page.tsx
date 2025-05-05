"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash, Eye, Calendar, User, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { newsData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()
  const itemsPerPage = 6

  // Filter news based on search term
  const filteredNews = newsData.filter(
    (news) =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate news
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">News Management</h1>
            <p className="text-muted-foreground">Create and manage news articles</p>
          </div>
            <Button className="bg-primary hover:bg-primary/90"
            
            onClick={() => router.push("/dashboard/news/create")}>
              <Plus className="mr-2 h-4 w-4" />
              Create News
            </Button>
        </div>

        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="text-white">News Articles</CardTitle>
            <CardDescription className="text-gray-400">View and manage all news articles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by title, ID or category..."
                  className="w-full pl-8 bg-secondary-500 border-white/10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1) // Reset to first page when search changes
                  }}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedNews.length === 0 ? (
                  <div className="md:col-span-2 lg:col-span-3 text-center py-12 text-gray-400">
                    No news articles found.
                  </div>
                ) : (
                  paginatedNews.map((news) => (
                    <Card
                      key={news.id}
                      className="overflow-hidden bg-secondary-600 border-white/10 hover:border-primary/50 transition-all"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={news.imageUrl || "/placeholder.svg?height=300&width=500"}
                          alt={news.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute top-2 left-2">
                          <Badge
                            className={`${news.featured ? "bg-primary" : "bg-secondary-500"} hover:${news.featured ? "bg-primary/90" : "bg-secondary-400"}`}
                          >
                            {news.featured ? "Featured" : news.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 p-3">
                          <h3 className="font-medium text-white text-lg line-clamp-1">{news.title}</h3>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(news.publishedAt).toLocaleDateString()}
                            <span className="mx-1">•</span>
                            <User className="mr-1 h-3 w-3" />
                            {news.author}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-sm text-gray-300 line-clamp-2 mb-3">{news.content}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-400">ID: {news.id}</div>
                          <div className="flex gap-1">
                            <Link href={`/dashboard/news/${news.id}`} passHref>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </Link>
                            <Link href={`/dashboard/news/${news.id}/edit`} passHref>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </Link>
                            <Link href={`/dashboard/news/${news.id}/delete`} passHref>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-destructive hover:bg-white/10 rounded-full"
                              >
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-1 ${
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </Button>

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
                            <Button
                              key="start"
                              variant="ghost"
                              onClick={() => setCurrentPage(1)}
                              className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-white/10"
                            >
                              1
                            </Button>
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
                            <Button
                              key="end"
                              variant="ghost"
                              onClick={() => setCurrentPage(totalPages)}
                              className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-white/10"
                            >
                              {totalPages}
                            </Button>
                          )
                        }
                      }

                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "default" : "ghost"}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`h-9 w-9 p-0 ${
                            currentPage === pageNumber
                              ? "bg-primary text-white"
                              : "text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {pageNumber}
                        </Button>
                      )
                    })}

                    <Button
                      variant="ghost"
                      onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-1 ${
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
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

