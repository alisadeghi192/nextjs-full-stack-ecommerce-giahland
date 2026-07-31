"use client";
import { PanelLink } from "@/lib/constants/PanelLinks";
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
      } border-neutral3 dark:border-neutral10 sticky shrink-0 overflow-hidden border-l bg-white dark:bg-shade5 max-md:hidden`}
      style={{
        transition: "width 300ms ease, top 200ms ease, height 200ms ease , background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <PanelSidebar links={links} isPanelOpen={isPanelOpen} isAdminPanel={isAdmin}/>
    </div>
  );
}