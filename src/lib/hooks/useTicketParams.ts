"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useTicketParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role") || "";
  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "newest";
  const department = searchParams.get("department") || "";

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push(window.location.pathname);
  };

  return {
    role,
    status,
    sort,
    department,
    setFilter,
    resetFilters,
  };
}
