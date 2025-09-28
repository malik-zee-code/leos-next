"use client";

import { AuthGuard } from "./AuthGuard";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <AuthGuard requireAuth={true} redirectTo="/auth/login">
      {children}
    </AuthGuard>
  );
}
