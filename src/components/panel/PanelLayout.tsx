"use client";
import { useState } from "react";
import { useScroll } from "@/lib/hooks/useScroll";
import PanelHeader from "./PanelHeader";
import { PanelLink } from "@/lib/constants/panelLinks";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

interface PanelLayoutProps {
  links: PanelLink[];
  children: React.ReactNode;
}

export default function PanelLayout({ links, children }: PanelLayoutProps) {
  const isScrolled = useScroll();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const toggleSidebar = () => setIsPanelOpen((prev) => !prev);

  return (
    <main>
      <PanelHeader
        isScrolled={isScrolled}
        isSidebarOpen={isPanelOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="relative container flex">
        <DesktopSidebar
          links={links}
          isScrolled={isScrolled}
          isPanelOpen={isPanelOpen}
        />

        <MobileSidebar
          links={links}
          isOpen={isPanelOpen}
          onClose={toggleSidebar}
        />

        <div className="flex-1 p-6 pl-0 max-md:p-0 max-md:pt-4 max-md:pb-7">{children}</div>
      </div>
    </main>
  );
}
