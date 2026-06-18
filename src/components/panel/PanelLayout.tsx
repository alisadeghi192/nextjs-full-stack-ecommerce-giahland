"use client";
import { PanelLink } from "@/lib/constants/panelLinks";
import { useScroll } from "@/lib/hooks/useScroll";
import {
  useIsSidebarOpen,
  useSidebarActions,
} from "@/stores/selectors/ui.selectors";
import { usePathname } from "next/navigation";
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
  const { closeSidebar, toggleSidebar } = useSidebarActions();
  const pathname = usePathname();
  const isChatPage =
    pathname?.includes("/consultations/") &&
    pathname?.split("/").length === 4 &&
    !pathname?.endsWith("/list");
  return (
    <main >
      <PanelHeader
        isScrolled={isChatPage ? true : isScrolled}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`relative flex ${isChatPage ? "md:container " : "container"}`}
      >
        <DesktopSidebar
          links={links}
          isScrolled={isChatPage ? true : isScrolled}
          isPanelOpen={isSidebarOpen}
        />

        <MobileSidebar
          links={links}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        <div
          className={`flex-1 pl-0 max-md:p-0 ${isChatPage ? "p-0 max-md:h-[calc(100dvh-60px)]" : "p-6 max-md:pt-4 max-md:pb-7"}`}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
