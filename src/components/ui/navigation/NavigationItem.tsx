import Link from "next/link";
import { ReactNode } from "react";

interface NavigationItemProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  isActive?: boolean;
}

export function NavigationItem({ href, icon, children, isActive = false }: NavigationItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "text-orange-600 bg-orange-50"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
