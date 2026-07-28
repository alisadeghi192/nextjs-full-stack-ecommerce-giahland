"use client";

import { searchProducts } from "@/features/products/actions/searchProducts.actions";
import { useEffect, useState } from "react";

export function useProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        searchProducts(query)
          .then(setResults)
          .catch(() => setResults([]))
          .finally(() => setIsLoading(false));
      } else {
        setResults([]);
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return { query, setQuery, results, isLoading };
}