"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function SalaryBar() {
  const data = [
    { department: "Tech", salary: 3200 },
    { department: "HR", salary: 9500 },
    { department: "Accounts", salary: 4500 },
    { department: "Sales", salary: 1800 },
    { department: "Finance", salary: 2200 },
    { department: "Marketing", salary: 10100 },
    { department: "Others", salary: 5500 },
  ];

  const formatSalary = (value: number) => `AED ${value.toLocaleString()}`;

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              Average Salary: {formatSalary(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="salary-bar-chart">
      <ResponsiveContainer width="100%" height={300} className={"text-xs"}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="4" stroke="#f0f0f0" />
          <XAxis dataKey="department" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={formatSalary} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="salary"
            fill="#10B981"
            radius={[2, 2, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
