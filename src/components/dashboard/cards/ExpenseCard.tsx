"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartFilter from "@/components/ChartFilter";
import ChartDownload from "@/components/ChartDownload";
import { useState } from "react";

export default function ExpenseCard() {
  const [expenseFilter, setExpenseFilter] = useState("This Month");

  const donutData = [
    { name: "Operations expenses", value: 60, fill: "#1A73E8" },
    { name: "Land purchases", value: 25, fill: "#10B981" },
    { name: "Construction payouts", value: 15, fill: "#F59E0B" },
  ];

  const rows = Array.from({ length: 9 }).map(() => ({
    desc: "Payroll",
    class: "Operations expenses",
    amount: "20,000,000",
  }));

  const formatCurrency = (value: number) => `AED ${value.toLocaleString()}`;

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            Amount: {formatCurrency(payload[0].value * 1000000)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Expense</h4>
        <div className="flex items-center gap-2">
          <ChartFilter onFilterChange={setExpenseFilter} defaultFilter={expenseFilter} />
          <ChartDownload chartId="expense-chart" chartTitle="Expense" data={donutData} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-700 dark:text-gray-300">
              <tr>
                <th className="py-2">Description</th>
                <th className="py-2">Classification</th>
                <th className="py-2">Amount AED</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 dark:text-gray-100">
              {rows.map((r, idx) => (
                <tr key={idx} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="py-2">{r.desc}</td>
                  <td className="py-2">{r.class}</td>
                  <td className="py-2">{r.amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="text-gray-900 dark:text-gray-100">
              <tr className="border-t-2 border-gray-300 dark:border-gray-600 font-semibold">
                <td className="py-2">&nbsp;</td>
                <td className="py-2">Grand Total</td>
                <td className="py-2">15,400,000</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div id="expense-chart">
            <ResponsiveContainer width={360} height={360}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Cell key="operations" fill="#1A73E8" />
                  <Cell key="land" fill="#10B981" />
                  <Cell key="construction" fill="#F59E0B" />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
