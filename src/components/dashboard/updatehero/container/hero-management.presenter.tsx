"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type HeroFormValues, heroFormSchema } from "./hero-management.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"

interface HeroManagementPresenterProps {
  onSubmit: (values: HeroFormValues, imageFile?: File, videoFile?: File) => void
  isLoading: boolean
}

export function HeroManagementPresenter({ onSubmit, isLoading }: HeroManagementPresenterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
  })

  const handleFormSubmit = async (data: HeroFormValues) => {
    const imageInput = (document.getElementById("image-input") as HTMLInputElement)?.files?.[0]
    const videoInput = (document.getElementById("video-input") as HTMLInputElement)?.files?.[0]
    onSubmit(data, imageInput, videoInput)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Hero Section</CardTitle>
        <p className="text-sm text-muted-foreground">Monitor platform performance and user activity</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input {...register("title")} placeholder="Cardiology" className="border-border" />
              {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sub Title</label>
              <Input {...register("subTitle")} placeholder="Dr. Sarah Johnson" className="border-border" />
              {errors.subTitle && <p className="text-destructive text-sm mt-1">{errors.subTitle.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image Upload</label>
            <label
              htmlFor="image-input"
              className="block border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Drag and drop files here</p>
              <p className="text-xs text-muted-foreground">or click to browse</p>
            </label>
            <input id="image-input" type="file" accept="image/*" className="hidden" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Video Upload</label>
            <label
              htmlFor="video-input"
              className="block border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Drag and drop files here</p>
              <p className="text-xs text-muted-foreground">or click to browse</p>
            </label>
            <input id="video-input" type="file" accept="video/*" className="hidden" />
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button disabled={isLoading} className="flex-1 bg-green-600 hover:bg-green-700">
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
