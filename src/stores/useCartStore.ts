// src/stores/useCartStore.ts

import { addToCartAction } from "@/features/cart/actions/addToCart.actions";
import { getCartAction } from "@/features/cart/actions/getCart.actions";
import { removeFromCartAction } from "@/features/cart/actions/removeFromCart.actions";
import { ICartItem } from "@/features/cart/types/cart.types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface CartState {
  items: ICartItem[];
  totalItems: number;

  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  reset: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalItems: 0,

  fetchCart: async () => {
    const result = (await getCartAction()) as any;
    const items = result.items ?? [];
    const totalItems = result.totalItems ?? 0;

    set({ items, totalItems });
  },

  addItem: async (productId: string, quantity: number = 1) => {
    const result = await addToCartAction(productId, quantity);
    if (result.success && result.cart) {
      const totalItems = result.cart.items.reduce(
        (sum: number, item: ICartItem) => sum + item.quantity,
        0,
      );
      set({ items: result.cart.items, totalItems });
      toast.success("به سبد خرید اضافه شد.");
    } else {
      toast.error(result.message || "خطا");
    }
  },

  removeItem: async (productId: string) => {
    const result = await removeFromCartAction(productId);
    if (result.success && result.cart) {
      const totalItems = result.cart.items.reduce(
        (sum: number, item: ICartItem) => sum + item.quantity,
        0,
      );
      set({ items: result.cart.items, totalItems });
      toast.success("از سبد خرید حذف شد.");
    } else {
      toast.error(result.message || "خطا");
    }
  },

  reset: () => set({ items: [], totalItems: 0 }),
}));
