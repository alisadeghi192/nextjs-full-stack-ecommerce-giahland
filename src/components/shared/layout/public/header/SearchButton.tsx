"use client";

import IconButton from "@/components/shared/ui/IconButton";
import { MdOutlineSearch } from "react-icons/md";
import SearchModalContent from "./SearchModalContent";

interface SearchButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function SearchButton({
  isOpen,
  onToggle,
  onClose,
}: SearchButtonProps) {
  return (
    <div className="relative">
      <IconButton icon={<MdOutlineSearch size={24} />} onClick={onToggle} />

      <div
        className={`absolute top-13.5 left-0 z-70 shadow-lg transition-all duration-200 max-lg:top-12.5 ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0"
        }`}
      >
        <SearchModalContent   onClose={onClose} isOpen={isOpen} />
      </div>
    </div>
  );
}