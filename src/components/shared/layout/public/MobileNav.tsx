import Logo from "../../ui/Logo";
import MobileMenu from "../../ui/MobileMenu";
import SearchBox from "../../ui/SearchBox";
import IconButton from "../../ui/IconButton";
import {
  MdOutlineDarkMode,
  MdOutlineLogin,
  MdOutlineShoppingCart,
} from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import CartModal from "@/components/features/cart/CartModal";

interface MobileNavProps {
  isScrolled: boolean;
  hasSearchInput: boolean;
}

export default function MobileNav({
  isScrolled,
  hasSearchInput,
}: MobileNavProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const headerHeight = isScrolled ? 107 : 117;
  return (
    <nav className="border-neutral3 border-b bg-white py-3 md:hidden">
      <div
        className={`container flex flex-col gap-y-3 ${isScrolled ? "gap-y-2.5!" : ""}`}
        onClick={toggleCart}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MobileMenu />
            <Logo pageSize="mobile" />
          </div>
          <div className="flex items-center gap-2">
            <IconButton icon={<MdOutlineDarkMode size={20} />} />
            <IconButton icon={<MdOutlineShoppingCart size={20} />} />
            <Link href="/login-register">
              <IconButton icon={<MdOutlineLogin size={20} />} />
            </Link>
          </div>
        </div>
        {hasSearchInput && <SearchBox />}
        <div className="relative">
          <div
            className={`absolute -top-13 left-0 z-40 w-full transition-all duration-200 ${
              isCartOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible translate-y-2 opacity-0"
            }`}
          >
            <CartModal onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      </div>
      {isCartOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 transition-all duration-200"
          onClick={() => setIsCartOpen(false)}
          style={{ top: `${headerHeight}px` }}
        />
      )}
    </nav>
  );
}
