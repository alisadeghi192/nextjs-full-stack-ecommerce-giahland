import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import Tabs from "@/components/shared/ui/Tabs";
import ViewToggleWrapper from "@/components/shared/ui/ViewToggleWrapper";
import { PRODUCT_SORT_OPTIONS, PRODUCT_TABS } from "@/lib/constants";

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
    <div className="mb-6 max-xs:mb-4">
      <div className="flex items-center justify-between max-md:flex-col max-lg:gap-y-6 max-xs:gap-y-4">
        <Tabs
          tabs={PRODUCT_TABS}
          activeTab={activeTab}
          currentSort={selectedSort}
          currentView={viewMode}
        />
        <div className="flex items-center gap-x-4 max-xs:w-full max-xs:justify-between">
          <ViewToggleWrapper />
          <SortDropdownWrapper options={PRODUCT_SORT_OPTIONS} />
        </div>
      </div>
    </div>
  );
}