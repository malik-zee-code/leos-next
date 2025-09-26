import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export function validateLogin(form: any) {
  const result = loginSchema.safeParse(form)
  if (!result.success) {
    const errors: Record<string, string> = {}
    result.error.issues.forEach((err) => {
      if (err.path[0]) errors[err.path[0] as string] = err.message
    })
    return errors
  }
  return null
}
