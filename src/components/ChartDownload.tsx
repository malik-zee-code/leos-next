"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";

interface ChartDownloadProps {
  chartId: string;
  chartTitle: string;
  data?: Record<string, unknown>[];
}

export default function ChartDownload({ chartId, chartTitle, data }: ChartDownloadProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const downloadChart = async (format: "png" | "svg" | "csv") => {
    if (format === "csv" && data) {
      // Download CSV
      const csvContent = convertToCSV(data);
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${chartTitle.replace(/\s+/g, "_")}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      // Download PNG or SVG
      const chartElement = document.getElementById(chartId);
      if (chartElement) {
        const svgElement = chartElement.querySelector("svg");
        if (svgElement) {
          if (format === "png") {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();

            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const svgUrl = URL.createObjectURL(svgBlob);

            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx?.drawImage(img, 0, 0);

              canvas.toBlob((blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${chartTitle.replace(/\s+/g, "_")}.png`;
                  a.click();
                  URL.revokeObjectURL(url);
                }
              });
            };

            img.src = svgUrl;
          } else if (format === "svg") {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${chartTitle.replace(/\s+/g, "_")}.svg`;
            a.click();
            URL.revokeObjectURL(url);
          }
        }
      }
    }
    setIsOpen(false);
  };

  const convertToCSV = (data: Record<string, unknown>[]) => {
    if (!data || data.length === 0) return "";

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            return typeof value === "string" && value.includes(",") ? `"${value}"` : value;
          })
          .join(",")
      ),
    ];

    return csvRows.join("\n");
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="secondary"
        className="flex items-center gap-1 px-2 py-1"
        title={t("download.downloadChart")}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <svg
          className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-32 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <div className="py-1">
            <Button
              onClick={() => downloadChart("png")}
              variant="ghost"
              className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300"
            >
              {t("download.downloadPNG")}
            </Button>
            <Button
              onClick={() => downloadChart("svg")}
              variant="ghost"
              className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300"
            >
              {t("download.downloadSVG")}
            </Button>
            {data && (
              <Button
                onClick={() => downloadChart("csv")}
                variant="ghost"
                className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300"
              >
                {t("download.downloadCSV")}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
