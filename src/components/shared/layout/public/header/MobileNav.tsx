import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBox from "./SearchBox";
import { useState } from "react";
import Overlay from "./Overlay";
import MobileActions from "./MobileActions";
import MobileCartModal from "@/components/features/cart/MobileCartModal";
import { HEADER_MOBILE_DEFAULT, HEADER_MOBILE_SCROLLED } from "@/lib/constants";

interface MobileNavProps {
  isScrolled: boolean;
  hasSearchInput: boolean;
}

export default function MobileNav({
  isScrolled,
  hasSearchInput,
}: MobileNavProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerHeight = isScrolled ? HEADER_MOBILE_SCROLLED : HEADER_MOBILE_DEFAULT;

  const closeCart = () => setIsCartOpen(false);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleMenu = () => {
    if (isCartOpen) {
      closeCart();
    }
    setIsMenuOpen((prev) => !prev);
  };
  const toggleCart = () => {
    if (isMenuOpen) {
      closeMenu();
    }
    setIsCartOpen((prev) => !prev);
  };

  return (
    <nav
      className={`border-neutral3 h-27 border-b bg-white ${isScrolled ? "h-24.5!" : ""} flex items-center transition-all md:hidden`}
    >
      <div className="container flex flex-col">
        <div
          className={`mb-3 flex items-center justify-between ${isScrolled ? "mb-2.5!" : ""} transition-all`}
        >
          <div className="flex items-center gap-x-3">
            <MobileMenu
              isOpen={isMenuOpen}
              onClose={closeMenu}
              toggleMenu={toggleMenu}
            />
            <Logo />
          </div>
          <MobileActions onCartClick={toggleCart} />
        </div>
        {hasSearchInput && <SearchBox />}
        <MobileCartModal isOpen={isCartOpen} onClose={closeCart} />
      </div>
      <Overlay
        isOpen={isCartOpen || isMenuOpen}
        onClose={() => {
          closeCart();
          closeMenu();
        }}
        topOffset={headerHeight}
        zIndex={30}
      />
    </nav>
  );
}
