"use client";

import { useState } from "react";
import IconButton from "../../../ui/IconButton";
import { MdOutlineDarkMode, MdOutlineSearch } from "react-icons/md";
import AuthButtons from "./AuthButtons";
import CartButton from "./CartButton";
import Overlay from "./Overlay";
import {
  HEADER_DESKTOP_DEFAULT,
  HEADER_DESKTOP_SCROLLED,
} from "@/lib/constants";
import SearchButton from "./SearchButton";

interface HeaderActionsProps {
  isScrolled: boolean;
}

export default function HeaderActions({ isScrolled }: HeaderActionsProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const headerHeight = isScrolled
    ? HEADER_DESKTOP_SCROLLED
    : HEADER_DESKTOP_DEFAULT;

  const closeCart = () => setIsCartOpen(false);
  const closeSearch = () => setIsSearchOpen(false);
  const closeAll = () => {
    closeCart();
    closeSearch();
  };

  const toggleSearch = () => {
    if (isCartOpen) {
      closeCart();
    }
    setIsSearchOpen((prev) => !prev);
  };
  const toggleCart = () => {
    if (isSearchOpen) {
      closeSearch();
    }
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div className="relative flex gap-x-4 max-xl:gap-x-1">
      <IconButton icon={<MdOutlineDarkMode size={24} />} />

      <SearchButton
        isOpen={isSearchOpen}
        onToggle={toggleSearch}
        onClose={closeSearch}
      />

      <CartButton
        isOpen={isCartOpen}
        onToggle={toggleCart}
        onClose={closeCart}
      />

      <AuthButtons />

      <Overlay
        isOpen={isCartOpen || isSearchOpen}
        onClose={closeAll}
        topOffset={headerHeight}
        zIndex={30}
      />
    </div>
  );
}
