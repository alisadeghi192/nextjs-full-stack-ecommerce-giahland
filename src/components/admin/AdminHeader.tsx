"use client";
import DesktopAdminHeader from "./DesktopAdminHeader";
import MobileAdminHeader from "./MobileAdminHeader";

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function AdminHeader({
  isSidebarOpen,
  toggleSidebar,
}: AdminHeaderProps) {
  
  return (
    <header className="sticky top-0 right-0 left-0 z-50 bg-white">
      <DesktopAdminHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <MobileAdminHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </header>
  );
}