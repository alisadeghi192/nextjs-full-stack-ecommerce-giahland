"use client";
import { useEffect, useState } from "react";
import PriceSection from "./PriceSection";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";

interface MobileStickyCartProps {
  price: number;
  discount: number;
  onAddToCart?: () => void;
}

export default function MobileStickyCart({
  price,
  discount,
  onAddToCart,
}: MobileStickyCartProps) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHide(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px 80px 0px" },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={`shadow-top border-neutral4 max-xs:gap-x-8 fixed right-0 bottom-0 left-0 z-40 flex h-20 items-center justify-center gap-x-15 border-t bg-white px-4 transition-all duration-300 max-[400px]:gap-x-2! sm:hidden ${hide ? "pointer-events-none translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <PrimaryButton
          href={"/"}
          className="px-4.5 py-2 text-lg/8 max-[400px]:px-2.5 max-[400px]:text-base!"
        >
          افزودن به سبد خرید
        </PrimaryButton>
        <PriceSection
          price={price}
          discount={discount}
          variant="sticky-footer"
        />
      </div>
    </>
  );
}
