"use client";

import PanelSearch from "@/components/shared/ui/PanelSearch";
import SortDropdown from "@/components/shared/ui/SortDropdown";
import { CONSULTATION_STATUS_OPTIONS } from "@/lib/constants";
import { useUrlParams } from "@/lib/hooks/useUrlParams";


export default function AdminConsultationsHeader() {
  const { get, set } = useUrlParams();

  const status = get("status") || "all";
  const search = get("search") || "";

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
      <div className="flex items-center gap-3 max-sm:flex-col max-sm:gap-2">
        <div className="w-40 max-sm:w-full">
          <SortDropdown
            selectedSort={status}
            onSortChange={(value) => set("status", value)}
            options={CONSULTATION_STATUS_OPTIONS}
            usedInPanel={true}
          />
        </div>
      </div>

      <div className="w-80 max-sm:w-full">
        <PanelSearch
          label="کد مشاوره، نام کاربر یا پزشک..."
          id="consultation-search"
          defaultValue={search}
          searchParam="search"
        />
      </div>
    </div>
  );
}