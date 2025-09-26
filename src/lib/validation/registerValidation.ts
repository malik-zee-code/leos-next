import { z } from "zod"

const nameRegex = /^[A-Za-z ]+$/
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name is required")
    .regex(nameRegex, "First name can only contain letters and spaces"),
  lastName: z
    .string()
    .min(2, "Last name is required")
    .regex(nameRegex, "Last name can only contain letters and spaces"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must contain uppercase, lowercase, number, and special character",
    ),
  affiliation: z
    .string()
    .min(2, "Affiliation is required")
    .regex(nameRegex, "Affiliation can only contain letters and spaces"),
  countryRegion: z.string().min(2, "Country/Region is required"),
})

export function validateRegister(form: any) {
  const result = registerSchema.safeParse(form)
  if (!result.success) {
    // Return a map of field errors
    const errors: Record<string, string> = {}
    result.error.issues.forEach((err) => {
      const key = String(err.path[0])
      if (key) errors[key] = err.message
    })
    return errors
  }
  return null
}
