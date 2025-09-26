"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

export default function ExpenseCard() {
  const donutData = [
    { name: "Operations expenses", value: 60, fill: "#1A73E8" },
    { name: "Land purchases", value: 25, fill: "#10B981" },
    { name: "Construction payouts", value: 15, fill: "#F59E0B" }
  ]

  const rows = Array.from({ length: 9 }).map(() => ({
    desc: "Payroll",
    class: "Operations expenses",
    amount: "20,000,000",
  }))

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900">Expense</h4>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-700">
              <tr>
                <th>Description</th>
                <th>Classification</th>
                <th>Amount AED</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {rows.map((r, idx) => (
                <tr key={idx} className="border-t border-gray-100">
                  <td className="py-2">{r.desc}</td>
                  <td>{r.class}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
            </tbody>
            <thead className="text-gray-900">
              <tr>
                <th>&nbsp;</th>
                <th>Grand Total</th>
                <th>15,400,000</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width={360} height={360}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
              >
                <Cell key="operations" fill="#1A73E8" />
                <Cell key="land" fill="#10B981" />
                <Cell key="construction" fill="#F59E0B" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}


