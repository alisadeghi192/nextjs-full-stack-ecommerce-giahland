"use client";
import { useEffect, useState } from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import { useScroll } from "../hooks/useScroll";
const ScrollToTop = () => {
  const isScrolled = useScroll(200);

  return (
    <button
      className={`${isScrolled ? "opacity-100!" : ""} fixed size-10 border border-primary bottom-10 left-10 rounded-full bg-WHITE  text-primary cursor-pointer text-3xl shadow  opacity-0 flex items-center justify-center transition-opacity z-50`}
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
