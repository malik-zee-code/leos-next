"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import RevenueGauge from "@/components/dashboard/charts/RevenueGauge";
import HrMiniStats from "@/components/dashboard/cards/HrMiniStats";
import SocialFollowers from "@/components/dashboard/cards/SocialFollowers";
import ChartFilter from "@/components/ChartFilter";
import ChartDownload from "@/components/ChartDownload";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataTable } from "@/components/ui/data-table/DataTable";
import {
  useReservationsColumns,
  type ReservationData,
} from "@/components/dashboard/tables/ReservationsColumns";
import {
  useCollectionsColumns,
  type CollectionData,
} from "@/components/dashboard/tables/CollectionsColumns";

export function ChartsSectionClient() {
  const t = useTranslations();
  const [revenueFilter, setRevenueFilter] = useState("7d");
  const [collectionsFilter, setCollectionsFilter] = useState("7d");
  const [reservationsFilter, setReservationsFilter] = useState("7d");
  const reservationsColumns = useReservationsColumns();
  const collectionsColumns = useCollectionsColumns();

  // Sample data for chart
  const barData = [
    { project: "HH", "Res Amount": 500000, "Cancel Amount": 200000 },
    { project: "WG1", "Res Amount": 300000, "Cancel Amount": 150000 },
    { project: "WG2", "Res Amount": 400000, "Cancel Amount": 100000 },
    { project: "WG3", "Res Amount": 50000, "Cancel Amount": 500000 },
    { project: "WG4", "Res Amount": 380000, "Cancel Amount": 130000 },
    { project: "WG5", "Res Amount": 420000, "Cancel Amount": 220000 },
    { project: "KB1", "Res Amount": 200000, "Cancel Amount": 20000 },
    { project: "KB2", "Res Amount": 130000, "Cancel Amount": 130000 },
    { project: "KG", "Res Amount": 50000, "Cancel Amount": 5000 },
  ];

  // Sample data for table
  const reservationsData: ReservationData[] = [
    { project: "HH", resUnits: 1, cnclUnits: 1, resAmount: 500000, cnclAmount: 200000 },
    { project: "WG1", resUnits: 2, cnclUnits: 1, resAmount: 300000, cnclAmount: 150000 },
    { project: "WG2", resUnits: 3, cnclUnits: 2, resAmount: 400000, cnclAmount: 100000 },
    { project: "WG3", resUnits: 4, cnclUnits: 3, resAmount: 50000, cnclAmount: 500000 },
    { project: "WG4", resUnits: 5, cnclUnits: 2, resAmount: 380000, cnclAmount: 130000 },
    { project: "WG5", resUnits: 6, cnclUnits: 4, resAmount: 420000, cnclAmount: 220000 },
    { project: "KB1", resUnits: 7, cnclUnits: 1, resAmount: 200000, cnclAmount: 20000 },
    { project: "KB2", resUnits: 8, cnclUnits: 5, resAmount: 130000, cnclAmount: 130000 },
    { project: "KG", resUnits: 9, cnclUnits: 1, resAmount: 50000, cnclAmount: 5000 },
  ];

  const donutData = [
    { name: "Escrow", value: 23100000, color: "#7C5CFF" },
    { name: "Non-Escrow", value: 15400000, color: "#00D084" },
  ];

  // Sample data for collections table
  const collectionsData: CollectionData[] = [
    { project: "HH", escrow: 1400000, nonEscrow: 700000 },
    { project: "WG1", escrow: 1200000, nonEscrow: 800000 },
    { project: "WG2", escrow: 900000, nonEscrow: 600000 },
    { project: "WG3", escrow: 1100000, nonEscrow: 500000 },
    { project: "WG4", escrow: 800000, nonEscrow: 400000 },
    { project: "WG5", escrow: 1300000, nonEscrow: 700000 },
  ];

  const collectionSegregationData = [
    { project: "Project ABC", Escrow: 55000, "Non-Escrow": 65000 },
    { project: "Cavendish Squa..", Escrow: 90000, "Non-Escrow": 89000 },
    { project: "Hadley Heights", Escrow: 62000, "Non-Escrow": 68000 },
    { project: "Hadley Heights", Escrow: 75000, "Non-Escrow": 75000 },
    { project: "Kensington Gar..", Escrow: 35000, "Non-Escrow": 38000 },
    { project: "Kensington P...", Escrow: 57000, "Non-Escrow": 67000 },
    { project: "Kensington P...", Escrow: 90000, "Non-Escrow": 90000 },
    { project: "The old Courth.", Escrow: 60000, "Non-Escrow": 65000 },
    { project: "Weybridge Gar..", Escrow: 75000, "Non-Escrow": 75000 },
    { project: "Weybridge Gar..", Escrow: 35000, "Non-Escrow": 38000 },
    { project: "Weybridge Gar..", Escrow: 115000, "Non-Escrow": 70000 },
    { project: "Weybridge Gar..", Escrow: 30000, "Non-Escrow": 35000 },
    { project: "Weybridge Gar..", Escrow: 28000, "Non-Escrow": 32000 },
  ];

  return (
    <>
      {/* Revenue, HR, and Social Media */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("dashboard.revenue")}
            </h4>
            <div className="flex items-center gap-2">
              <ChartFilter onFilterChange={setRevenueFilter} defaultFilter={revenueFilter} />
              <ChartDownload chartId="revenue-gauge" chartTitle="Revenue" />
            </div>
          </div>
          <RevenueGauge />
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("dashboard.humanResources")}
            </h4>
          </div>
          <HrMiniStats />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("dashboard.socialMedia")}
              </h4>
            </div>
            <SocialFollowers />
          </div>
        </div>
      </div>

      {/* Reservations & Cancellations and Collections */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("dashboard.reservations")}
            </h4>
            <div className="flex items-center gap-2">
              <ChartFilter
                onFilterChange={setReservationsFilter}
                defaultFilter={reservationsFilter}
              />
              <ChartDownload
                chartId="reservations-chart"
                chartTitle="Reservations & Cancellations"
                data={barData}
              />
            </div>
          </div>
          <div className="mt-2 text-xs">
            <div id="reservations-chart">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="4" stroke="#f0f0f0" />
                  <XAxis dataKey="project" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Res Amount" fill="#7C5CFF" name={t("charts.resAmount")} />
                  <Bar dataKey="Cancel Amount" fill="#34D399" name={t("charts.cancelAmount")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <DataTable columns={reservationsColumns} data={reservationsData} />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("dashboard.collections")}
            </h4>
            <div className="flex items-center gap-2">
              <ChartFilter
                onFilterChange={setCollectionsFilter}
                defaultFilter={collectionsFilter}
              />
              <ChartDownload
                chartId="collections-chart"
                chartTitle="Collections"
                data={donutData}
              />
            </div>
          </div>
          <div className="flex items-center justify-center text-xs">
            <div id="collections-chart">
              <ResponsiveContainer width={320} height={320}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <DataTable columns={collectionsColumns} data={collectionsData} />
          </div>
        </div>
      </div>

      {/* Collection Segregation by Project */}
      <div className="mt-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("dashboard.collectionSegregation")}
            </h4>
            <div className="flex items-center gap-2">
              <ChartFilter
                onFilterChange={setCollectionsFilter}
                defaultFilter={collectionsFilter}
              />
              <ChartDownload
                chartId="collection-segregation-chart"
                chartTitle="Collection Segregation"
                data={collectionSegregationData}
              />
            </div>
          </div>
          <div className="mt-2 text-xs">
            <div id="collection-segregation-chart">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={collectionSegregationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="4" stroke="#f0f0f0" />
                  <XAxis dataKey="project" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Escrow" fill="#1E40AF" name={t("tables.escrow")} />
                  <Bar dataKey="Non-Escrow" fill="#3B82F6" name={t("tables.nonEscrow")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
