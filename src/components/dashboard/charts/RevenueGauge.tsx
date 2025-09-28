"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function RevenueGauge() {
  const data = [
    { name: "Progress", value: 65, fill: "#7C5CFF" },
    { name: "Remaining", value: 35, fill: "#E5E7EB" },
  ];

  const stats = [
    {
      label: "Today",
      value: "AED 1.1 M",
      gross: "25% Gross",
      chip: "0.45",
      chipColor: "bg-green-100 text-green-700",
    },
    {
      label: "Month to date",
      value: "AED 1 B",
      gross: "16% Gross",
      chip: "0.45",
      chipColor: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Comparison Monthly",
      value: "40%",
      gross: "10% Gross",
      chip: "0.27",
      chipColor: "bg-purple-100 text-purple-700",
    },
  ];

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active: boolean;
    payload: { name: string; value: number }[];
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {payload[0].name}: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4" id="revenue-gauge">
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          <small className="mr-2 text-gray-500 dark:text-gray-400">Total 50B</small>
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                startAngle={180}
                endAngle={0}
                dataKey="value"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              >
                <Cell key="progress" fill="#7C5CFF" />
                <Cell key="remaining" fill="#E5E7EB" />
              </Pie>
              <Tooltip
                content={
                  <CustomTooltip active={true} payload={[{ name: "Progress", value: 65 }]} />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-black dark:text-white">{stat.value}</span>
              <span className="text-gray-500 dark:text-gray-400">{stat.gross}</span>
              <span className={`rounded px-2 py-1 text-xs font-semibold ${stat.chipColor}`}>
                {stat.chip}
                <svg className="inline ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
