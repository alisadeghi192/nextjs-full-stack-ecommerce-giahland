import Tabs from "@/components/shared/ui/Tabs";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import { blogTabs, blogSortOptions } from "@/lib/constants";

interface BlogHeaderProps {
  activeTab: string;
  selectedSort: string;
}

export default function BlogHeader({ activeTab, selectedSort }: BlogHeaderProps) {
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