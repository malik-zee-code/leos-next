import { AuthLayout } from "@/components/AuthLayout";

export default function AuthLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
