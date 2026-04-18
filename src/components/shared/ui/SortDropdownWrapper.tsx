"use client";
import SortDropdown from "./SortDropdown";
import { usePageParams } from "@/lib/hooks/usePageParams";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownWrapperProps {
  options: SortOption[];
}

export default function SortDropdownWrapper({ options }: SortDropdownWrapperProps) {
  const { selectedSort, setSort } = usePageParams();
  return (
    <SortDropdown
      selectedSort={selectedSort}
      onSortChange={setSort}
      options={options}
    />
  );
}