"use client";

import ConsultationSearch from "@/components/features/consultations/ConsultationSearch";
import SectionTitle from "@/components/panel/SectionTitle";
import OutlineButton from "@/components/shared/ui/OutlineButton";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import { consultationSortOptions } from "@/lib/constants";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";

interface ConsultationsListHeaderProps {
  searchQuery: string;
  isDoctor: boolean;
  onSearch?: (value: string) => void;
}

export default function ConsultationsListHeader({
  searchQuery,
  isDoctor,
}: ConsultationsListHeaderProps) {
  const isSideBarOpen = useIsSidebarOpen();
  return (
    <div
      className={`mb-4 flex items-center justify-between ${isSideBarOpen ? "max-lg:flex-wrap" : "max-md:flex-wrap"}`}
    >
      <SectionTitle title="مشاوره های من" className="mb-0! shrink-0" />
      <div
        className={`flex w-full items-center justify-between ${isSideBarOpen ? "max-lg:order-3 max-lg:mt-4 max-lg:gap-x-3" : "max-md:order-3 max-md:mt-4 max-md:gap-x-3"} `}
      >
        <div
          className={`${isSideBarOpen ? "max-lg:basis-1/2 lg:mr-3" : "max-md:basis-1/2 md:mr-3"}`}
        >
          <ConsultationSearch defaultValue={searchQuery} />
        </div>
        <div
          className={`w-34.5 ${isSideBarOpen ? `${isDoctor ? "" : "lg:ml-3"} max-lg:basis-1/2` : `${isDoctor ? "" : "md:ml-3"} max-md:basis-1/2`}`}
        >
          <SortDropdownWrapper
            options={consultationSortOptions}
            usedInPanel={true}
          />
        </div>
      </div>
      <OutlineButton
        href="/user/consultations"
        className={`h-10 shrink-0 px-6 text-center text-base font-medium ${isDoctor ? "hidden" : ""} `}
      >
        مشاوره جدید
      </OutlineButton>
    </div>
  );
}
