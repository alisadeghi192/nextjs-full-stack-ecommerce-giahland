"use client"
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import CategoryPieChart from "./CategoryPieChart";
import SaleChartSection from "./SaleChartSection";

export default function DashboardCharts() {
  const isSidebarOpen = useIsSidebarOpen()
  return (
    <div className={`grid grid-cols-3 ${isSidebarOpen?"max-lg:grid-cols-1 max-lg:gap-x-0 ":"max-md:grid-cols-1 max-md:gap-x-0"} gap-4`}>
      <div className="col-span-2">
        <SaleChartSection />
      </div>
      <div>
        <CategoryPieChart /> 
      </div>
    </div>
  );
}
