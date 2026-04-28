"use client";
import Tabs from "@/components/shared/ui/Tabs";
import ViewToggleWrapper from "./ViewToggleWrapper";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import { usePageParams } from "@/lib/hooks/usePageParams";

import { productTabs , productSortOptions } from "@/lib/constants";

export default function ProductsHeader() {
  const { activeTab, viewMode, selectedSort } = usePageParams();

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between max-lg:flex-col-reverse max-lg:gap-y-6 ">
        <Tabs
          tabs={productTabs}
          activeTab={activeTab}
          currentSort={selectedSort}
          currentView={viewMode}
        />
        <div className="flex items-center gap-x-4  max-xs:w-full max-xs:justify-between">
          <ViewToggleWrapper />
          <SortDropdownWrapper options={productSortOptions} />
        </div>
      </div>
    </div>
  );
}
