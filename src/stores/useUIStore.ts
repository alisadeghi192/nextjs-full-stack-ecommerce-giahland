import { create } from "zustand";

interface UIState {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  activeNavHover: string | null;

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
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isMenuOpen: false,
  activeNavHover: null,

  openCart: () =>
    set({
      isCartOpen: true,
      isSearchOpen: false,
      isMenuOpen: false,
      activeNavHover: null,
    }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => {
    if (!get().isCartOpen) {
      get().closeAll();
      set({ isCartOpen: true });
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
    }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => {
    if (!get().isSearchOpen) {
      get().closeAll();
      set({ isSearchOpen: true });
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
    }),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleMenu: () => {
    if (!get().isMenuOpen) {
      get().closeAll();
      set({ isMenuOpen: true });
    } else {
      set({ isMenuOpen: false });
    }
  },

  setActiveNavHover: (href) => set({ activeNavHover: href }),
  closeAll: () =>
    set({
      isCartOpen: false,
      isSearchOpen: false,
      isMenuOpen: false,
      activeNavHover: null,
    }),
}));