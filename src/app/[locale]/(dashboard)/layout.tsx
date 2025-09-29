import AppHeader from "@/components/dashboard/AppHeader";
import AppSidebar from "@/components/dashboard/AppSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  console.log("DashboardLayout");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <AppHeader />
      <div className="pt-16 flex">
        <AppSidebar />
        <main className="flex-1 min-w-0 overflow-x-hidden lg:ml-64 ">
          <div className="p-4 max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
