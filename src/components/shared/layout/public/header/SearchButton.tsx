"use client";

import IconButton from "@/components/shared/ui/IconButton";
import { MdOutlineSearch } from "react-icons/md";
import SearchModalContent from "./SearchModalContent";
import { useIsSearchOpen, useSearchActions } from "@/stores/selectors/ui.selectors";


export default function SearchButton() {
  const isSearchOpen = useIsSearchOpen();
  const { toggleSearch, closeSearch } = useSearchActions();
  return (
    <div className="relative">
      <IconButton icon={<MdOutlineSearch size={24} />} onClick={toggleSearch} />

      <div
        className={`absolute top-13.5 left-0 z-70 shadow-lg transition-all duration-200 max-lg:top-12.5 ${
          isSearchOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0"
        }`}
      >
        <SearchModalContent   onClose={closeSearch} isOpen={isSearchOpen} />
      </div>
    </div>
  );
}