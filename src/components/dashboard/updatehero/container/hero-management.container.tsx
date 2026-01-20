"use client"

import { useState } from "react"

import type { HeroFormValues } from "./hero-management.schema"
import { HeroManagementPresenter } from "./hero-management.presenter"
import { useGetAllHero, useUpdateHero, useDeleteHero } from "@/lib/hooks/useUpdateHero"

export function HeroManagementContainer() {
  const [isLoading, setIsLoading] = useState(false)
  const { data, isLoading: dataLoading } = useGetAllHero()
  const { mutate: updateHero } = useUpdateHero()
  const { mutate: deleteHero } = useDeleteHero()

  const handleSubmit = async (
    values: HeroFormValues,
    imageFile?: File,
    videoFile?: File
  ) => {
    setIsLoading(true)

    try {
      const formData = new FormData()

      formData.append("section", values.section)
      formData.append("subtitle", values.subtitle)

      // ✅ Only ONE path
      if (imageFile) {
        formData.append("type", "image")
        formData.append("file", imageFile)
      } else if (videoFile) {
        formData.append("type", "video")
        formData.append("file", videoFile)
      }

      updateHero(formData)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this asset?")) {
      deleteHero(id)
    }
  }

  return (
    <HeroManagementPresenter
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      isLoading={isLoading || dataLoading}
      data={data?.data || []}
    />
  )
}
