import { z } from "zod"

export const userFormSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  plan: z.enum(["Starter", "Professional", "Enterprise"]),
  status: z.enum(["Active", "Inactive"]),
})

export type UserFormValues = z.infer<typeof userFormSchema>
