"use client";

import SortDropdown from "@/components/shared/ui/SortDropdown";
import { COMMENT_FILTER_OPTIONS, COMMENT_SORT_OPTIONS } from "@/lib/constants";
import { useUrlParams } from "@/lib/hooks/useUrlParams";

export default function AdminCommentHeader() {
   const { get, set } = useUrlParams();

  const filter = get("filter") || "all";
  const sort = get("sort") || "newest";

  return (
    <div className="mb-4 flex items-center gap-3 max-sm:justify-between max-sm:gap-2">
      <div className="w-42 max-sm:w-full">
        <SortDropdown
          selectedSort={filter}
          onSortChange={(value) => set("filter", value)}
          options={COMMENT_FILTER_OPTIONS}
          usedInPanel={true}
        />
      </div>
      <div className="w-36 max-sm:w-full">
        <SortDropdown
          selectedSort={sort}
          onSortChange={(value) => set("sort", value)}
          options={COMMENT_SORT_OPTIONS}
          usedInPanel={true}
        />
      </div>
    </div>
  );
}
