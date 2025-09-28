"use client";

import { AuthGuard } from "./AuthGuard";

interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  return (
    <AuthGuard requireAuth={false} redirectTo="/dashboard">
      {children}
    </AuthGuard>
  );
}
