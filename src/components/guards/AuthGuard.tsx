"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { initializeAuth } from "@/lib/store/slices/authSlice";
import LoadingScreen from "@/components/LoadingScreen";
import { useLocale } from "next-intl";
import { toastUtils } from "@/lib/utils/toast";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = "/auth/login",
}: AuthGuardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, isLoading, wasIntentionalLogout, wasSuccessfulLogin } = useAppSelector(
    (state) => state.auth
  );
  const locale = useLocale();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Always initialize auth state from localStorage (handles both token and no-token cases)
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    // Only redirect if we're not loading and auth state is determined and haven't redirected yet
    if (!isLoading && !hasRedirected.current) {
      if (requireAuth && !isAuthenticated) {
        hasRedirected.current = true;
        // Only show unauthorized toast if it's not an intentional logout
        if (!wasIntentionalLogout) {
          toastUtils.error.unauthorized();
        }
        router.push(`/${locale}${redirectTo}`);
      } else if (!requireAuth && isAuthenticated) {
        // If user is authenticated but this route doesn't require auth (like login/signup)
        hasRedirected.current = true;
        // Only show "already logged in" toast if it's not a successful login
        if (!wasSuccessfulLogin) {
          toastUtils.error.alreadyLoggedIn();
        }
        router.push(`/${locale}/dashboard`);
      }
      // If requireAuth=true and isAuthenticated=true, do nothing (user is properly authenticated)
      // If requireAuth=false and isAuthenticated=false, do nothing (user is properly not authenticated)
    }
  }, [
    isAuthenticated,
    isLoading,
    requireAuth,
    redirectTo,
    router,
    locale,
    wasIntentionalLogout,
    wasSuccessfulLogin,
  ]);

  // Show loading screen while determining auth state
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Don't render children if auth requirements aren't met
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
