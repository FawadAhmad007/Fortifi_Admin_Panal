"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { newsData } from "@/lib/data"
import { ArrowLeft, Edit, Trash, Calendar, User, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function NewsDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { toast } = useToast()

  // Find the news article
  const newsArticle = newsData.find((news) => news.id === id)

  if (!newsArticle) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild className="border-white/10 hover:bg-white/5">
              <Link href="/dashboard/news">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">News Details</h1>
          </div>
          <Card className="crypto-card">
            <CardContent className="flex h-40 items-center justify-center">
              <p className="text-gray-400">News article not found</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  // Combine main image and additional images
  const allImages = [newsArticle.imageUrl, ...(newsArticle.additionalImages || [])].filter(Boolean) as string[]

  const handleDelete = () => {
    router.push(`/dashboard/news/${id}/delete`)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild className="border-white/10 hover:bg-white/5">
              <Link href="/dashboard/news">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">News Details</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild className="border-white/10 hover:bg-white/5">
              <Link href={`/dashboard/news/${id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="outline"
              className="text-destructive border-white/10 hover:bg-white/5"
              onClick={handleDelete}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <Card className="crypto-card overflow-hidden">
          <div className="relative h-64 w-full">
            <Image
              src={newsArticle.imageUrl || "/placeholder.svg?height=300&width=500"}
              alt={newsArticle.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute top-4 left-4">
              <Badge
                className={`${newsArticle.featured ? "bg-primary" : "bg-secondary-500"} hover:${newsArticle.featured ? "bg-primary/90" : "bg-secondary-400"}`}
              >
                {newsArticle.featured ? "Featured" : newsArticle.category}
              </Badge>
            </div>
          </div>

          <CardHeader>
            <CardTitle className="text-2xl text-white">{newsArticle.title}</CardTitle>
            <CardDescription className="flex flex-col gap-2 sm:flex-row sm:items-center text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Published: {new Date(newsArticle.publishedAt).toLocaleString()}</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Author: {newsArticle.author}</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>Category: {newsArticle.category}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed">{newsArticle.content}</p>
            </div>

            {allImages.length > 1 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-white">Gallery</h3>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                  {allImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative rounded-lg overflow-hidden border border-white/10 aspect-video"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${newsArticle.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t border-white/10 pt-4">
            <div className="text-sm text-gray-400">
              Last updated: {new Date(newsArticle.updatedAt).toLocaleString()}
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

