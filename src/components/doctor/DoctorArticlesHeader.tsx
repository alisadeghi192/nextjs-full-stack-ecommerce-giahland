"use client";

import SectionTitle from "@/components/panel/SectionTitle";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import Tabs from "@/components/shared/ui/Tabs";
import { useIsAdmin } from "@/features/auth/selectors/auth.selectors";
import { blogSortOptions, blogTabs } from "@/lib/constants";
import { toPersianNumber } from "@/lib/utils/format";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import { FaPlus } from "react-icons/fa6";
import OutlineButton from "../shared/ui/OutlineButton";

interface DoctorArticlesHeaderProps {
  activeTab: string;
  selectedSort: string;
  total: number;
}

export default function DoctorArticlesHeader({
  activeTab,
  selectedSort,
  total,
}: DoctorArticlesHeaderProps) {
  const isOpenSidebar = useIsSidebarOpen();
  const isAdmin = useIsAdmin();
  return (
    <div className="max-xs:mb-4 mb-6 flex flex-wrap items-center gap-y-4">
      <SectionTitle
        title={isAdmin ? `مدیریت مقاله‌ها (${toPersianNumber(total)})` : "مقاله‌های من"}
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
      <OutlineButton
        href={`/${isAdmin ? "admin" : "user"}/articles/new`}
        className={`relative gap-x-1 mr-4 h-10 w-37.5 text-center font-medium ${isOpenSidebar ? "max-xl:order-1 max-xl:mr-auto" : "max-lg:order-1 max-lg:mr-auto"}`}
      >
        مقاله جدید
        <FaPlus className="size-4" />
      </OutlineButton>
    </div>
  );
}
