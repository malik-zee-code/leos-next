import { StatCardsSection } from "@/components/dashboard/sections/StatCardsSection";
import { ChartsSection } from "@/components/dashboard/sections/ChartsSection";
import { TablesSection } from "@/components/dashboard/sections/TablesSection";
import AppFooter from "@/components/dashboard/AppFooter";
import { ProtectedRoute } from "@/components/guards/ProtectedRoute";

export default function DashboardPage() {
  console.log("DashboardPage");

  return (
    <ProtectedRoute>
      <StatCardsSection />
      <ChartsSection />
      <TablesSection />
      <AppFooter />
    </ProtectedRoute>
  );
}
