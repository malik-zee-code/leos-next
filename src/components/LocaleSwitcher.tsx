"use client";

import React, { useState } from "react";
import { useLocaleContext } from "@/lib/context/LocaleContext";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";
import { RiGlobalLine, RiCheckLine } from "react-icons/ri";

const LOCALE_NAMES = {
  en: "English",
  ar: "العربية",
  zh: "中文",
  es: "Español",
};

const LOCALE_FLAGS = {
  en: "🇺🇸",
  ar: "🇸🇦",
  zh: "🇨🇳",
  es: "🇪🇸",
};

export function LocaleSwitcher() {
  const { locale, setLocale, availableLocales } = useLocaleContext();
  const t = useTranslations("header");
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <RiGlobalLine className="h-4 w-4" />
          <span className="hidden sm:inline">
            {LOCALE_FLAGS[locale as keyof typeof LOCALE_FLAGS]}
          </span>
          <span className="hidden md:inline">
            {LOCALE_NAMES[locale as keyof typeof LOCALE_NAMES]}
          </span>
        </Button>
      }
    >
      <div className="py-1">
        {availableLocales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
              locale === loc ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{LOCALE_FLAGS[loc as keyof typeof LOCALE_FLAGS]}</span>
              <span>{LOCALE_NAMES[loc as keyof typeof LOCALE_NAMES]}</span>
            </div>
            {locale === loc && <RiCheckLine className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
          </button>
        ))}
      </div>
    </Dropdown>
  );
}
