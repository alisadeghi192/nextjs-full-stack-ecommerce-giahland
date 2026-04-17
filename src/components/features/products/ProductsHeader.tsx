import ProductsTabs from "./ProductsTabs";
import ViewToggleWrapper from "./ViewToggleWrapper";
import SortDropdownWrapper from "./SortDropdownWrapper";

interface ProductsHeaderProps {
  activeTab: string;
  viewMode: string;
  selectedSort: string;
}

export default function ProductsHeader({
  activeTab,
  viewMode,
  selectedSort,
}: ProductsHeaderProps) {
  return (
    <div className="flex items-center justify-between max-lg:flex-col-reverse max-lg:gap-y-6">
      <ProductsTabs
        activeTab={activeTab}
        currentView={viewMode}
        currentSort={selectedSort}
      />
      <div className="flex items-center gap-x-4 max-sm:gap-x-2.5">
        <ViewToggleWrapper />
        <SortDropdownWrapper />
      </div>
    </div>
  );
}
