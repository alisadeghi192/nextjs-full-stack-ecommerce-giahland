"use client";

import ConsultationSearch from "@/components/features/consultations/ConsultationSearch";
import SectionTitle from "@/components/panel/SectionTitle";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import { consultationSortOptions } from "@/lib/constants";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import Link from "next/link";

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
    <div className={`mb-4 flex items-center justify-between  ${isSideBarOpen ? "max-lg:flex-wrap" : "max-md:flex-wrap"}`}>
      <SectionTitle title="مشاوره های من" className="mb-0! shrink-0" />
      <div className={`flex items-center justify-between w-full  ${isSideBarOpen ? "max-lg:mt-4 max-lg:gap-x-3 max-lg:order-3" : "max-md:mt-4 max-md:gap-x-3 max-md:order-3"} `}>
        <div className={`${isSideBarOpen ? "lg:mr-3 max-lg:basis-1/2" : "md:mr-3 max-md:basis-1/2"}`}>
          <ConsultationSearch defaultValue={searchQuery} />
        </div>
        <div className={`w-34.5 ${isSideBarOpen ? `${isDoctor ? '' : "lg:ml-3"} max-lg:basis-1/2` : `${isDoctor ? '' : "md:ml-3"} max-md:basis-1/2`}`}>
          <SortDropdownWrapper
            options={consultationSortOptions}
            usedInConsultation={true}
          />
        </div>
      </div>
      <Link
        href="/user/consultations"
        className={`text-primary border-primary flex h-10 shrink-0 items-center justify-center rounded-xl border px-6 text-center text-base font-medium transition-all ${isDoctor ? "hidden" : ""} `}
      >
        مشاوره جدید
      </Link>
    </div>
  );
}
