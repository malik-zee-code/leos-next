"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function HrBar() {
  const data = [
    { month: "APR", Joiners: 4, Leavers: 2 },
    { month: "MAY", Joiners: 7, Leavers: 5 },
    { month: "JUN", Joiners: 8, Leavers: 7 },
    { month: "JUL", Joiners: 3, Leavers: 2 },
    { month: "AUG", Joiners: 8, Leavers: 3 },
    { month: "SEP", Joiners: 9, Leavers: 5 },
    { month: "OCT", Joiners: 5, Leavers: 2 },
    { month: "DEC", Joiners: 6, Leavers: 4 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="4" stroke="#f0f0f0" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Joiners" fill="#E354D4" name="Joiners" />
        <Bar dataKey="Leavers" fill="#2563EB" name="Leavers" />
      </BarChart>
    </ResponsiveContainer>
  )
}


