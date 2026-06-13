"use client";
import { useUserRole } from "@/features/auth/selectors/auth.selectors";
import { MdOutlineShoppingCart } from "react-icons/md";
interface AddToCartButtonProps {
  className: string;
}

export default function AddToCartButton({ className }: AddToCartButtonProps) {
  const userRole = useUserRole();
  const isDoctor = userRole === "plant-doctor";
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert("به سبد خرید اضافه شد");
  };

  if (isDoctor) {
    return null;
  }

  return (
    <button onClick={handleClick} className={className}>
      <MdOutlineShoppingCart className="text-BLACK size-5 transition-colors max-md:size-4" />
    </button>
  );
}
