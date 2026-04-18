"use client";
import Tabs from "@/components/shared/ui/Tabs";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import { usePageParams } from "@/lib/hooks/usePageParams";

const blogTabs = [
  { id: "all", label: "همه" },
  { id: "care", label: "آموزش" },
  { id: "health", label: "سلامت" },
  { id: "propagation", label: "تکثیر و قلمه" },
];

const blogSortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "oldest", label: "قدیمی‌ترین" },
  { value: "most_viewed", label: "پربازدیدترین" },
];

export default function BlogsHeader() {
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