"use client";

import StatCard from "@/components/dashboard/cards/StatCard";
import { useTranslations } from "next-intl";

export function StatCardsSection() {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
      <StatCard
        label={t("dashboard.yesterdayRevenue")}
        value="1.5M"
        chip={{ text: "+5%", tone: "green" }}
        subtitle={t("dashboard.vsPreviousDay")}
        icon="/dashboard/revenue.svg"
        iconBg="bg-green-500 dark:bg-green-600"
      />
      <StatCard
        label={t("dashboard.yesterdayPayOut")}
        value="5M"
        chip={{ text: "-1%", tone: "red" }}
        subtitle={t("dashboard.vsPreviousDay")}
        icon="/dashboard/payout.svg"
        iconBg="bg-blue-500 dark:bg-blue-600"
      />
      <StatCard
        label={t("dashboard.cashReserved")}
        value="2.4M"
        chip={{ text: "+12%", tone: "green" }}
        subtitle={t("dashboard.vsPreviousDay")}
        icon="/dashboard/cash_reserved.svg"
        iconBg="bg-yellow-500 dark:bg-yellow-600"
      />
      <StatCard
        label={t("dashboard.headcount")}
        value="1,423"
        chip={{ text: "+2%", tone: "green" }}
        subtitle={t("dashboard.vsPreviousDay")}
        icon="/dashboard/headcount.svg"
        iconBg="bg-purple-500 dark:bg-purple-600"
      />
    </div>
  );
}
