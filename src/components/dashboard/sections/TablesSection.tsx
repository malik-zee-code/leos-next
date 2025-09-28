"use client";

import HrBar from "@/components/dashboard/charts/HrBar";
import SalaryBar from "@/components/dashboard/charts/SalaryBar";
import { ExpenseDonutChart } from "@/components/dashboard/charts/ExpenseDonutChart";
import ChartFilter from "@/components/ChartFilter";
import ChartDownload from "@/components/ChartDownload";
import { DataTable } from "@/components/ui/data-table/DataTable";
import {
  useSalesManagersColumns,
  type SalesManagerData,
} from "@/components/dashboard/tables/SalesManagersColumns";
import { useExpenseColumns, type ExpenseData } from "@/components/dashboard/tables/ExpenseColumns";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function TablesSection() {
  const t = useTranslations();
  const [hrFilter, setHrFilter] = useState("7d");
  const [salaryFilter, setSalaryFilter] = useState("7d");
  const salesManagersColumns = useSalesManagersColumns();
  const expenseColumns = useExpenseColumns();

  // Sample data for Sales Managers
  const salesManagersData: SalesManagerData[] = [
    {
      manager: "Abdul samad johar",
      achieved: "AED 17,856,007",
      target: "AED 17,856,007",
      percentage: "100%",
    },
    {
      manager: "Sarah Ahmed",
      achieved: "AED 15,234,500",
      target: "AED 18,000,000",
      percentage: "85%",
    },
    {
      manager: "Mohammed Ali",
      achieved: "AED 12,567,890",
      target: "AED 15,000,000",
      percentage: "84%",
    },
    {
      manager: "Fatima Hassan",
      achieved: "AED 19,234,567",
      target: "AED 20,000,000",
      percentage: "96%",
    },
    {
      manager: "Ahmed Ibrahim",
      achieved: "AED 14,567,890",
      target: "AED 16,000,000",
      percentage: "91%",
    },
    {
      manager: "Aisha Mohammed",
      achieved: "AED 16,789,123",
      target: "AED 18,500,000",
      percentage: "91%",
    },
  ];

  // Sample data for Expense
  const expenseData: ExpenseData[] = [
    { category: "Office Supplies", amount: 15000, percentage: 25 },
    { category: "Travel", amount: 12000, percentage: 20 },
    { category: "Marketing", amount: 18000, percentage: 30 },
    { category: "Utilities", amount: 8000, percentage: 13 },
    { category: "Equipment", amount: 7000, percentage: 12 },
  ];

  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-1">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm overflow-hidden">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("dashboard.expense")}
            </h4>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <div className="overflow-x-auto">
              <DataTable columns={expenseColumns} data={expenseData} />
            </div>
            <div className="flex items-center justify-center">
              <ExpenseDonutChart data={expenseData} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm overflow-hidden">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("dashboard.salesManagers")}
            </h4>
          </div>
          <div className="overflow-x-auto">
            <DataTable columns={salesManagersColumns} data={salesManagersData} />
          </div>
        </div>
      </div>

      {/* HR and Salary Charts - At the very end */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("dashboard.humanResources")}
            </h4>
            <div className="flex items-center gap-2">
              <ChartFilter onFilterChange={setHrFilter} defaultFilter={hrFilter} />
              <ChartDownload
                chartId="hr-bar-chart"
                chartTitle="Human Resources"
                data={[
                  { month: "APR", Joiners: 4, Leavers: 2 },
                  { month: "MAY", Joiners: 7, Leavers: 5 },
                  { month: "JUN", Joiners: 8, Leavers: 7 },
                  { month: "JUL", Joiners: 3, Leavers: 2 },
                  { month: "AUG", Joiners: 8, Leavers: 3 },
                  { month: "SEP", Joiners: 9, Leavers: 5 },
                  { month: "OCT", Joiners: 5, Leavers: 2 },
                  { month: "DEC", Joiners: 6, Leavers: 4 },
                ]}
              />
            </div>
          </div>
          <HrBar />
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("dashboard.averageSalary")}
            </h4>
            <div className="flex items-center gap-2">
              <ChartFilter onFilterChange={setSalaryFilter} defaultFilter={salaryFilter} />
              <ChartDownload
                chartId="salary-bar-chart"
                chartTitle="Average Salary"
                data={[
                  { department: "Tech", salary: 3200 },
                  { department: "HR", salary: 9500 },
                  { department: "Accounts", salary: 4500 },
                  { department: "Sales", salary: 1800 },
                  { department: "Finance", salary: 2200 },
                  { department: "Marketing", salary: 10100 },
                  { department: "Others", salary: 5500 },
                ]}
              />
            </div>
          </div>
          <SalaryBar />
        </div>
      </div>
    </>
  );
}
