"use client";
import ViewToggle from "@/components/shared/ui/ViewToggle";
import { useUrlParams } from "@/lib/hooks/useUrlParams";

interface ViewToggleWrapperProps {
  usedInPanel?:boolean
}

export default function ViewToggleWrapper({usedInPanel = false}:ViewToggleWrapperProps) {
  const { get, set } = useUrlParams();
  
  const viewMode = get("view") || "grid";

  const handleViewChange = (mode: "grid" | "list") => {
    set("view", mode);
  };

  return (
    <ViewToggle
      viewMode={viewMode as "grid" | "list"}
      onViewChange={handleViewChange}
      usedInPanel = {usedInPanel}
    />
  );
}
