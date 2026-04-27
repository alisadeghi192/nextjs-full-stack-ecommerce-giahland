"use client";
import Tabs from "@/components/shared/ui/Tabs";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import { usePageParams } from "@/lib/hooks/usePageParams";
import { blogTabs, blogSortOptions } from "@/lib/constants";

export default function BlogHeader() {
  const { activeTab, selectedSort } = usePageParams();

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between max-lg:flex-col-reverse max-lg:gap-y-6">
        <Tabs
          tabs={blogTabs}
          activeTab={activeTab}
          currentSort={selectedSort}
        />
        <SortDropdownWrapper options={blogSortOptions} />
      </div>
    </div>
  );
}
