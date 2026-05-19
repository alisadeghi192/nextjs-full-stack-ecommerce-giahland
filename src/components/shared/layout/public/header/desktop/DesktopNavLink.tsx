"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";
import {
  useActiveNavHover,
  useSetActiveNavHover,
} from "@/stores/selectors/ui.selectors";

interface SubMenuItem {
  href: string;
  text: string;
}

interface DesktopNavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  submenu?: SubMenuItem[];
}

const DesktopNavLink = ({
  href,
  children,
  className,
  submenu,
}: DesktopNavLinkProps) => {
  const pathname = usePathname();
  const activeNavHover = useActiveNavHover();
  const setActiveNavHover = useSetActiveNavHover();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActive = pathname === href;
  const isOpen = activeNavHover === href;

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const clearOpenTimeout = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearCloseTimeout();
    clearOpenTimeout();
    openTimeoutRef.current = setTimeout(() => setActiveNavHover(href), 100);
  };

  const handleMouseLeave = () => {
    clearOpenTimeout();
    closeTimeoutRef.current = setTimeout(() => setActiveNavHover(null), 75);
  };

  const closeSubmenu = () => {
    setActiveNavHover(null);
  };

  if (submenu) {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href={href}
          className={`flex items-center gap-x-1 max-lg:gap-x-px ${className} ${isActive ? "text-primary" : ""}`}
        >
          {children}
          <MdKeyboardArrowDown
            className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </Link>

        <div
          className={`absolute top-9.5 right-0 z-50 transition-all duration-200 ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
          onMouseEnter={clearCloseTimeout}
          onMouseLeave={handleMouseLeave}
        >
          <div className="border-neutral3 divide-neutral3 w-53.5 divide-y overflow-hidden rounded-xl border bg-white shadow-lg">
            {submenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-neutral10 hover:text-primary flex items-center justify-between px-3 py-3 text-sm/6.25 transition-colors"
                onClick={closeSubmenu}
              >
                {item.text}
                <MdKeyboardArrowLeft className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? "text-primary" : ""}`}
    >
      {children}
    </Link>
  );
};

export default DesktopNavLink;
