"use client";

import IconButton from "../../ui/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartModal from "@/components/features/cart/CartModal";

interface CartButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function CartButton({ isOpen, onToggle, onClose }: CartButtonProps) {
  return (
    <div className="relative" onClick={onToggle}>
      <IconButton icon={<MdOutlineShoppingCart size={24} />} />

      <div
        className={`absolute top-13.5 left-0 z-40 transition-all duration-200 ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0"
        }`}
      >
        <CartModal onClose={onClose} />
      </div>
    </div>
  );
}