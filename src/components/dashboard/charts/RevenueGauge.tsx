"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

export default function RevenueGauge() {
  const data = [
    { name: "Progress", value: 65, fill: "#7C5CFF" },
    { name: "Remaining", value: 35, fill: "#E5E7EB" }
  ]
  
  const stats = [
    { label: "Today", value: "AED 1.1 M", gross: "25% Gross", chip: "0.45", chipColor: "bg-green-100 text-green-700" },
    { label: "Month to date", value: "AED 1 B", gross: "16% Gross", chip: "0.45", chipColor: "bg-yellow-100 text-yellow-700" },
    { label: "Comparison Monthly", value: "40%", gross: "10% Gross", chip: "0.27", chipColor: "bg-purple-100 text-purple-700" },
  ]
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl font-semibold"><small className="mr-2 text-gray-500">Total</small>50B</h3>
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              startAngle={-90}
              endAngle={90}
              dataKey="value"
            >
              <Cell key="progress" fill="#7C5CFF" />
              <Cell key="remaining" fill="#E5E7EB" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{stat.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{stat.value}</span>
              <span className="text-gray-500">{stat.gross}</span>
              <span className={`rounded px-2 py-1 text-xs font-semibold ${stat.chipColor}`}>
                {stat.chip}
                <svg className="inline ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


