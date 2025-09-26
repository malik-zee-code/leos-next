"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

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
  ]

  const formatCurrency = (value: number) => `AED ${value.toLocaleString()}`

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="4" stroke="#f0f0f0" />
        <XAxis dataKey="project" />
        <YAxis tickFormatter={formatCurrency} />
        <Tooltip formatter={(value: number) => formatCurrency(value)} />
        <Legend />
        <Bar dataKey="Escrow" fill="#7C5CFF" name="Escrow" />
        <Bar dataKey="Non-Escrow" fill="#34D399" name="Non-Escrow" />
      </BarChart>
    </ResponsiveContainer>
  )
}
