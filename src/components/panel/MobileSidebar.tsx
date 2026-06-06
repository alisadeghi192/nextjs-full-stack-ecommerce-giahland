"use client";
import { PanelLink } from "@/lib/constants/panelLinks";
import PanelSidebar from "./PanelSidebar";
import { Overlay } from "@/components/shared/layout/public/header";

interface MobileSidebarProps {
  links: PanelLink[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ links, isOpen, onClose }: MobileSidebarProps) {
  return (
    <aside>
      <div
        className={`border-neutral3 fixed top-14 -right-82 z-40 h-[calc(100dvh-56px)] w-82 border bg-white p-4 shadow-lg transition-all duration-200 max-md:p-3 max-md:pl-0 md:hidden ${
          isOpen
            ? "visible -translate-x-82 opacity-100"
            : "invisible translate-x-82 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <PanelSidebar links={links} isPanelOpen={true} />
        </div>
      </div>

      <div className="md:hidden">
        <Overlay
          isOpen={isOpen}
          onClose={onClose}
          topOffset={56}
          zIndex={30}
        />
      </div>
    </aside>
  );
}