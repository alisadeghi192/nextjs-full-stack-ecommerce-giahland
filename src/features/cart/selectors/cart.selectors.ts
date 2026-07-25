import { useCartStore } from "@/stores/useCartStore";
import { useShallow } from "zustand/react/shallow";

export const useCartTotalItems = () => useCartStore((state) => state.totalItems);

export const useCartSummary = () =>
  useCartStore(
    useShallow((state) => ({
      items: state.items,
      totalItems: state.totalItems,
      totalPrice: state.totalPrice,
    }))
  );

export const useCartStoreActions = () =>
  useCartStore(
    useShallow((state) => ({
      fetchCart: state.fetchCart,
      addItem: state.addItem,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      clearCart: state.clearCart,
      reset: state.reset,
    }))
  );