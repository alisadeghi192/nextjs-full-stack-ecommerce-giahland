"use client";

import IconButton from "../../ui/IconButton";
import { MdOutlineDarkMode, MdOutlineLogin, MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";

interface MobileActionsProps {
  onCartClick: () => void;
}

export default function MobileActions({ onCartClick }: MobileActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <IconButton icon={<MdOutlineDarkMode size={20} />} />
      <IconButton icon={<MdOutlineShoppingCart size={20} />} onClick={onCartClick} />
      <Link href="/login-register">
        <IconButton icon={<MdOutlineLogin size={20} />} />
      </Link>
    </div>
  );
}