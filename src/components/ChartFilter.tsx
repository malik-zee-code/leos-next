"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";

interface ChartFilterProps {
  onFilterChange: (filter: string) => void;
  defaultFilter?: string;
}

export default function ChartFilter({
  onFilterChange,
  defaultFilter = "This Month",
}: ChartFilterProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

  const filterOptions = [
    { key: "yesterday", value: "Yesterday" },
    { key: "lastWeek", value: "Last Week" },
    { key: "thisMonth", value: "This Month" },
    { key: "lastMonth", value: "Last Month" },
    { key: "thisQuarter", value: "This Quarter" },
    { key: "lastQuarter", value: "Last Quarter" },
    { key: "thisYear", value: "This Year" },
    { key: "lastYear", value: "Last Year" },
  ];

  const handleFilterSelect = (filter: { key: string; value: string }) => {
    setSelectedFilter(filter.value);
    onFilterChange(filter.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="secondary"
        className="flex items-center gap-2 px-3 py-2"
      >
        <span>
          {t(
            `filters.${
              filterOptions.find((opt) => opt.value === selectedFilter)?.key || "thisMonth"
            }`
          )}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <div className="py-1">
            {filterOptions.map((option) => (
              <Button
                key={option.key}
                onClick={() => handleFilterSelect(option)}
                variant="ghost"
                className={`w-full px-4 py-2 text-left text-sm ${
                  selectedFilter === option.value
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {t(`filters.${option.key}`)}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
