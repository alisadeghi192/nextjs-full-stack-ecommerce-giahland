import { useUIStore } from "../useUIStore";
import { useShallow } from "zustand/react/shallow";

export const useIsCartOpen = () => useUIStore((state) => state.isCartOpen);
export const useIsSearchOpen = () => useUIStore((state) => state.isSearchOpen);
export const useIsMenuOpen = () => useUIStore((state) => state.isMenuOpen);
export const useActiveNavHover = () => useUIStore((state) => state.activeNavHover);
export const useOpenSubmenu = () => useUIStore((state) => state.openSubmenu);

export const useOpenCart = () => useUIStore((state) => state.openCart);
export const useCloseCart = () => useUIStore((state) => state.closeCart);
export const useToggleCart = () => useUIStore((state) => state.toggleCart);

export const useOpenSearch = () => useUIStore((state) => state.openSearch);
export const useCloseSearch = () => useUIStore((state) => state.closeSearch);
export const useToggleSearch = () => useUIStore((state) => state.toggleSearch);

export const useOpenMenu = () => useUIStore((state) => state.openMenu);
export const useCloseMenu = () => useUIStore((state) => state.closeMenu);
export const useToggleMenu = () => useUIStore((state) => state.toggleMenu);

export const useSetActiveNavHover = () => useUIStore((state) => state.setActiveNavHover);
export const useSetOpenSubmenu = () => useUIStore((state) => state.setOpenSubmenu);

export const useCartActions = () =>
  useUIStore(
    useShallow((state) => ({
      openCart: state.openCart,
      closeCart: state.closeCart,
      toggleCart: state.toggleCart,
    }))
  );

export const useSearchActions = () =>
  useUIStore(
    useShallow((state) => ({
      openSearch: state.openSearch,
      closeSearch: state.closeSearch,
      toggleSearch: state.toggleSearch,
    }))
  );

export const useMenuActions = () =>
  useUIStore(
    useShallow((state) => ({
      openMenu: state.openMenu,
      closeMenu: state.closeMenu,
      toggleMenu: state.toggleMenu,
    }))
  );