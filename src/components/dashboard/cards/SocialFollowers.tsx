"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SocialFollowers() {
  const t = useTranslations();

  const items = [
    { icon: "/dashboard/facebook.svg", label: "26,472", sub: t("dashboard.likes") },
    { icon: "/dashboard/twitter.svg", label: "45,332", sub: t("dashboard.followers") },
    { icon: "/dashboard/insta.svg", label: "6,472", sub: t("dashboard.friends") },
    { icon: "/dashboard/link.svg", label: "26,472", sub: t("dashboard.followers") },
    { icon: "/dashboard/youtube.svg", label: "5,332", sub: t("dashboard.subscriber") },
    { icon: "/dashboard/tiktok.svg", label: "6,472", sub: t("dashboard.followers") },
    { icon: "/dashboard/webiste.svg", label: "5,332", sub: t("dashboard.visits") },
    { icon: "/dashboard/google.svg", label: "6,472", sub: t("dashboard.reviews") },
  ];
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
      {items.map((i, index) => (
        <div
          key={index}
          className="rounded-md border border-gray-200  dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-center"
        >
          <Image src={i.icon} alt="" className="h-6 mx-auto mb-2" width={24} height={24} />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{i.label}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{i.sub}</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">
            {t("dashboard.yesterdayMTD")}
          </p>
        </div>
      ))}
    </div>
  );
}
