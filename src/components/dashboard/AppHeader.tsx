"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  RiMenuLine,
  RiSearchLine,
  RiGlobalLine,
  RiFullscreenLine,
  RiNotificationLine,
  RiLogoutBoxLine,
  RiSettingsLine,
  RiProfileLine,
} from "@remixicon/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuIconWrapper,
} from "@/components/Dropdown";
import { MobileSidebar } from "./MobileSidebar";
import { useLocaleContext } from "@/lib/context/LocaleContext";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { logoutUser } from "@/lib/store/slices/authSlice";
import { toastUtils } from "@/lib/utils/toast";

export default function AppHeader() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { setLocale } = useLocaleContext();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const languages = [
    { code: "en", name: "English", flag: "/flags/us-flag.jpg" },
    { code: "ar", name: "العربية", flag: "/flags/uae-flag.jpg" },
    { code: "zh", name: "中文", flag: "/flags/china-flag.jpg" },
    { code: "es", name: "Español", flag: "/flags/spain-flag.jpg" },
  ];

  const handleLanguageChange = (language: { code: string; name: string; flag: string }) => {
    // Use the context method which handles localStorage persistence
    setLocale(language.code);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      // Toast will be shown by the auth slice
      router.push(`/${locale}/auth/login`);
    } catch (error) {
      console.error("Logout error:", error);
      toastUtils.error.logout();
      // Even if logout API fails, redirect to login
      router.push(`/${locale}/auth/login`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 shadow-sm">
      {/* Left side - Logo and Hamburger */}
      <div className="flex items-center gap-4">
        {/* LEOS Logo */}
        <div className="hidden items-center gap-2 lg:flex">
          <Image
            src="/logo/logo.png"
            alt="LEOS Logo"
            width={150}
            height={32}
            className="object-contain"
          />
        </div>

        {/* Hamburger Menu */}
        <Button
          variant="secondary"
          className="lg:hidden p-2"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <RiMenuLine className="h-5 w-5" />
        </Button>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <RiSearchLine className="h-4 w-4 text-gray-400" />
          </div>
          <input
            className="h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-10 pr-4 text-sm outline-none focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder={t("header.search")}
          />
        </div>
      </div>

      {/* Right side - Icons and User Profile */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="h-10 w-10 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <RiGlobalLine className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className="flex items-center gap-3 cursor-pointer transition-colors duration-150"
              >
                <Image
                  src={language.flag}
                  alt={`${language.name} flag`}
                  width={24}
                  height={16}
                  className="rounded-sm object-cover"
                />
                <span className="font-medium">{language.name}</span>
                {locale === language.code && (
                  <span className="ml-auto text-blue-600 dark:text-blue-400 font-semibold">✓</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Fullscreen Icon */}
        <Button
          variant="secondary"
          className="h-10 w-10 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md"
        >
          <RiFullscreenLine className="h-5 w-5" />
        </Button>

        {/* Bell/Notifications Icon */}
        <Button
          variant="secondary"
          className="h-10 w-10 rounded-full relative transition-all duration-200 hover:scale-105 hover:shadow-md"
        >
          <RiNotificationLine className="h-5 w-5" />
          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="h-10 w-10 rounded-full overflow-hidden p-0 transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
            >
              <Image
                src="/avatar/avatar-thumb-001.webp"
                alt={user?.fullName || "User"}
                width={40}
                height={40}
                className="object-cover"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72" sideOffset={8}>
            {/* User Profile Section */}
            <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800 shadow-md">
                  <Image
                    src="/avatar/avatar-thumb-001.webp"
                    alt={user?.fullName || "User"}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {user?.fullName || "Guest User"}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {user?.email || "guest@example.com"}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <DropdownMenuItem className="flex items-center gap-3 cursor-pointer transition-colors duration-150">
                <DropdownMenuIconWrapper>
                  <RiProfileLine className="h-4 w-4" />
                </DropdownMenuIconWrapper>
                <span>My Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-3 cursor-pointer transition-colors duration-150">
                <DropdownMenuIconWrapper>
                  <RiSettingsLine className="h-4 w-4" />
                </DropdownMenuIconWrapper>
                <span>Settings</span>
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-3 cursor-pointer text-red-600 dark:text-red-400 transition-colors duration-150 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <DropdownMenuIconWrapper>
                <RiLogoutBoxLine className="h-4 w-4" />
              </DropdownMenuIconWrapper>
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
    </header>
  );
}
