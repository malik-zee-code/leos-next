"use client"

import AppSidebar from "@/components/dashboard/AppSidebar"
import AppHeader from "@/components/dashboard/AppHeader"
import AppFooter from "@/components/dashboard/AppFooter"
import StatCard from "@/components/dashboard/cards/StatCard"
import RevenueGauge from "@/components/dashboard/charts/RevenueGauge"
import HrMiniStats from "@/components/dashboard/cards/HrMiniStats"
import SocialFollowers from "@/components/dashboard/cards/SocialFollowers"
import HrBar from "@/components/dashboard/charts/HrBar"
import SalaryBar from "@/components/dashboard/charts/SalaryBar"
import SalesManagersTable from "@/components/dashboard/tables/SalesManagersTable"
import ExpenseCard from "@/components/dashboard/cards/ExpenseCard"
import CollectionSegregationChart from "@/components/dashboard/charts/CollectionSegregationChart"
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function DashboardPage() {
  const donutData = [
    { name: "Escrow", value: 5310000, fill: "#19A0FB" },
    { name: "Non-Escrow", value: 1540000, fill: "#00D084" }
  ]

  const barData = [
    { project: "HH", "Res Amount": 500000, "Cancel Amount": 130000 },
    { project: "WG", "Res Amount": 220000, "Cancel Amount": 130000 },
    { project: "CS", "Res Amount": 300000, "Cancel Amount": 50000 },
    { project: "WG2", "Res Amount": 130000, "Cancel Amount": 5000 },
    { project: "WG3", "Res Amount": 50000, "Cancel Amount": 500000 },
    { project: "WG4", "Res Amount": 380000, "Cancel Amount": 130000 },
    { project: "WG5", "Res Amount": 420000, "Cancel Amount": 220000 },
    { project: "KB1", "Res Amount": 200000, "Cancel Amount": 20000 },
    { project: "KB2", "Res Amount": 130000, "Cancel Amount": 130000 },
    { project: "KG", "Res Amount": 50000, "Cancel Amount": 5000 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="flex">
        <AppSidebar />
        <main className="w-full ">
          <div className="mx-auto max-w-7xl p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                label="Yesterday Revenue" 
                value="1.5M" 
                chip={{ text: "+5%", tone: "green" }} 
                subtitle="1M New Reservations | 0.5 Collections"
                icon="/dashboard/revenue.svg"
                iconBg="bg-green-400"
              />
              <StatCard 
                label="yesterday Pay Out" 
                value="5M" 
                chip={{ text: "-1%", tone: "red" }} 
                subtitle="1M Operational Expenses | 1M Construction | 1M Land Purchases"
                icon="/dashboard/payout.svg"
                iconBg="bg-yellow-400"
              />
              <StatCard 
                label="Cash Reserves" 
                value="1.1B" 
                chip={{ text: "+5%", tone: "green" }} 
                subtitle="5M Escrow | 3M Non-Escrow"
                icon="/dashboard/cash_reserved.svg"
                iconBg="bg-purple-400"
              />
              <StatCard 
                label="Headcount" 
                value="400" 
                subtitle="390 Dubai | 50 Pakistan | 5 Egypt"
                icon="/dashboard/headcount.svg"
                iconBg="bg-blue-400"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">Revenue</h4>
                </div>
                <RevenueGauge />
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between"><h4 className="text-lg font-semibold text-gray-900">Human Resources</h4></div>
                <HrMiniStats />
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between"><h4 className="text-lg font-semibold text-gray-900">Social Media followers</h4></div>
                <SocialFollowers />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">Reservations & Cancellations (by Project)</h4>
                </div>
                <div className="mt-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="4" stroke="#f0f0f0" />
                      <XAxis dataKey="project" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Res Amount" fill="#7C5CFF" name="Res Amount" />
                      <Bar dataKey="Cancel Amount" fill="#34D399" name="Cancel Amount" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:col-span-2">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">Collections</h4>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width={320} height={320}>
                      <PieChart>
                        <Pie
                          data={donutData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          dataKey="value"
                        >
                          <Cell key="escrow" fill="#19A0FB" />
                          <Cell key="non-escrow" fill="#00D084" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="overflow-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="text-gray-700">
                        <tr><th>Projects</th><th>Escrow</th><th>Non-Escrow</th></tr>
                      </thead>
                      <tbody className="text-gray-900">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <tr key={i} className="border-t border-gray-100">
                            <td className="py-2">HH</td>
                            <td>1,400,000</td>
                            <td>700,000</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

           

            
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">Collection Segregation by project</h4>
              </div>
              <CollectionSegregationChart />
            </div>

           
            <div className="mt-4">
              <ExpenseCard />
            </div>

            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between"><h4 className="text-lg font-semibold text-gray-900">Sales Managers Performance</h4></div>
              <SalesManagersTable />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between"><h4 className="text-lg font-semibold text-gray-900">Human Resources</h4></div>
                <HrBar />
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between"><h4 className="text-lg font-semibold text-gray-900">Average Salary, Department Wise (in AED)</h4></div>
                <SalaryBar />
              </div>
            </div>

            <AppFooter />
          </div>
        </main>
      </div>
    </div>
  )
}


