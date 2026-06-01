import { create } from "zustand";

interface UIState {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  isProfileDropdownOpen: boolean;
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

  openProfileDropdown: () => void;
  closeProfileDropdown: () => void;
  toggleProfileDropdown: () => void;

  setActiveNavHover: (href: string | null) => void;
  setOpenSubmenu: (href: string | null) => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isMenuOpen: false,
  isProfileDropdownOpen: false,
  activeNavHover: null,
  openSubmenu: null,

  // ========== Close All ==========
  closeAll: () =>
    set({
      isCartOpen: false,
      isSearchOpen: false,
      isMenuOpen: false,
      isProfileDropdownOpen: false,
      activeNavHover: null,
      openSubmenu: null,
    }),

  // ========== Cart ==========
  openCart: () => {
    get().closeAll();
    set({ isCartOpen: true });
  },
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => {
    if (!get().isCartOpen) {
      get().closeAll();
      set({ isCartOpen: true });
    } else {
      set({ isCartOpen: false });
    }
  },

  // ========== Search ==========
  openSearch: () => {
    get().closeAll();
    set({ isSearchOpen: true });
  },
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => {
    if (!get().isSearchOpen) {
      get().closeAll();
      set({ isSearchOpen: true });
    } else {
      set({ isSearchOpen: false });
    }
  },

  // ========== Menu (Mobile) ==========
  openMenu: () => {
    get().closeAll();
    set({ isMenuOpen: true });
  },
  closeMenu: () => set({ isMenuOpen: false }),
  toggleMenu: () => {
    if (!get().isMenuOpen) {
      get().closeAll();
      set({ isMenuOpen: true });
    } else {
      set({ isMenuOpen: false });
    }
  },

  // ========== Profile Dropdown ==========
  openProfileDropdown: () => {
    get().closeAll();
    set({ isProfileDropdownOpen: true });
  },
  closeProfileDropdown: () => set({ isProfileDropdownOpen: false }),
  toggleProfileDropdown: () => {
    if (!get().isProfileDropdownOpen) {
      get().closeAll();
      set({ isProfileDropdownOpen: true });
    } else {
      set({ isProfileDropdownOpen: false });
    }
  },

  // ========== Desktop Nav Hover ==========
  setActiveNavHover: (href) =>
    set({
      activeNavHover: href,
      isCartOpen: false,
      isSearchOpen: false,
      isProfileDropdownOpen: false,
    }),

  // ========== Mobile Submenu ==========
  setOpenSubmenu: (href) =>
    set((state) => ({
      openSubmenu: state.openSubmenu === href ? null : href,
    })),
}));