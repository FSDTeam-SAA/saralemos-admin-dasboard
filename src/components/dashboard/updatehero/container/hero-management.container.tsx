"use client"

import { useState } from "react"

import type { HeroFormValues } from "./hero-management.schema"
import { HeroManagementPresenter } from "./hero-management.presenter"
import { useUpdateHero } from "@/lib/hooks/useUpdateHero"

export function HeroManagementContainer() {
  const [isLoading, setIsLoading] = useState(false)
const { mutate } = useUpdateHero()

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

    mutate(formData)
  } finally {
    setIsLoading(false)
  }
}

  return <HeroManagementPresenter onSubmit={handleSubmit} isLoading={isLoading} />
}
