type StatCardProps = {
  label: string
  value: string
  chip?: { text: string; tone: "green" | "red" | "blue" }
  subtitle?: string
  icon?: string
  iconBg?: string
}

export default function StatCard({ label, value, chip, subtitle, icon, iconBg }: StatCardProps) {
  const chipClasses =
    chip?.tone === "green"
      ? "bg-green-100 text-green-700"
      : chip?.tone === "red"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700"
  
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${iconBg || 'bg-gray-100'}`}>
          {icon && <img src={icon} alt="" className="h-6 w-6" />}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <div className="flex items-end gap-2">
            <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
            {chip && (
              <span className={`rounded px-2 py-0.5 text-xs font-semibold ${chipClasses}`}>{chip.text}</span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-gray-600">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}