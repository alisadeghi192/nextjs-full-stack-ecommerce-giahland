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

export default function MobileNav({
  isScrolled,
  hasSearchInput,
}: MobileNavProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const headerHeight = isScrolled ? 98 : 108;

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const closeCart = () => setIsCartOpen(false);

  return (
    <nav
      className={`border-neutral3 h-27 border-b bg-white ${isScrolled ? "h-24.5!" : ""} flex items-center md:hidden transition-all`}
    >
      <div className="container flex flex-col">
        <div
          className={`mb-3 flex items-center justify-between ${isScrolled ? "mb-2.5!" : ""} transition-all`}
        >
          <div className="flex items-center gap-x-3">
            <MobileMenu />
            <Logo  />
          </div>
          <MobileActions onCartClick={toggleCart} />
        </div>

        {hasSearchInput && <SearchBox />}

        <MobileCartModal isOpen={isCartOpen} onClose={closeCart} />
      </div>

      <Overlay
        isOpen={isCartOpen}
        onClose={closeCart}
        topOffset={headerHeight}
        zIndex={30}
      />
    </nav>
  );
}
