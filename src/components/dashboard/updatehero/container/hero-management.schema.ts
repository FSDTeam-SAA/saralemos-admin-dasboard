import { z } from "zod"

export const heroFormSchema = z.object({
  section: z.string().min(2, "Title must be at least 2 characters"),
  subtitle: z.string().min(2, "Sub title must be at least 2 characters"),
})

export type HeroFormValues = z.infer<typeof heroFormSchema>
