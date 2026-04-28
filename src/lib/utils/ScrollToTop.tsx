"use client";
import { MdOutlineArrowUpward } from "react-icons/md";
import { useScroll } from "../hooks/useScroll";
import { SCROLL_TO_TOP_THRESHOLD } from "@/lib/constants";
const ScrollToTop = () => {
  const isScrolled = useScroll(SCROLL_TO_TOP_THRESHOLD);

  return (
    <button
      className={`${isScrolled ? "opacity-100!" : ""} border-primary bg-white text-primary fixed bottom-10 left-10 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full border text-3xl opacity-0 shadow transition-opacity`}
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
