"use client";
import { useEffect, useState } from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import { useScroll } from "../hooks/useScroll";
const ScrollToTop = () => {
  const isScrolled = useScroll(200);

  return (
    <button
      className={`${isScrolled ? "opacity-100!" : ""} border-primary bg-WHITE text-primary fixed bottom-10 left-10 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full border text-3xl opacity-0 shadow transition-opacity`}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <MdOutlineArrowUpward />
    </button>
  );
};
export default ScrollToTop;
