"use client";

import IconButton from "@/components/shared/ui/IconButton";
import { MdOutlineDarkMode } from "react-icons/md";
import {AuthButtons,CartButton,Overlay ,SearchButton} from ".."
import {
  HEADER_DESKTOP_DEFAULT,
  HEADER_DESKTOP_SCROLLED,
} from "@/lib/constants";
import {
  useIsCartOpen,
  useIsSearchOpen,
  useCartActions,
  useSearchActions,
} from "@/stores/selectors/ui.selectors";

interface DesktopActionsProps {
  isScrolled: boolean;
}

export default function DesktopActions({ isScrolled }: DesktopActionsProps) {
  const isCartOpen = useIsCartOpen();
  const isSearchOpen = useIsSearchOpen();
  const { closeCart } = useCartActions();
  const { closeSearch } = useSearchActions();

  const headerHeight = isScrolled
    ? HEADER_DESKTOP_SCROLLED
    : HEADER_DESKTOP_DEFAULT;

  const closeAll = () => {
    closeCart();
    closeSearch();
  };

  return (
    <div className="relative flex gap-x-4 max-xl:gap-x-1">
      <IconButton icon={<MdOutlineDarkMode size={24} />} />

      <SearchButton />

      <CartButton />

      <AuthButtons />

      <Overlay
        isOpen={isCartOpen || isSearchOpen}
        onClose={closeAll}
        topOffset={headerHeight}
        zIndex={30}
      />
    </div>
  );
}
