"use client";

import CartModal from "./CartModal";

interface MobileCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileCartModal({ isOpen, onClose }: MobileCartModalProps) {
  return (
    <div className="relative">
      <div
        className={`absolute -top-10 left-0 z-40 w-full transition-all duration-200 ${
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