"use client";

import SortDropdown from "@/components/shared/ui/SortDropdown";
import {
  TICKET_DEPARTMENT_SORT_OPTIONS,
  TICKET_ROLE_OPTIONS,
  TICKET_SORT_OPTIONS,
  TICKET_STATUS_OPTIONS,
} from "@/lib/constants";
import { useTicketParams } from "@/lib/hooks/useTicketParams";

export default function AdminTicketsHeader() {
  const { role, status, sort, department, setFilter } = useTicketParams();

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 max-sm:gap-2">
      <div className="w-37.5">
        <SortDropdown
          selectedSort={role}
          onSortChange={(value) => setFilter("role", value)}
          options={TICKET_ROLE_OPTIONS}
          usedInPanel={true}
        />
      </div>
      <div className="w-37.5">
        <SortDropdown
          selectedSort={status}
          onSortChange={(value) => setFilter("status", value)}
          options={TICKET_STATUS_OPTIONS}
          usedInPanel={true}
        />
      </div>
      <div className="w-37.5">
        <SortDropdown
          selectedSort={department}
          onSortChange={(value) => setFilter("department", value)}
          options={TICKET_DEPARTMENT_SORT_OPTIONS}
          usedInPanel={true}
        />
      </div>
      <div className="w-37.5">
        <SortDropdown
          selectedSort={sort}
          onSortChange={(value) => setFilter("sort", value)}
          options={TICKET_SORT_OPTIONS}
          usedInPanel={true}
        />
      </div>
    </div>
  );
}
