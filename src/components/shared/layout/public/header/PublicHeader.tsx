"use client";
import React from "react";
import { useScroll } from "@/lib/hooks/useScroll";
import { DesktopHeader, MobileHeader } from ".";

export default function PublicHeader() {
  const isScrolled = useScroll();
  return (
    <header className="sticky top-0 right-0 left-0 z-50">
      <DesktopHeader isScrolled={isScrolled} />
      <MobileHeader isScrolled={isScrolled} />
    </header>
  );
}
