"use client";
import IconButton from "../../ui/IconButton";
import {
  MdOutlineDarkMode,
  MdOutlineSearch,
  MdOutlineShoppingCart,
} from "react-icons/md";
import AuthButtons from "./AuthButtons";

import CartModal from "@/components/features/cart/CartModal";
import { useState } from "react";

interface HeaderActionsProps {
  isScrolled: boolean;
}

export default function HeaderActions({ isScrolled }: HeaderActionsProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
   const headerHeight = isScrolled ? 60 : 96; // h-15 = 60px, h-24 = 96px
  return (
    <div className="relative flex gap-4 max-xl:gap-2">
      <IconButton icon={<MdOutlineDarkMode size={24} />} />
      <IconButton icon={<MdOutlineSearch size={24} />} />
      <div className="relative" onClick={toggleCart}>
        <IconButton icon={<MdOutlineShoppingCart size={24} />} />
        <div
          className={`absolute top-13.5 z-40 left-0 transition-all duration-200 ${
            isCartOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-2 opacity-0"
          }`}
        >
          <CartModal onClose={() => setIsCartOpen(false)} />
        </div>
      </div>
      <AuthButtons />
        {isCartOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 transition-all duration-200"
          onClick={() => setIsCartOpen(false)}
           style={{ top: `${headerHeight}px` }}
        />
      )}
    </div>
  );
}
