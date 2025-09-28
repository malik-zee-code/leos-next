"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ExpenseData {
  category: string;
  amount: number;
  percentage: number;
}

interface ExpenseDonutChartProps {
  data: ExpenseData[];
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"]; // Blue, Green, Orange, Purple, Pink

export function ExpenseDonutChart({ data }: ExpenseDonutChartProps) {
  const chartData = data.map((item, index) => ({
    name: item.category,
    value: item.percentage,
    amount: item.amount,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="w-full max-w-sm mx-auto">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            startAngle={0}
            endAngle={360}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value}%`, name]}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return `${
                  payload[0].payload.name
                }: AED ${payload[0].payload.amount.toLocaleString()}`;
              }
              return label;
            }}
            labelStyle={{ color: "#374151" }}
            contentStyle={{
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="left"
            iconType="circle"
            wrapperStyle={{
              paddingLeft: "20px",
              fontSize: "14px",
              color: "#6B7280",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
