"use client";
import SortDropdown from "./SortDropdown";
import { useProductsParams } from "@/features/products/hooks/useProductsParams";

export default function SortDropdownWrapper() {
  const { selectedSort, setSort } = useProductsParams();
  return <SortDropdown selectedSort={selectedSort} onSortChange={setSort} />;
}
