"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/guards/ProtectedRoute";

const SUPPORTED_LOCALES = ["en", "ar", "zh", "es"];
const DEFAULT_LOCALE = "en";
const LOCALE_STORAGE_KEY = "preferred-locale";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for saved locale preference
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
      router.replace(`/${savedLocale}/dashboard`);
    } else {
      // Try to detect from browser language
      const browserLang = navigator.language.split("-")[0];
      if (SUPPORTED_LOCALES.includes(browserLang)) {
        router.replace(`/${browserLang}/dashboard`);
      } else {
        // Default to English
        router.replace(`/${DEFAULT_LOCALE}/dashboard`);
      }
    }
  }, [router]);

  return (
    <ProtectedRoute>
      {null} {/* This page will redirect immediately */}
    </ProtectedRoute>
  );
}
