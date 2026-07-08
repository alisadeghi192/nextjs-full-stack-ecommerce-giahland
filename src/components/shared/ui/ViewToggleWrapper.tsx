"use client";
import ViewToggle from "@/components/shared/ui/ViewToggle";
import { useUrlParams } from "@/lib/hooks/useUrlParams";

export default function ViewToggleWrapper() {
  const { get, set } = useUrlParams();
  const viewMode = get("view") || "grid";
  const handleViewChange = (mode: "grid" | "list") => {
    set("view", mode);
  };
  return (
    <ViewToggle
      viewMode={viewMode as "grid" | "list"}
      onViewChange={handleViewChange}
    />
  );
}
