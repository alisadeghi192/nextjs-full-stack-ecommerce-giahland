"use client";

import { useState } from "react";
import IconButton from "../../ui/IconButton";
import {
  MdOutlineDarkMode,
  MdOutlineSearch,
} from "react-icons/md";
import AuthButtons from "./AuthButtons";
import CartButton from "./CartButton";
import Overlay from "../../ui/Overlay";

interface HeaderActionsProps {
  isScrolled: boolean;
}

export default function HeaderActions({ isScrolled }: HeaderActionsProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const headerHeight = isScrolled ? 60 : 96;

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const closeCart = () => setIsCartOpen(false);

  return (
    <div className="relative flex gap-4 max-xl:gap-2">
      <IconButton icon={<MdOutlineDarkMode size={24} />} />
      <IconButton icon={<MdOutlineSearch size={24} />} />
      
      <CartButton isOpen={isCartOpen} onToggle={toggleCart} onClose={closeCart} />
      
      <AuthButtons />

      <Overlay
        isOpen={isCartOpen}
        onClose={closeCart}
        topOffset={headerHeight}
        zIndex={30}
      />
    </div>
  );
}