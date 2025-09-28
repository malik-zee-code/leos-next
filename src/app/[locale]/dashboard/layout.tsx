import AppHeader from "@/components/dashboard/AppHeader";
import AppSidebar from "@/components/dashboard/AppSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  console.log("DashboardLayout");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden">
      <AppHeader />
      <div className="flex">
        <AppSidebar />
        <main className="w-full pt-16 min-w-0">
          <div className="p-4 max-w-full overflow-x-hidden">{children}</div>
        </main>
      </div>
    </div>
  );
}
