"use client";

import SortDropdown from "@/components/shared/ui/SortDropdown";
import { COMMENT_SORT_OPTIONS } from "@/lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DoctorCommentHeaderProps {
  sort: "newest" | "oldest";
  totalCount: number;
}


export default function DoctorCommentHeader({
  sort,
  totalCount,
}: DoctorCommentHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-4">
        <div className="w-36 max-xs:w-full">
          <SortDropdown
            selectedSort={sort}
            onSortChange={handleSortChange}
            options={COMMENT_SORT_OPTIONS}
            usedInPanel={true}
          />
        </div>
    </div>
  );
}