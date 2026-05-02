"use client";
import { useEffect, useState } from "react";

export function useFooterVisibility() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "0px 0px 80px 0px" }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return isFooterVisible;
}