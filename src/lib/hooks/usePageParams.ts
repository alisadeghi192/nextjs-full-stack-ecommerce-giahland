"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { DEFAULT_TAB, DEFAULT_VIEW_MODE, DEFAULT_SORT } from "@/lib/constants";

export function usePageParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("category") || DEFAULT_TAB;
  const viewMode = searchParams.get("view") || DEFAULT_VIEW_MODE;
  const selectedSort = searchParams.get("sort") || DEFAULT_SORT;

  const setViewMode = (mode: "grid" | "list") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", mode);
    router.push(`?${params.toString()}`);
  };

  const setSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortValue);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return {
    activeTab,
    viewMode,
    selectedSort,
    setViewMode,
    setSort,
  };
}