import type { HeroSection } from "@/types/user"

export interface HeroFormInputs {
  title: string
  subTitle: string
  imageFile?: File
  videoFile?: File
}

export interface HeroState {
  heroes: HeroSection[]
  isLoading: boolean
  error: string | null
}
