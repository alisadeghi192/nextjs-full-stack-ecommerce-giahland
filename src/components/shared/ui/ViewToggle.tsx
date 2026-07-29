"use client";
import { MdDensityMedium, MdGridView } from "react-icons/md";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  onViewChange: (mode: "grid" | "list") => void;
  usedInPanel?: boolean;
}

export default function ViewToggle({
  viewMode,
  onViewChange,
  usedInPanel = false,
}: ViewToggleProps) {
  return (
    <div className="flex items-center gap-x-4">
      <button
        onClick={() => onViewChange("grid")}
        className={`border-neutral5 dark:border-primary-dark  transition-colors flex ${usedInPanel ? "size-10" : "size-12 max-md:size-11 max-sm:size-10"} cursor-pointer items-center justify-center rounded-xl border transition-all ${
          viewMode === "grid"
            ? "bg-primary  text-white"
            : "bg-neutral2 dark:bg-shade5 text-primary dark:text-primary-dark "
        }`}
      >
        <MdGridView className="size-6 max-sm:size-5" />
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={`border-neutral5 dark:border-primary-dark  transition-colors flex ${usedInPanel ? "size-10" : "size-12 max-md:size-11 max-sm:size-10"} cursor-pointer items-center justify-center rounded-xl border transition-all ${
          viewMode === "list"
            ? "bg-primary text-white"
            : "bg-neutral2 dark:bg-shade5 text-primary dark:text-primary-dark"
        }`}
      >
        <MdDensityMedium className="size-6 max-sm:size-5" />
      </button>
    </div>
  );
}
