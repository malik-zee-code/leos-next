import Image from "next/image";
import { AppSidebarNavigation } from "./navigation/AppSidebarNavigation";

export default function AppSidebar() {
  return (
    <aside className="hidden lg:fixed lg:top-16 lg:left-0 lg:block lg:h-[calc(100vh-4rem)] lg:w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-40">
      <div className="flex lg:hidden items-center gap-3 px-4 py-4">
        <Image src="/logo/logo.png" alt="Leos" width={120} height={32} />
      </div>
      <AppSidebarNavigation />
    </aside>
  );
}
