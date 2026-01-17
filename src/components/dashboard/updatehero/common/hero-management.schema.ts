import { z } from "zod"

export const heroFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().min(1, "Subtitle is required"),
})

export type HeroFormValues = z.infer<typeof heroFormSchema>
