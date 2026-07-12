"use client";
import { useIsAuthenticated, useUserRole } from "@/features/auth/selectors/auth.selectors";
import { useCartStoreActions } from "@/stores/selectors/cart.selectors";
import toast from "react-hot-toast";
import { MdOutlineShoppingCart } from "react-icons/md";
interface AddToCartButtonProps {
  productId: string;
  className?: string;
}

export default function AddToCartButton({
  className,
  productId,
}: AddToCartButtonProps) {
  const isAuthenticated = useIsAuthenticated();
  const userRole = useUserRole();
 const { addItem } = useCartStoreActions();

  if (userRole === "admin" || userRole === "plant-doctor") {
    return null;
  }
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("لطفاً ابتدا ثبت‌نام یا لاگین کنید.");
      return;
    }

    await addItem(productId, 1);
  };

  return (
    <button onClick={handleClick} className={className}>
      <MdOutlineShoppingCart className="text-BLACK size-5 transition-colors max-md:size-4" />
    </button>
  );
}
