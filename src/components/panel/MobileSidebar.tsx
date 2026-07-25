"use client";
import { Overlay } from "@/components/shared/layout/public/header";
import { PanelLink } from "@/lib/constants/PanelLinks";
import PanelSidebar from "./PanelSidebar";

interface MobileSidebarProps {
  links: PanelLink[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({
  links,
  isOpen,
  onClose,
}: MobileSidebarProps) {


  return (
    <aside>
      <div
        className={`border-neutral3 fixed top-14 -right-70 z-40 h-[calc(100dvh-56px)] w-70 border bg-white p-4 shadow-lg transition-all duration-200 max-md:p-3 max-md:pl-0 md:hidden ${
          isOpen
            ? "visible -translate-x-70 opacity-100"
            : "invisible translate-x-70 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <PanelSidebar
            links={links}
            isPanelOpen={true}
            onClose={onClose}
          />
        </div>
      </div>

      <div className="md:hidden">
        <Overlay isOpen={isOpen} onClose={onClose} topOffset={56} zIndex={30} />
      </div>
    </aside>
  );
}
