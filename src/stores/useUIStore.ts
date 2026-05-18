import { create } from "zustand";

interface UIState {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  activeNavHover: string | null;
  openSubmenu: string | null;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;

  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;

  setActiveNavHover: (href: string | null) => void;
  setOpenSubmenu: (href: string | null) => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isMenuOpen: false,
  activeNavHover: null,
  openSubmenu: null,

  openCart: () =>
    set({
      isCartOpen: true,
      isSearchOpen: false,
      isMenuOpen: false,
      activeNavHover: null,
      openSubmenu: null,
    }),

  closeCart: () => set({ isCartOpen: false }),

  toggleCart: () => {
    if (!get().isCartOpen) {
      set({
        isCartOpen: true,
        isSearchOpen: false,
        isMenuOpen: false,
        activeNavHover: null,
        openSubmenu: null,
      });
    } else {
      set({ isCartOpen: false });
    }
  },

  openSearch: () =>
    set({
      isSearchOpen: true,
      isCartOpen: false,
      isMenuOpen: false,
      activeNavHover: null,
      openSubmenu: null,
    }),

  closeSearch: () => set({ isSearchOpen: false }),

  toggleSearch: () => {
    if (!get().isSearchOpen) {
      set({
        isSearchOpen: true,
        isCartOpen: false,
        isMenuOpen: false,
        activeNavHover: null,
        openSubmenu: null,
      });
    } else {
      set({ isSearchOpen: false });
    }
  },

  openMenu: () =>
    set({
      isMenuOpen: true,
      isCartOpen: false,
      isSearchOpen: false,
      activeNavHover: null,
      openSubmenu: null,
    }),

  closeMenu: () => set({ isMenuOpen: false }),

  toggleMenu: () => {
    if (!get().isMenuOpen) {
      set({
        isMenuOpen: true,
        isCartOpen: false,
        isSearchOpen: false,
        activeNavHover: null,
        openSubmenu: null,
      });
    } else {
      set({ isMenuOpen: false });
    }
  },

  setActiveNavHover: (href) =>
    set({
      activeNavHover: href,
      isCartOpen: false,
      isSearchOpen: false,
    }),

  setOpenSubmenu: (href) =>
    set((state) => ({
      openSubmenu: state.openSubmenu === href ? null : href,
    })),

  closeAll: () =>
    set({
      isCartOpen: false,
      isSearchOpen: false,
      isMenuOpen: false,
      activeNavHover: null,
      openSubmenu: null,
    }),
}));