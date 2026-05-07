import Logo from "../../ui/Logo";
import MobileMenu from "../../ui/MobileMenu";
import SearchBox from "../../ui/SearchBox";
import { useState } from "react";
import Overlay from "../../ui/Overlay";
import MobileActions from "./MobileActions";
import MobileCartModal from "@/components/features/cart/MobileCartModal";

interface MobileNavProps {
  isScrolled: boolean;
  hasSearchInput: boolean;
}

export default function MobileNav({ isScrolled, hasSearchInput }: MobileNavProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const headerHeight = isScrolled ? 107 : 117;

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const closeCart = () => setIsCartOpen(false);

  return (
    <nav className="border-neutral3 border-b bg-white py-3 md:hidden">
      <div className={`container flex flex-col gap-y-3 ${isScrolled ? "gap-y-2.5!" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MobileMenu />
            <Logo pageSize="mobile" />
          </div>
          <MobileActions onCartClick={toggleCart} />
        </div>

        {hasSearchInput && <SearchBox />}

        <MobileCartModal isOpen={isCartOpen} onClose={closeCart} />
      </div>

      <Overlay isOpen={isCartOpen} onClose={closeCart} topOffset={headerHeight} zIndex={30} />
    </nav>
  );
}