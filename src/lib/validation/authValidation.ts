import * as yup from "yup";

// Login form validation schema
export const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Signup form validation schema
export const signupSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),
  email: yup.string().required("Email is required").email("Please enter a valid email address"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[+]?[\d\s\-\(\)]{10,}$/, "Please enter a valid phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

// Forgot password form validation schema
export const forgotPasswordSchema = yup.object({
  email: yup.string().required("Email is required").email("Please enter a valid email address"),
});

// Type definitions
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignupFormData = yup.InferType<typeof signupSchema>;
export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;
