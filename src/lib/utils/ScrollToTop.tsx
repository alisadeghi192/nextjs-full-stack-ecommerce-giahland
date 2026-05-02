"use client";
import { MdOutlineArrowUpward } from "react-icons/md";
import { useEffect, useState } from "react";
import { useScroll } from "../hooks/useScroll";
import { SCROLL_TO_TOP_THRESHOLD } from "@/lib/constants";

const ScrollToTop = () => {
  const isScrolled = useScroll(SCROLL_TO_TOP_THRESHOLD);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleProgress = () => {
      //    scrollable height = all page content height - veiwport height
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleProgress, { passive: true });
    handleProgress();
    return () => window.removeEventListener("scroll", handleProgress);
  }, []);

  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      className={`${isScrolled ? "opacity-100!" : ""}  bg-white text-primary fixed bottom-10 left-10 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full  text-3xl opacity-0 shadow transition-opacity`}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" className="absolute -rotate-90">
        <circle cx="20" cy="20" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="2" />
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary"
        />
      </svg>
      <MdOutlineArrowUpward className="relative" />
    </button>
  );
};

export default ScrollToTop;