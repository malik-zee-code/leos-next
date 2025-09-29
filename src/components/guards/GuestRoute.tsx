"use client";

import { useLocale } from "next-intl";
import { AuthGuard } from "./AuthGuard";

interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const locale = useLocale();
  return (
    <AuthGuard requireAuth={false} redirectTo={`/${locale}/dashboard`}>
      {children}
    </AuthGuard>
  );
}
