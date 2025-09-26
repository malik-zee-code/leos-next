import { RiMoonLine, RiSunLine } from "@remixicon/react"
import Image from "next/image"
import { useEffect, useState } from "react"

import backgroundImage from "@/images/background-auth.jpg"
import { Button } from "./Button"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem("theme")
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light"
    const initialTheme = savedTheme || systemTheme

    setIsDark(initialTheme === "dark")
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <>
      <div className="relative flex min-h-full justify-center bg-white text-gray-900 md:px-12 lg:px-0 dark:bg-gray-950 dark:text-gray-100">
        {/* Theme Switcher */}
        <Button
          onClick={toggleTheme}
          variant="light"
          className="absolute left-4 top-4 z-20"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <RiSunLine className="h-5 w-5" />
          ) : (
            <RiMoonLine className="h-5 w-5" />
          )}
        </Button>

        <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:flex-none md:px-28 dark:bg-gray-950">
          <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            {children}
          </div>
        </div>
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src={backgroundImage}
            alt=""
            unoptimized
          />
        </div>
      </div>
    </>
  )
}
