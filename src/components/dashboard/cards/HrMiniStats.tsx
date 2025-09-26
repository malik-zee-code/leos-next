export default function HrMiniStats() {
  const items = [
    { title: "Head Count", value: "400", trend: "+0.45%", trendTone: "green" },
    { title: "Avg Daily Attendance", value: "80%", trend: "+1.10%", trendTone: "purple" },
    { title: "New Hired (MTD)", value: "4", trend: "+0.45%", trendTone: "green" },
  ]
  const trendClass = (tone: string) =>
    tone === "green" ? "text-green-600" : tone === "purple" ? "text-purple-600" : "text-gray-600"
  return (
    <ul className="space-y-4">
      {items.map((i) => (
        <li key={i.title} className="flex items-center justify-between">
          <div className="flex-1">
            <span className="block text-xs text-gray-600 mb-1">{i.title}</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-gray-900">{i.value}</span>
              <span className={`text-xs ${trendClass(i.trendTone)}`}>{i.trend}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-16 rounded bg-gray-100" />
            <span className="text-xs text-gray-500">See more →</span>
          </div>
        </li>
      ))}
    </ul>
  )
}


