"use client";

import SortDropdown from "@/components/shared/ui/SortDropdown";
import { CONTACT_SORT_OPTIONS, CONTACT_STATUS_OPTIONS } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";

interface AdminContactMessagesHeaderProps {
  currentStatus: string;
  currentSort: string;
}

export default function AdminContactMessagesHeader({
  currentStatus,
  currentSort,
}: AdminContactMessagesHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams();

    if (key !== "status") {
      params.set("status", currentStatus);
    }
    if (key !== "sort") {
      params.set("sort", currentSort);
    }

    params.set(key, value);
    params.set("page", "1");

    const query = params.toString();
    router.push(`${pathname}?${query}`);
  };
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="w-37.5">
        <SortDropdown
          selectedSort={currentStatus}
          onSortChange={(value) => updateParams("status", value)}
          options={CONTACT_STATUS_OPTIONS}
          usedInPanel={true}
        />
      </div>
      <div className="w-37.5">
        <SortDropdown
          selectedSort={currentSort}
          onSortChange={(value) => updateParams("sort", value)}
          options={CONTACT_SORT_OPTIONS}
          usedInPanel={true}
        />
      </div>
    </div>
  );
}
