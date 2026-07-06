"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useCommentParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filter = searchParams.get("filter") || "all";
  const sort = searchParams.get("sort") || "newest";

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

  return {
    filter,
    sort,
    setFilter,
  };
}