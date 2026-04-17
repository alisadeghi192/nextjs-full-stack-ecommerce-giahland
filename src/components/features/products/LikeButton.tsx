"use client";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface LikeButtonProps {
  className: string;
  mobileResponsive: boolean;
}

export default function LikeButton({ className , mobileResponsive }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button onClick={handleClick} className={className}>
      {isLiked ? (
        <BsHeartFill className={`text-error size-5 ${mobileResponsive ? "max-md:size-4" : ""}`} />
      ) : (
        <BsHeart className={`text-neutral7 size-5 ${mobileResponsive ? "max-md:size-4" : ""}`} />
      )}
    </button>
  );
}