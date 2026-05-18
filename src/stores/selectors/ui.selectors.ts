import { useUIStore } from "../useUIStore";
import { useShallow } from "zustand/react/shallow";

export const useIsCartOpen = () => useUIStore((state) => state.isCartOpen);
export const useIsSearchOpen = () => useUIStore((state) => state.isSearchOpen);
export const useIsMenuOpen = () => useUIStore((state) => state.isMenuOpen);
export const useActiveNavHover = () => useUIStore((state) => state.activeNavHover);
export const useOpenSubmenu = () => useUIStore((state) => state.openSubmenu);


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