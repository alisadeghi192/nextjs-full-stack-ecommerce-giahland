"use client";

import SortDropdown from "@/components/shared/ui/SortDropdown";
import {
  TICKET_DEPARTMENT_SORT_OPTIONS,
  TICKET_ROLE_OPTIONS,
  TICKET_SORT_OPTIONS,
  TICKET_STATUS_OPTIONS,
} from "@/lib/constants";
import { useUrlParams } from "@/lib/hooks/useUrlParams";

export default function AdminTicketsHeader() {
  const { get, set } = useUrlParams();

  const role = get("role");
  const status = get("status");
  const department = get("department");
  const sort = get("sort") || "newest";

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 max-[600px]:grid max-[600px]:grid-cols-2 *:max-[600px]:w-full max-sm:gap-2">
      <div className="w-42">
        <SortDropdown
          selectedSort={role}
          onSortChange={(value) => set("role", value)}
          options={TICKET_ROLE_OPTIONS}
          usedInPanel={true}
        />
      </div>
      <div className="w-42">
        <SortDropdown
          selectedSort={status}
          onSortChange={(value) => set("status", value)}
          options={TICKET_STATUS_OPTIONS}
          usedInPanel={true}
        />
      </div>
      <div className="w-42">
        <SortDropdown
          selectedSort={department}
          onSortChange={(value) => set("department", value)}
          options={TICKET_DEPARTMENT_SORT_OPTIONS}
          usedInPanel={true}
        />
      </div>
      <div className="w-42">
        <SortDropdown
          selectedSort={sort}
          onSortChange={(value) => set("sort", value)}
          options={TICKET_SORT_OPTIONS}
          usedInPanel={true}
        />
      </div>
    </div>
  );
}
