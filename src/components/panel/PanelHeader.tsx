"use client";
import DesktopPanelHeader from "./DesktopPanelHeader";
import MobilePanelHeader from "./MobilePanelHeader";

interface PanelHeaderProps {
  isScrolled: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function PanelHeader({
  isScrolled,
  isSidebarOpen,
  toggleSidebar,
}: PanelHeaderProps) {
  return (
    <header className="sticky top-0 right-0 left-0 z-50 bg-white">
      <DesktopPanelHeader
        isScrolled={isScrolled}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <MobilePanelHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </header>
  );
}