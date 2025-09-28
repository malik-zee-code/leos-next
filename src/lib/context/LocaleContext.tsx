"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  availableLocales: string[];
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const SUPPORTED_LOCALES = ["en", "ar", "zh", "es"];
const DEFAULT_LOCALE = "en";
const LOCALE_STORAGE_KEY = "preferred-locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<string>(DEFAULT_LOCALE);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // Try to detect from browser language
      const browserLang = navigator.language.split("-")[0];
      if (SUPPORTED_LOCALES.includes(browserLang)) {
        setLocaleState(browserLang);
      }
    }
    setIsInitialized(true);
  }, []);

  // Update localStorage when locale changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }, [locale, isInitialized]);

  const setLocale = (newLocale: string) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocaleState(newLocale);

      // Update the URL to reflect the new locale
      const currentPath = pathname.replace(/^\/[a-z]{2}/, "");
      const newPath = `/${newLocale}${currentPath}`;

      router.push(newPath);
    }
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        availableLocales: SUPPORTED_LOCALES,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocaleContext must be used within a LocaleProvider");
  }
  return context;
}
