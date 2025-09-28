import Link from "next/link";
import { ReactNode } from "react";

interface NavigationSubItemProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}

export function NavigationSubItem({ href, icon, children }: NavigationSubItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      {icon}
      {children}
    </Link>
  );
}
