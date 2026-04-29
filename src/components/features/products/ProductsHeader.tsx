import Tabs from "@/components/shared/ui/Tabs";
import { productSortOptions, productTabs } from "@/lib/constants";
import ViewToggleWrapper from "./ViewToggleWrapper";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";

interface ProductsHeaderProps {
  activeTab: string;
  selectedSort: string;
  viewMode: string;
}

export default function ProductsHeader({
  activeTab,
  selectedSort,
  viewMode,
}: ProductsHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between max-lg:flex-col-reverse max-lg:gap-y-6">
        <Tabs
          tabs={productTabs}
          activeTab={activeTab}
          currentSort={selectedSort}
          currentView={viewMode}
        />
        <div className="flex items-center gap-x-4 max-xs:w-full max-xs:justify-between">
          <ViewToggleWrapper />
          <SortDropdownWrapper options={productSortOptions} />
        </div>
      </div>
    </div>
  );
}