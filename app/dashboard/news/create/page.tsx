"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Upload, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store";
import { createNews } from "@/shared/services/request"
export default function CreateNewsPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [featured, setFeatured] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const auth = useSelector((state: RootState) => state.auth);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
    }
  }

  const handleAddImage = () => {
    if (previewImage) {
      setImages([...images, previewImage])
      setPreviewImage(null)

      // Reset the file input
      const fileInput = document.getElementById("main-image") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } else {
      // If no preview image, use a placeholder
      const newImage = "/placeholder.svg?height=300&width=500"
      setImages([...images, newImage])
    }
  }

  // Remove image
  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      setIsSubmitting(false);
      return;
    }

    const fileInput = document.getElementById("main-image") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload a main image",
      });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("newsTitle", title);
    formData.append("description", content);
    formData.append("newsImage", file);

    try {
      const res = await createNews(formData, auth?.token);
      if (res?.is_successfull) {
        toast({
          variant: "success",
          title: "News created",
          description: "The news article has been created successfully",
        });
        router.push("/dashboard/news");
        
      } else {
        throw new Error(res?.message || "Something went wrong");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Creation failed",
        description: error.message || "Failed to create news",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Create News</h1>
        </div>

        <Card className="crypto-card ">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-white">News Article Details</CardTitle>
              <CardDescription className="text-gray-400">
                Create a new news article to publish on the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter news title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-secondary-500 border-white/10"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
    

                <div className="flex items-end">
                  <div className="flex items-center space-x-2 h-10">
                    <Checkbox
                      id="featured"
                      checked={featured}
                      onCheckedChange={(checked) => setFeatured(checked === true)}
                      className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="featured" className="text-gray-300">
                      Featured Article
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-gray-300">
                  Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Enter news content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] bg-secondary-500 border-white/10"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Images</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddImage}
                    className="h-8 border-white/10 hover:bg-white/5"
                    disabled={!previewImage && images.length > 0}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Image
                  </Button>
                </div>

                {images.length === 0 && !previewImage ? (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="main-image"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary-500/50 hover:bg-secondary-500 border-white/10"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 2MB)</p>
                      </div>
                      <Input
                        id="main-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {previewImage && (
                      <div className="p-4 border border-white/10 rounded-lg bg-secondary-500/50">
                        <h3 className="text-sm font-medium text-white mb-2">Preview Image</h3>
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <Image src={previewImage || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                        </div>
                        <div className="flex justify-end mt-2 gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setPreviewImage(null)}
                            className="h-8 border-white/10 hover:bg-white/5"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            variant="default"
                            size="sm"
                            onClick={handleAddImage}
                            className="h-8 bg-primary hover:bg-primary/90"
                          >
                            Add to Gallery
                          </Button>
                        </div>
                      </div>
                    )}

                    {images.length > 0 && (
                      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                        {images.map((image, index) => (
                          <div key={index} className="relative group rounded-lg overflow-hidden border border-white/10">
                            <div className="aspect-video relative">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveImage(index)}
                                className="h-8"
                              >
                                Remove
                              </Button>
                            </div>
                            {index === 0 && (
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-primary">Main Image</Badge>
                              </div>
                            )}
                          </div>
                        ))}

                        {!previewImage && (
                          <div className="flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer bg-secondary-500/50 hover:bg-secondary-500 border-white/10 aspect-video">
                            <label
                              htmlFor="additional-image"
                              className="w-full h-full flex items-center justify-center"
                            >
                              <Button
                                type="button"
                                variant="ghost"
                                className="h-8 text-gray-400 hover:text-white hover:bg-white/5"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add More
                              </Button>
                              <Input
                                id="additional-image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-white/10 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/news")}
                className="border-white/10 hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create News"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}

