"use client";

import IconButton from "../../../ui/IconButton";
import { MdOutlineDarkMode } from "react-icons/md";
import AuthButtons from "./AuthButtons";
import CartButton from "./CartButton";
import Overlay from "./Overlay";
import {
  HEADER_DESKTOP_DEFAULT,
  HEADER_DESKTOP_SCROLLED,
} from "@/lib/constants";
import SearchButton from "./SearchButton";
import {
  useIsCartOpen,
  useIsSearchOpen,
  useCartActions,
  useSearchActions,
} from "@/stores/selectors/ui.selectors";

interface HeaderActionsProps {
  isScrolled: boolean;
}

export default function HeaderActions({ isScrolled }: HeaderActionsProps) {
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
