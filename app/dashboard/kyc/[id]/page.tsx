"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { kycData, type KycStatus } from "@/lib/data"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Phone,
  Mail,
  Calendar,
  Shield,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function KycDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { toast } = useToast()

  // Find the KYC record
  const kycRecord = kycData.find((kyc) => kyc.id === id)

  const [status, setStatus] = useState<KycStatus>(kycRecord?.status || "pending")
  const [notes, setNotes] = useState(kycRecord?.notes || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  if (!kycRecord) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild className="border-white/10 hover:bg-white/5">
              <Link href="/dashboard/kyc">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">KYC Details</h1>
          </div>
          <Card className="crypto-card">
            <CardContent className="flex h-40 items-center justify-center">
              <p className="text-gray-400">KYC record not found</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  const handleStatusUpdate = (newStatus: KycStatus) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setStatus(newStatus)
      setIsSubmitting(false)

      toast({
        title: "KYC status updated",
        description: `KYC for ${kycRecord.name} has been ${newStatus}`,
      })
    }, 1000)
  }

  const handleNotesUpdate = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: "Notes updated",
        description: "KYC notes have been updated successfully",
      })
    }, 1000)
  }

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
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild className="border-white/10 hover:bg-white/5">
            <Link href="/dashboard/kyc">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">KYC Details</h1>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={kycRecord.avatar} alt={kycRecord.name} />
              <AvatarFallback className="bg-primary-900 text-primary-200">
                {kycRecord.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-white">{kycRecord.name}</h2>
              <p className="text-sm text-gray-400">{kycRecord.email}</p>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary-600 p-1">
            <TabsTrigger
              value="details"
              className={
                activeTab === "details"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              User Details
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className={
                activeTab === "documents"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="verification"
              className={
                activeTab === "verification"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              Verification
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-gray-400">User's personal details submitted for KYC</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/50">
                        <User className="h-5 w-5 text-primary-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none text-gray-400">Full Name</p>
                        <p className="text-base text-white">{kycRecord.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/50">
                        <Mail className="h-5 w-5 text-primary-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none text-gray-400">Email Address</p>
                        <p className="text-base text-white">{kycRecord.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/50">
                        <Phone className="h-5 w-5 text-primary-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none text-gray-400">Phone Number</p>
                        <p className="text-base text-white">{kycRecord.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/50">
                        <FileText className="h-5 w-5 text-primary-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none text-gray-400">Document Type</p>
                        <p className="text-base text-white">{kycRecord.documentType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/50">
                        <Shield className="h-5 w-5 text-primary-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none text-gray-400">Document ID</p>
                        <p className="text-base text-white">{kycRecord.documentId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/50">
                        <Calendar className="h-5 w-5 text-primary-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none text-gray-400">Submitted At</p>
                        <p className="text-base text-white">{new Date(kycRecord.submittedAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Notes</CardTitle>
                <CardDescription className="text-gray-400">Add notes about this KYC submission</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add notes about this KYC submission..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px] bg-secondary-500 border-white/10"
                />
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4">
                <Button
                  onClick={handleNotesUpdate}
                  disabled={isSubmitting}
                  className="ml-auto bg-primary hover:bg-primary/90"
                >
                  Save Notes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Document Verification</CardTitle>
                <CardDescription className="text-gray-400">
                  Review the submitted identification documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-white">ID Document (Front)</h3>
                    <div className="aspect-[4/3] overflow-hidden rounded-md bg-secondary-500 border border-white/10">
                      <div className="relative h-full w-full">
                        <div className="flex h-full items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=300&width=400"
                            alt="ID Document Front"
                            width={400}
                            height={300}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-white">ID Document (Back)</h3>
                    <div className="aspect-[4/3] overflow-hidden rounded-md bg-secondary-500 border border-white/10">
                      <div className="relative h-full w-full">
                        <div className="flex h-full items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=300&width=400"
                            alt="ID Document Back"
                            width={400}
                            height={300}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <h3 className="text-lg font-medium text-white">Selfie with ID</h3>
                  <div className="aspect-[16/9] overflow-hidden rounded-md bg-secondary-500 border border-white/10">
                    <div className="relative h-full w-full">
                      <div className="flex h-full items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=300&width=500"
                          alt="Selfie with ID"
                          width={500}
                          height={300}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">KYC Verification</CardTitle>
                <CardDescription className="text-gray-400">Approve or reject this KYC submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg glass-effect p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <h3 className="text-lg font-medium text-white">Verification Guidelines</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full h-5 w-5 bg-secondary-500 flex items-center justify-center text-xs mt-0.5">
                        1
                      </div>
                      <span>Verify that the name on the ID matches the submitted name</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full h-5 w-5 bg-secondary-500 flex items-center justify-center text-xs mt-0.5">
                        2
                      </div>
                      <span>Check that the ID document is not expired</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full h-5 w-5 bg-secondary-500 flex items-center justify-center text-xs mt-0.5">
                        3
                      </div>
                      <span>Ensure the selfie clearly shows the user's face alongside their ID</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full h-5 w-5 bg-secondary-500 flex items-center justify-center text-xs mt-0.5">
                        4
                      </div>
                      <span>Confirm that the ID document appears genuine with no signs of tampering</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    variant="outline"
                    className="border-success text-success hover:bg-success/10 hover:text-success"
                    onClick={() => handleStatusUpdate("approved")}
                    disabled={isSubmitting || status === "approved"}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve KYC
                  </Button>
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleStatusUpdate("rejected")}
                    disabled={isSubmitting || status === "rejected"}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject KYC
                  </Button>
                  <Button
                    variant="outline"
                    className="border-warning text-warning hover:bg-warning/10 hover:text-warning"
                    onClick={() => handleStatusUpdate("pending")}
                    disabled={isSubmitting || status === "pending"}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Mark as Pending
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Verification History</CardTitle>
                <CardDescription className="text-gray-400">Timeline of verification activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-primary-900 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-primary-300" />
                      </div>
                      <div className="h-full w-0.5 bg-white/10 mt-2"></div>
                    </div>
                    <div>
                      <p className="font-medium text-white">KYC Submitted</p>
                      <p className="text-sm text-gray-400">{new Date(kycRecord.submittedAt).toLocaleString()}</p>
                      <p className="text-sm text-gray-400 mt-1">User submitted KYC documents for verification</p>
                    </div>
                  </div>

                  {kycRecord.status !== "pending" && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-900 flex items-center justify-center">
                          {kycRecord.status === "approved" ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          KYC {kycRecord.status === "approved" ? "Approved" : "Rejected"}
                        </p>
                        <p className="text-sm text-gray-400">{new Date(kycRecord.updatedAt).toLocaleString()}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {kycRecord.notes || `KYC was ${kycRecord.status} by admin`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

