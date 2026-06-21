"use client";
import { usePageParams } from "@/lib/hooks/usePageParams";
import SortDropdown from "./SortDropdown";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownWrapperProps {
  options: SortOption[];
  usedInConsultation? : boolean; 
}

export default function SortDropdownWrapper({ options , usedInConsultation}: SortDropdownWrapperProps) {
  const { selectedSort, setSort } = usePageParams();
  return (
    <SortDropdown
      selectedSort={selectedSort}
      onSortChange={setSort}
      options={options}
      usedInConsultation = {usedInConsultation}
    />
  );
}