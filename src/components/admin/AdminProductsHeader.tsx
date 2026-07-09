"use client";

import SortDropdown from "@/components/shared/ui/SortDropdown";
import Tabs from "@/components/shared/ui/Tabs";
import { productSortOptions, productTabs } from "@/lib/constants";
import { useUrlParams } from "@/lib/hooks/useUrlParams";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import ViewToggleWrapper from "../shared/ui/ViewToggleWrapper";
import AdminProductSearch from "./AdminProductSearch";

interface AdminProductsHeaderProps {
  activeTab: string;
  selectedSort: string;
  searchQuery: string;
}

export default function AdminProductsHeader({
  activeTab,
  selectedSort,
  searchQuery,
}: AdminProductsHeaderProps) {
  const { set } = useUrlParams();

  const handleSortChange = (value: string) => set("sort", value);

  const isSidebarOpen = useIsSidebarOpen();

  return (
    <div className="mb-3">
      <div
        className={`flex items-center justify-between ${isSidebarOpen ? "max-lg:flex-col" : "max-md:flex-col"} gap-y-3`}
      >
        <Tabs
          tabs={productTabs}
          activeTab={activeTab}
          currentSort={selectedSort}
          usedInPanel={true}
        />
        <div className="max-xs:w-full flex items-center gap-x-4">
          <ViewToggleWrapper usedInPanel={true} />
          <div className="max-xs:w-full w-40">
            <SortDropdown
              selectedSort={selectedSort}
              onSortChange={handleSortChange}
              options={productSortOptions}
              usedInPanel={true}
            />
          </div>
        </div>
      </div>
      <div
        className={`mt-3 w-60 max-md:w-80 ${isSidebarOpen ? "max-lg:mx-auto max-lg:w-90" : "max-md:mx-auto"} max-xs:w-full`}
      >
        <AdminProductSearch defaultValue={searchQuery} />
      </div>
    </div>
  );
}
