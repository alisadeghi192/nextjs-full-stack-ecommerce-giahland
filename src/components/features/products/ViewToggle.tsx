'use client'
import { MdDensityMedium, MdGridView } from "react-icons/md";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  onViewChange: (mode: "grid" | "list") => void;
}

export default function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-x-4">
      <button
        onClick={() => onViewChange("grid")}
        className={`border-neutral5 flex size-12 cursor-pointer items-center justify-center rounded-xl border transition-all ${
          viewMode === "grid"
            ? "bg-primary text-white"
            : "bg-neutral2 text-primary"
        }`}
      >
        <MdGridView className="size-6" />
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={`border-neutral5 flex size-12 cursor-pointer items-center justify-center rounded-xl border transition-all ${
          viewMode === "list"
            ? "bg-primary text-white"
            : "bg-neutral2 text-primary"
        }`}
      >
        <MdDensityMedium className="size-6" />
      </button>
    </div>
  );
}