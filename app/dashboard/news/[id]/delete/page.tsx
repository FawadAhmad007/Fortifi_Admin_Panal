"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { newsData } from "@/lib/data"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function DeleteNewsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { toast } = useToast()

  // Find the news article
  const newsArticle = newsData.find((news) => news.id === id)

  const [isDeleting, setIsDeleting] = useState(false)

  if (!newsArticle) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/news">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Delete News</h1>
          </div>
          <Card>
            <CardContent className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">News article not found</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false)

      toast({
        variant: "success",
        title: "News deleted",
        description: "The news article has been deleted successfully",
      })

      router.push("/dashboard/news")
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/news/${id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Delete News</h1>
        </div>

        <Card className="crypto-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-white">Confirm Deletion</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Are you sure you want to delete this news article? This action cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-white/10 p-4">
              <h3 className="font-medium text-white">{newsArticle.title}</h3>
              <p className="mt-2 text-sm text-gray-400 line-clamp-2">{newsArticle.content}</p>
              <p className="mt-2 text-xs text-gray-500">
                Published: {new Date(newsArticle.publishedAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-white/10 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/news/${id}`)}
              className="border-white/10 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete News"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

