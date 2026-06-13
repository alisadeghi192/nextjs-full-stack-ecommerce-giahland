"use client";
import { useIsAuthenticated } from "@/features/auth/selectors/auth.selectors";
import { toggleLike } from "@/features/user/actions/wishlist.actions";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface LikeButtonProps {
  productId: string;
  initialLiked?: boolean;
  className: string;
  mobileResponsive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function LikeButton({
  productId,
  initialLiked = false,
  className,
  mobileResponsive = false,
  onClick,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(e);

    if (!isAuthenticated) {
      toast.error("برای لایک کردن ابتدا وارد شوید.");
      return;
    }

    setIsLiked((prev) => !prev);
    setIsLoading(true);

    const result = await toggleLike(productId);
    if (!result.success) {
      setIsLiked((prev) => !prev);
      toast.error("خطا در ثبت لایک");
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`bg-bg-error absolute flex size-8 cursor-pointer items-center justify-center rounded-full transition-all hover:bg-error/30 ${className}`}
    >
      {isLiked ? (
        <BsHeartFill
          className={`text-error size-5 mt-0.5 ${mobileResponsive ? "max-md:size-4" : ""}`}
        />
      ) : (
        <BsHeart
          className={`text-neutral7 size-5 mt-0.5 ${mobileResponsive ? "max-md:size-4" : ""}`}
        />
      )}
    </button>
  );
}