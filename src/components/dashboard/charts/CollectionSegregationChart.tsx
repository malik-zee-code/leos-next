"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CollectionSegregationChart() {
  const data = [
    { project: "Project ABC", Escrow: 55000, "Non-Escrow": 65000 },
    { project: "Cavendish Squa..", Escrow: 90000, "Non-Escrow": 90000 },
    { project: "Hadley Heights", Escrow: 60000, "Non-Escrow": 65000 },
    { project: "Hadley Heights", Escrow: 70000, "Non-Escrow": 75000 },
    { project: "Kensington Gar..", Escrow: 35000, "Non-Escrow": 38000 },
    { project: "Kensington P...", Escrow: 58000, "Non-Escrow": 65000 },
    { project: "Kensington P...", Escrow: 90000, "Non-Escrow": 55000 },
    { project: "The old Courth..", Escrow: 60000, "Non-Escrow": 65000 },
    { project: "Weybridge Gar..", Escrow: 75000, "Non-Escrow": 75000 },
    { project: "Weybridge Gar..", Escrow: 35000, "Non-Escrow": 38000 },
    { project: "Weybridge Gar..", Escrow: 115000, "Non-Escrow": 70000 },
    { project: "Weybridge Gar..", Escrow: 60000, "Non-Escrow": 65000 },
    { project: "Weybridge Gar..", Escrow: 28000, "Non-Escrow": 32000 },
  ];

  const formatCurrency = (value: number) => `AED ${value.toLocaleString()}`;

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
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="collection-segregation-chart">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="4" stroke="#f0f0f0" />
          <XAxis
            dataKey="project"
            className="text-black"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="Escrow"
            fill="#7C5CFF"
            name="Escrow"
            radius={[2, 2, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
          <Bar
            dataKey="Non-Escrow"
            fill="#34D399"
            name="Non-Escrow"
            radius={[2, 2, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
