"use client";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBox from "./SearchBox";
import Overlay from "./Overlay";
import MobileActions from "./MobileActions";
import MobileCartModal from "@/components/features/cart/MobileCartModal";
import { HEADER_MOBILE_DEFAULT, HEADER_MOBILE_SCROLLED } from "@/lib/constants";
import {
  useIsCartOpen,
  useIsMenuOpen,
  useIsSearchOpen,
  useCartActions,
  useMenuActions,
  useSearchActions,
} from "@/stores/selectors/ui.selectors";

interface MobileNavProps {
  isScrolled: boolean;
  hasSearchInput: boolean;
  useInLoginPage?: boolean;
}

export default function MobileNav({
  isScrolled,
  hasSearchInput,
  useInLoginPage = false,
}: MobileNavProps) {
  const isCartOpen = useIsCartOpen();
  const isMenuOpen = useIsMenuOpen();
  const isSearchOpen = useIsSearchOpen();
  const { closeCart, toggleCart } = useCartActions();
  const { closeMenu, toggleMenu } = useMenuActions();
  const { closeSearch, toggleSearch } = useSearchActions();

  const headerHeight = isScrolled
    ? HEADER_MOBILE_SCROLLED
    : HEADER_MOBILE_DEFAULT;

  const closeAll = () => {
    closeCart();
    closeMenu();
    closeSearch();
  };

  return (
    <nav
      className={`border-neutral3 border-b bg-white ${useInLoginPage ? "h-12" : isScrolled ? "h-24.5" : "h-27"} flex items-center transition-all md:hidden`}
    >
      <div className="container flex flex-col">
        <div
          className={`flex items-center justify-between ${useInLoginPage ? "mb-0" : isScrolled ? "mb-2.5!" : "mb-3"} transition-all`}
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
        {hasSearchInput && (
          <SearchBox
            key={isSearchOpen ? "search-open" : "search-closed"}
            isOpen={isSearchOpen}
            isScrolled={isScrolled}
            onClose={closeSearch}
            onOpen={toggleSearch}
          />
        )}
        <MobileCartModal isOpen={isCartOpen} onClose={closeCart} />
      </div>
      <Overlay
        isOpen={isCartOpen || isMenuOpen || isSearchOpen}
        onClose={closeAll}
        topOffset={useInLoginPage ? 48 : headerHeight}
        zIndex={30}
      />
    </nav>
  );
}
