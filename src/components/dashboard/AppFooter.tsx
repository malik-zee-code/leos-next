"use client";

import { useTranslations } from "next-intl";

export default function AppFooter() {
  const t = useTranslations();

  return (
    <footer className="mt-10 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-6 text-sm text-gray-600 dark:text-gray-400">
        {t("footer.copyright")}
        <span className="" id="year">
          {new Date().getFullYear()}
        </span>
        <span className="font-semibold text-gray-800 dark:text-white mx-1">
          Leos International LLC{"  "}
        </span>{" "}
        {t("footer.allRightsReserved")}
      </div>
    </footer>
  );
}
