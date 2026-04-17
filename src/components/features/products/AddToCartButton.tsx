"use client";
import { MdOutlineShoppingCart } from "react-icons/md";

interface AddToCartButtonProps {
  className: string;
}

export default function AddToCartButton({ className }: AddToCartButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert("به سبد خرید اضافه شد");
  };

  return (
    <button onClick={handleClick} className={className}>
      <MdOutlineShoppingCart className="text-BLACK size-5 max-md:size-4 transition-colors" />
    </button>
  );
}