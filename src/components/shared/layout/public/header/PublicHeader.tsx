"use client";
import React from "react";
import { useScroll } from "@/lib/hooks/useScroll";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const PublicHeader = () => {
  const isScrolled = useScroll();
  return (
    <header className="sticky top-0 right-0 left-0 z-50">
      <DesktopNav isScrolled={isScrolled} />
      <MobileNav isScrolled={isScrolled} />
    </header>
  );
};

export default PublicHeader;
