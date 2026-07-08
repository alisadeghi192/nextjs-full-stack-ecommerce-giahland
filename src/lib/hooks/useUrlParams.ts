"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useUrlParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const get = (key: string): string => {
    return searchParams.get(key) || "";
  };

  const set = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  return { get, set };
}
