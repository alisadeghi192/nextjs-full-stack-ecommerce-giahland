import { addToCartAction } from "@/features/cart/actions/addToCart.actions";
import { clearCartAction } from "@/features/cart/actions/clearCart.actions";
import { getCartAction } from "@/features/cart/actions/getCart.actions";
import { removeFromCartAction } from "@/features/cart/actions/removeFromCart.actions";
import { updateCartItemQuantityAction } from "@/features/cart/actions/updateCartItemQuantity.actions";
import { ICartItem } from "@/features/cart/types/cart.types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface CartState {
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;

  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  reset: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  fetchCart: async () => {
    const result = await getCartAction();
    if (result.success) {
      const items = result.items as any as ICartItem[];
      const totalItems = result.totalItems ?? 0;
      const totalPrice = result.totalPrice ?? 0;
      set({ items, totalItems, totalPrice });
    }
  },

  addItem: async (productId: string, quantity: number = 1) => {
    const result = await addToCartAction(productId, quantity);
    if (result.success) {
      const items = result.items as any as ICartItem[];
      const totalItems = result.totalItems ?? 0;
      const totalPrice = result.totalPrice ?? 0;
      set({ items, totalItems, totalPrice });
      toast.success("به سبد خرید اضافه شد.");
    } else {
      toast.error(result.message || "خطا");
    }
  },

  removeItem: async (productId: string) => {
    const result = await removeFromCartAction(productId);
    if (result.success) {
      const items = result.items as any as ICartItem[];
      const totalItems = result.totalItems ?? 0;
      const totalPrice = result.totalPrice ?? 0;
      set({ items, totalItems, totalPrice });
      toast.success("از سبد خرید حذف شد.");
    } else {
      toast.error(result.message || "خطا");
    }
  },

  updateQuantity: async (productId: string, quantity: number) => {
    const result = await updateCartItemQuantityAction(productId, quantity);
    if (result.success) {
      const items = result.items as any as ICartItem[];
      const totalItems = result.totalItems ?? 0;
      const totalPrice = result.totalPrice ?? 0;
      set({ items, totalItems, totalPrice });
    } else {
      toast.error(result.message || "خطا در به‌روزرسانی تعداد");
    }
  },

  clearCart: async () => {
    const result = await clearCartAction();
    if (result.success) {
      set({ items: [], totalItems: 0, totalPrice: 0 });
      toast.success("سبد خرید خالی شد.");
    } else {
      toast.error(result.message || "خطا در خالی کردن سبد");
    }
  },

  reset: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));