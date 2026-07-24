"use client";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import ViewToggleWrapper from "@/components/shared/ui/ViewToggleWrapper";
import { PRODUCT_SORT_OPTIONS } from "@/lib/constants";

export default function WishlistToolbar() {
  return (
    <div className="mb-6 flex items-center justify-between max-md:gap-x-4">
      <ViewToggleWrapper />
      <SortDropdownWrapper options={PRODUCT_SORT_OPTIONS} />
    </div>
  );
}