"use client";
import React from "react";
import { useScroll } from "@/lib/hooks/useScroll";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";


interface PublicHeaderProps {
  hasSearchInput?: boolean;
}

const PublicHeader = ({ hasSearchInput = true }: PublicHeaderProps) => {
  const isScrolled = useScroll();
  return (
    <header
      className="sticky top-0 right-0 left-0 z-40"
    >
      <DesktopNav isScrolled={isScrolled} />
      <MobileNav hasSearchInput={hasSearchInput} isScrolled={isScrolled} />
    </header>
  );
};

export default PublicHeader;
