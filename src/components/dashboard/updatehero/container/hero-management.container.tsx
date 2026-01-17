"use client"

import { useState } from "react"

import type { HeroFormValues } from "./hero-management.schema"
import { HeroManagementPresenter } from "./hero-management.presenter"

export function HeroManagementContainer() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values: HeroFormValues, imageFile?: File, videoFile?: File) => {
    setIsLoading(true)
    try {
      // Handle form submission with file uploads
      console.log("Form submitted:", { values, imageFile, videoFile })
      // Add your API call here
    } finally {
      setIsLoading(false)
    }
  }

  return <HeroManagementPresenter onSubmit={handleSubmit} isLoading={isLoading} />
}
