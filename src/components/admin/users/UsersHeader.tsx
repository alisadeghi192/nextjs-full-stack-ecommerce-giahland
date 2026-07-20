"use client";

import PanelSearch from "@/components/shared/ui/PanelSearch";
import SortDropdown from "@/components/shared/ui/SortDropdown";
import {
  USER_ROLE_OPTIONS,
  USER_SORT_OPTIONS,
  USER_STATUS_OPTIONS,
} from "@/lib/constants";
import { useUrlParams } from "@/lib/hooks/useUrlParams";

export default function UsersHeader() {
  const { get, set } = useUrlParams();

  const role = get("role") || "all";
  const status = get("status") || "all";
  const search = get("search") || "";
  const sort = get("sort") || "newest";

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
      <div className="flex flex-wrap items-center gap-3 max-sm:flex-col max-sm:gap-2">
        <div className="w-40 max-sm:w-full">
          <SortDropdown
            selectedSort={role}
            onSortChange={(value) => set("role", value)}
            options={USER_ROLE_OPTIONS}
            usedInPanel={true}
          />
        </div>
        <div className="w-36 max-sm:w-full">
          <SortDropdown
            selectedSort={status}
            onSortChange={(value) => set("status", value)}
            options={USER_STATUS_OPTIONS}
            usedInPanel={true}
          />
        </div>
        <div className="w-36 max-sm:w-full">
          <SortDropdown
            selectedSort={sort}
            onSortChange={(value) => set("sort", value)}
            options={USER_SORT_OPTIONS}
            usedInPanel={true}
          />
        </div>
      </div>
      <div className="w-64 max-sm:w-full">
        <PanelSearch
          label="نام،موبایل،ایمیل"
          id="user-search"
          defaultValue={search}
          searchParam="search"
        />
      </div>
    </div>
  );
}
