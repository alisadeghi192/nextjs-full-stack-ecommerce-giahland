"use client";
import {MobileMenu , SearchInput , Overlay , MobileActions , Logo} from ".."
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

interface MobileHeaderProps {
  isScrolled: boolean;
  hasSearchInput?: boolean;
  useInLoginPage?: boolean;
}

export default function MobileHeader({
  isScrolled,
  hasSearchInput = true,
  useInLoginPage = false,
}: MobileHeaderProps) {
  const isCartOpen = useIsCartOpen();
  const isMenuOpen = useIsMenuOpen();
  const isSearchOpen = useIsSearchOpen();
  const { closeCart } = useCartActions();
  const { closeMenu } = useMenuActions();
  const { closeSearch } = useSearchActions();

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
            <MobileMenu/>
            <Logo />
          </div>
          <MobileActions  />
        </div>
        {hasSearchInput && (
          <SearchInput
            isScrolled={isScrolled}
          />
        )}
        <MobileCartModal  />
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
