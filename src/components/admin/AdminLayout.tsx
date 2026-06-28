"use client";
import MobileSidebar from "@/components/panel//MobileSidebar";
import DesktopSidebar from "@/components/panel/DesktopSidebar";
import { PanelLink } from "@/lib/constants/panelLinks";
import {
    useIsSidebarOpen,
    useSidebarActions,
} from "@/stores/selectors/ui.selectors";
import { usePathname } from "next/navigation";
import AdminHeader from "./AdminHeader";

interface AdminLayoutProps {
  links: PanelLink[];
  children: React.ReactNode;
}

export default function AdminLayout({ links, children }: AdminLayoutProps) {
  const isSidebarOpen = useIsSidebarOpen();
  const { closeSidebar, toggleSidebar } = useSidebarActions();
  const pathname = usePathname();
  const isChatPage =
    pathname?.includes("/consultations/") &&
    pathname?.split("/").length === 4 &&
    !pathname?.endsWith("/list");
  return (
    <main >
      <AdminHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`relative flex ${isChatPage ? "md:container " : "container"}`}
      >
        <DesktopSidebar
          links={links}
          isScrolled={true}
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
