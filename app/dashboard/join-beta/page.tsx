"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import { Eye, Search, AlertCircle } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store";
import { getContacts } from "@/shared/services/request"
import { DashboardLayout } from "@/components/dashboard-layout"
export default function JoinBetaPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const auth = useSelector((state: RootState) => state.auth);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadContacts()
  }, [currentPage])

  const loadContacts = async () => {
    setIsLoading(true)
    setError(null)
    getContacts(auth?.token,currentPage)
      .then((response) => {
        const data = response.data
        setContacts(data.contacts || [])
        setTotalPages(data.pagination?.totalPages || 1)
        setTotalItems(data.pagination?.total || 0)
      })
      .catch((err) => {
        setError("Failed to load contact data. Please try again later.")
        setContacts([])
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })  
     
  }

  const goToPage = (page: number) => setCurrentPage(page)

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm")
    } catch {
      return dateString || "N/A"
    }
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      !searchTerm ||
      contact.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumber?.includes(searchTerm) ||
      contact.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout >
      <h1 className="text-2xl font-bold">Join Beta Requests</h1>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Search and Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(5)].map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-5 w-28" />
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-8 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>{contact.fullName || "N/A"}</TableCell>
                    <TableCell>{contact.email || "N/A"}</TableCell>
                    <TableCell>{contact.phoneNumber || "N/A"}</TableCell>
                    <TableCell>{contact.subject || "N/A"}</TableCell>
                    <TableCell>{formatDate(contact.createdAt)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No beta join requests found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {!isLoading && !error && totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber =
                totalPages <= 5
                  ? i + 1
                  : currentPage <= 3
                  ? i + 1
                  : currentPage >= totalPages - 2
                  ? totalPages - 4 + i
                  : currentPage - 2 + i
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  onClick={() => goToPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            })}
            <Button
              variant="outline"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
