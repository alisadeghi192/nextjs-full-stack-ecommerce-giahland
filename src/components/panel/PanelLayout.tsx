"use client";
import { useState } from "react";
import { useScroll } from "@/lib/hooks/useScroll";
import PanelHeader from "./PanelHeader";
import PanelSidebar from "./PanelSidebar";
import { PanelLink } from "@/lib/constants/panelLinks";

interface PanelLayoutProps {
  links: PanelLink[];
  children: React.ReactNode;
}

export default function PanelLayout({ links, children }: PanelLayoutProps) {
  const isScrolled = useScroll();
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const toggleSidebar = () => setIsPanelOpen((prev) => !prev);

  return (
    <main>
      <PanelHeader isScrolled={isScrolled} isSidebarOpen={isPanelOpen} toggleSidebar={toggleSidebar} />

      <div className="relative container flex">
        <div
          className={`${isScrolled ? "top-15 h-[calc(100dvh-60px)]" : "top-24 h-[calc(100dvh-96px)]"} ${
            isPanelOpen ? "w-72" : "w-18"
          } border-neutral3 sticky shrink-0 overflow-hidden border-l bg-white`}
          style={{
            transition: "width 300ms ease, top 200ms ease, height 200ms ease",
          }}
        >
          <PanelSidebar links={links} isPanelOpen={isPanelOpen} />
        </div>

        <div className="flex-1 p-6">{children}</div>
      </div>
    </main>
  );
}