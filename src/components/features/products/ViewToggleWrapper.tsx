"use client";
import ViewToggle from "./ViewToggle";
import { usePageParams } from "@/lib/hooks/usePageParams";

export default function ViewToggleWrapper() {
  const { viewMode, setViewMode } = usePageParams();
  return (
    <ViewToggle
      viewMode={viewMode as "grid" | "list"}
      onViewChange={setViewMode}
    />
  );
}