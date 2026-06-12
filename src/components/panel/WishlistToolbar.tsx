"use client";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import ViewToggleWrapper from "@/components/shared/ui/ViewToggleWrapper";
import { productSortOptions } from "@/lib/constants";

export default function WishlistToolbar() {
  return (
    <div className="mb-6 flex items-center justify-between max-md:gap-x-4">
      <ViewToggleWrapper />
      <SortDropdownWrapper options={productSortOptions} />
    </div>
  );
}