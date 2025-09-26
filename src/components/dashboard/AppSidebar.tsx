"use client"

import Image from "next/image"
import Link from "next/link"

export default function AppSidebar() {
  return (
    <aside className="hidden lg:sticky lg:top-0 lg:block lg:h-screen lg:w-64 border-r border-gray-200 bg-white">
      <div className="flex items-center gap-3 px-4 py-4">
        <Image src="/logo/logo.png" alt="Leos" width={120} height={32} />
      </div>
      <nav className="px-3">
        <p className="px-2 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Main</p>
        <Link href="/dashboard" className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100">
          <span className="i-heroicons-home" />
          Dashboard
        </Link>

        <p className="px-2 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Apps</p>
        <div className="space-y-1">
          <button className="w-full rounded-md px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">CRM Apps</button>
          <button className="w-full rounded-md px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">HRM Apps</button>
          <button className="w-full rounded-md px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Ecommerce Admin</button>
        </div>
      </nav>
    </aside>
  )
}


