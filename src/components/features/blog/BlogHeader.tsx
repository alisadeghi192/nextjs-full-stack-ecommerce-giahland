import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import Tabs from "@/components/shared/ui/Tabs";
import { blogSortOptions, blogTabs } from "@/lib/constants";

interface BlogHeaderProps {
  activeTab: string;
  selectedSort: string;
}

export default function BlogHeader({
  activeTab,
  selectedSort,
}: BlogHeaderProps) {
  return (
    <div className="mb-6 max-xs:mb-4">
      <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-y-6 max-xs:gap-y-4">
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
