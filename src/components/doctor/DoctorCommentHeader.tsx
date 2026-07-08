"use client";

import SortDropdown from "@/components/shared/ui/SortDropdown";
import { COMMENT_SORT_OPTIONS } from "@/lib/constants";
import { useUrlParams } from "@/lib/hooks/useUrlParams";

interface DoctorCommentHeaderProps {
  sort: "newest" | "oldest";
}

export default function DoctorCommentHeader({
  sort,
}: DoctorCommentHeaderProps) {

  const { set } = useUrlParams();


  return (
    <div className="mb-4">
      <div className="max-xs:w-full w-36">
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
