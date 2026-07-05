"use client";
import { PanelLink } from "@/lib/constants/panelLinks";
import PanelSidebar from "./PanelSidebar";

interface DesktopSidebarProps {
  links: PanelLink[];
  isScrolled: boolean;
  isPanelOpen: boolean;
  isAdmin : boolean;
}

export default function DesktopSidebar({ links, isScrolled, isPanelOpen , isAdmin=false }: DesktopSidebarProps) {
  return (
    <div
      className={`${isScrolled ? "top-15 h-[calc(100dvh-61px)]" : "top-24 h-[calc(100dvh-97px)]"} ${
        isPanelOpen ? "w-72 max-lg:w-60" : "w-18"
      } border-neutral3 sticky shrink-0 overflow-hidden border-l bg-white max-md:hidden`}
      style={{
        transition: "width 300ms ease, top 200ms ease, height 200ms ease",
      }}
    >
      <PanelSidebar links={links} isPanelOpen={isPanelOpen} isAdminPanel={isAdmin}/>
    </div>
  );
}