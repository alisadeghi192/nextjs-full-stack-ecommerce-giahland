"use client";
import Tabs from "@/components/shared/ui/Tabs";
import ViewToggleWrapper from "./ViewToggleWrapper";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import { usePageParams } from "@/lib/hooks/usePageParams";

const productTabs = [
  { id: "all", label: "همه" },
  { id: "indoor", label: "آپارتمانی" },
  { id: "decoration", label: "تزئینی" },
  { id: "gift", label: "کادویی" },
  { id: "discounted", label: "تخفیف دار" },
];

const productSortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "price_asc", label: "ارزان‌ترین" },
  { value: "price_desc", label: "گران‌ترین" },
  { value: "popular", label: "محبوب‌ترین" },
];

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
