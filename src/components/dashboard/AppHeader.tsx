"use client"

import Image from "next/image"

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm lg:ml-64">
      <div className="flex items-center gap-3">
        <button className="lg:hidden rounded-md border border-gray-200 px-3 py-1 text-sm">Menu</button>
        <div className="relative">
          <input className="h-10 w-[320px] max-w-[50vw] rounded-md border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-gray-300" placeholder="Search..." />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="h-10 w-10 rounded-full border border-gray-200 grid place-items-center"><span className="ri-global-line" /></button>
        <button className="h-10 w-10 rounded-full border border-gray-200 grid place-items-center"><span className="ri-sun-line" /></button>
        <button className="h-10 w-10 rounded-full border border-gray-200 overflow-hidden">
          <Image src="/FIGMA-DESIGN/assets/images/avatar/avatar-thumb-001.webp" alt="user" width={40} height={40} />
        </button>
      </div>
    </header>
  )
}


