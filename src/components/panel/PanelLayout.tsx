"use client";
import { PanelLink } from "@/lib/constants/panelLinks";
import { useScroll } from "@/lib/hooks/useScroll";
import {
  useIsSidebarOpen,
  useSidebarActions,
} from "@/stores/selectors/ui.selectors";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import PanelHeader from "./PanelHeader";

interface PanelLayoutProps {
  links: PanelLink[];
  children: React.ReactNode;
}

export default function PanelLayout({ links, children }: PanelLayoutProps) {
  const isScrolled = useScroll();
  const isSidebarOpen = useIsSidebarOpen();
  const { closeSidebar , toggleSidebar} = useSidebarActions();

  return (
    <main>
      <PanelHeader
        isScrolled={isScrolled}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="relative container flex">
        <DesktopSidebar
          links={links}
          isScrolled={isScrolled}
          isPanelOpen={isSidebarOpen}
        />

        <MobileSidebar
          links={links}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        <div className="flex-1 p-6 pl-0 max-md:p-0 max-md:pt-4 max-md:pb-7">
          {children}
        </div>
      </div>
    </main>
  );
}
