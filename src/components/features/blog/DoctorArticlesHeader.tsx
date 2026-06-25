"use client";

import SectionTitle from "@/components/panel/SectionTitle";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import Tabs from "@/components/shared/ui/Tabs";
import { blogSortOptions, blogTabs } from "@/lib/constants";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import Link from "next/link";

interface DoctorArticlesHeaderProps {
  activeTab: string;
  selectedSort: string;
}

export default function DoctorArticlesHeader({
  activeTab,
  selectedSort,
}: DoctorArticlesHeaderProps) {
  const isOpenSidebar = useIsSidebarOpen();
  return (
    <div
      className="flex flex-wrap items-center gap-y-4 mb-6 max-xs:mb-4"
    >
      <SectionTitle
        title="مقاله های من"
        className={`mb-0! ${isOpenSidebar ? "max-xl:basis-1/2" : "max-lg:basis-1/2"} max-xs:basis-auto ml-4`}
      />
      <div
        className={`${isOpenSidebar ? "max-xl:order-2 max-lg:mx-auto" : "max-[550px]:mx-auto max-lg:order-2"} `}
      >
        <Tabs
          tabs={blogTabs}
          activeTab={activeTab}
          currentSort={selectedSort}
          usedInPanel={true}
        />
      </div>

      <div
        className={`mr-auto w-37.5 ${isOpenSidebar ? "max-xl:order-3 max-lg:w-full" : "max-[550px]:w-full max-lg:order-3"} `}
      >
        <SortDropdownWrapper options={blogSortOptions} usedInPanel={true} />
      </div>
      <Link
        href="/user/articles/new"
        className={`text-primary border-primary relative mr-4 flex h-10 w-37.5 items-center justify-center rounded-xl border text-center font-medium ${isOpenSidebar ? "max-xl:order-1 max-xl:mr-auto" : "max-lg:order-1 max-lg:mr-auto"}`}
      >
        مقاله جدید
      </Link>
    </div>
  );
}
