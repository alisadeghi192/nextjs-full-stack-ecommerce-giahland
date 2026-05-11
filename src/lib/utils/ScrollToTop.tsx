"use client";
import { MdOutlineArrowUpward } from "react-icons/md";
import { useEffect, useState } from "react";
import { useScroll } from "../hooks/useScroll";
import { SCROLL_TO_TOP_THRESHOLD } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { useFooterVisibility } from "../hooks/useFooterVisibility";

const ScrollToTop = () => {
  const isScrolled = useScroll(SCROLL_TO_TOP_THRESHOLD);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const isFooterVisible = useFooterVisibility();
  const pathname = usePathname();
  const isSingleProductPage =
    pathname?.startsWith("/products/") && pathname?.split("/").length === 4;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleProgress = () => {
      //    scrollable height = all page content height - veiwport height
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleProgress, { passive: true });
    handleProgress();
    return () => window.removeEventListener("scroll", handleProgress);
  }, []);

  const isMobile = windowWidth < 640;
  const shouldAdjust = isSingleProductPage && isMobile;

  const bottomPosition = shouldAdjust ? isFooterVisible ? "bottom-6" : "bottom-24" : "bottom-6";

  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      className={`${isScrolled ? "opacity-100!" : ""} text-primary fixed bottom-6 left-6 z-40 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-3xl opacity-0 shadow transition-all ${bottomPosition}`}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="absolute -rotate-90"
      >
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="2"
        />
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
