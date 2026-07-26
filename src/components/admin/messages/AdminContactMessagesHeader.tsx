"use client";

import SortDropdown from "@/components/shared/ui/SortDropdown";
import { CONTACT_SORT_OPTIONS, CONTACT_STATUS_OPTIONS } from "@/lib/constants";
import { useUrlParams } from "@/lib/hooks/useUrlParams";

interface AdminContactMessagesHeaderProps {
  currentStatus: string;
  currentSort: string;
}

export default function AdminContactMessagesHeader({
  currentStatus,
  currentSort,
}: AdminContactMessagesHeaderProps) {
  const { set } = useUrlParams();

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="w-37.5">
        <SortDropdown
          selectedSort={currentStatus}
          onSortChange={(value) => set("status", value)}
          options={CONTACT_STATUS_OPTIONS}
          usedInPanel={true}
        />
      </div>
      <div className="w-37.5">
        <SortDropdown
          selectedSort={currentSort}
          onSortChange={(value) => set("sort", value)}
          options={CONTACT_SORT_OPTIONS}
          usedInPanel={true}
        />
      </div>
    </div>
  );
}