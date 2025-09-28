"use client";

import { useTranslations } from "next-intl";
import SparklineChart from "@/components/SparklineChart";

export default function HrMiniStats() {
  const t = useTranslations();

  const items = [
    {
      title: t("dashboard.headCount"),
      value: "400",
      trend: "+0.45%",
      trendTone: "green",
      chartData: [380, 420, 365, 435, 390, 450, 375, 425, 385, 440, 395, 400],
      chartColor: "#8B5CF6", // Vibrant purple
    },
    {
      title: t("dashboard.avgDailyAttendance"),
      value: "80%",
      trend: "+1.10%",
      trendTone: "purple",
      chartData: [65, 95, 70, 90, 75, 85, 60, 95, 80, 88, 72, 80],
      chartColor: "#EC4899", // Vibrant pink/magenta
    },
    {
      title: t("dashboard.newHiredMTD"),
      value: "4",
      trend: "+0.45%",
      trendTone: "green",
      chartData: [0, 8, 1, 9, 2, 7, 0, 6, 3, 8, 1, 4],
      chartColor: "#F97316", // Vibrant orange
    },
  ];

  const trendClass = (tone: string) =>
    tone === "green" ? "text-green-600" : tone === "purple" ? "text-purple-600" : "text-gray-600";

  const MiniSparkline = ({ data, color }: { data: number[]; color: string }) => {
    return (
      <div className="h-16 w-28">
        <SparklineChart data={data} color={color} />
      </div>
    );
  };

  return (
    <ul className="space-y-4">
      {items.map((i) => (
        <li
          key={i.title}
          className="flex items-start justify-between border-b-[1px] border-gray-200 dark:border-gray-700 pb-4"
        >
          <div className="flex-1">
            <span className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{i.title}</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-gray-900 dark:text-white">{i.value}</span>
              <span className={`text-xs ${trendClass(i.trendTone)}`}>{i.trend}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <MiniSparkline data={i.chartData} color={i.chartColor} />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {t("dashboard.seeMore")}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
