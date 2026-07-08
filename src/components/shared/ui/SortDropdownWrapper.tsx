"use client";
import { useUrlParams } from "@/lib/hooks/useUrlParams";
import SortDropdown from "./SortDropdown";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownWrapperProps {
  options: SortOption[];
  usedInPanel? : boolean; 
}

export default function SortDropdownWrapper({ options , usedInPanel}: SortDropdownWrapperProps) {
    const { get, set } = useUrlParams();
  const selectedSort = get("sort") || "newest";
  return (
    <SortDropdown
      selectedSort={selectedSort}
      onSortChange={(value) => set("sort", value)}
      options={options}
      usedInPanel = {usedInPanel}
    />
  );
}