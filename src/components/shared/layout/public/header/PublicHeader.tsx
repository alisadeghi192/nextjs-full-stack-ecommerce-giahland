"use client";
import NavigationProgress from "@/components/shared/layout/public/NavigationProgress";
import { useAllNotifications } from "@/features/notifications/hooks/useAllNotifications";
import { useScroll } from "@/lib/hooks/useScroll";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { DesktopHeader, MobileHeader } from ".";

export default function PublicHeader() {
  const isScrolled = useScroll();
  const pathname = usePathname();
  const { refresh } = useAllNotifications();

  useEffect(() => {
    refresh();
  }, [pathname]);

  return (
    <header className="sticky top-0 right-0 left-0 z-50 bg-white dark:bg-shade5 transition-colors">
      <DesktopHeader isScrolled={isScrolled} />
      <MobileHeader isScrolled={isScrolled} />
      <NavigationProgress/>
    </header>
  );
}
