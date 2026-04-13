"use client";
import ViewToggle from "./ViewToggle";
import { useProductsParams } from "@/features/products/hooks/useProductsParams";

export default function ViewToggleWrapper() {
  const { viewMode, setViewMode } = useProductsParams();
  return (
    <ViewToggle
      viewMode={viewMode as "grid" | "list"}
      onViewChange={setViewMode}
    />
  );
}
