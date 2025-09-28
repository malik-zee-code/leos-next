"use client";

import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "./Button";
import { AuthCarousel } from "./AuthCarousel";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setIsDark(initialTheme === "dark");
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Side - Carousel */}
        <div className="hidden lg:flex lg:w-2/3 relative p-10">
          <AuthCarousel />
        </div>

        {/* Right Side - Form */}
        <div className="flex w-full lg:w-1/3 flex-col justify-center bg-gray-50 dark:bg-gray-800 px-8 py-12 relative">
          <div className="absolute top-0 left-0 right-0 z-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <Button
                onClick={toggleTheme}
                variant="light"
                className="p-2"
                aria-label="Toggle theme"
              >
                {isDark ? <RiSunLine className="h-4 w-4" /> : <RiMoonLine className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
