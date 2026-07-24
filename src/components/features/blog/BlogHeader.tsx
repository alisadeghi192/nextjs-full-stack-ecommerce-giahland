import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import Tabs from "@/components/shared/ui/Tabs";
import { BLOG_SORT_OPTIONS, BLOG_TABS } from "@/lib/constants";

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
          tabs={BLOG_TABS}
          activeTab={activeTab}
          currentSort={selectedSort}
        />
        <SortDropdownWrapper options={BLOG_SORT_OPTIONS} />
      </div>
    </div>
  );
}
