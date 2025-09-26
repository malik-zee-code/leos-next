"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function SalaryBar() {
  const data = [
    { department: "Tech", salary: 3200 },
    { department: "HR", salary: 9500 },
    { department: "Accounts", salary: 4500 },
    { department: "Sales", salary: 1800 },
    { department: "Finance", salary: 2200 },
    { department: "Marketing", salary: 10100 },
    { department: "Others", salary: 5500 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="4" stroke="#f0f0f0" />
        <XAxis dataKey="department" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="salary" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  )
}


