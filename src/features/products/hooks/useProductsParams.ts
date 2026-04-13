"use client";
import { useSearchParams, useRouter } from "next/navigation";

export function useProductsParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("category") || "indoor";
  const viewMode = searchParams.get("view") || "grid";
  const selectedSort = searchParams.get("sort") || "newest";

  const setViewMode = (mode: "grid" | "list") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", mode);
    router.push(`?${params.toString()}`);
  };

  const setSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortValue);
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
