"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  useOpenSubmenu,
  useSetOpenSubmenu,
} from "@/stores/selectors/ui.selectors";

interface SubMenuItem {
  href: string;
  text: string;
}

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  submenu?: SubMenuItem[];
  onLinkClick?: () => void;
  menuOpen?: boolean;
}

const MobileNavLink = ({
  href,
  children,
  className,
  submenu,
  onLinkClick,
  menuOpen,
}: MobileNavLinkProps) => {
  const pathname = usePathname();
  const openSubmenu = useOpenSubmenu();
  const setOpenSubmenu = useSetOpenSubmenu();
  const isActive = pathname === href;
  const isSubmenuOpen = openSubmenu === href;

  useEffect(() => {
    if (!menuOpen) {
      setOpenSubmenu(null);
    }
  }, [menuOpen, setOpenSubmenu]);

  const toggleSubMenu = () => {
    if (isSubmenuOpen) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(href);
    }
  };

  const handleClick = () => {
    setOpenSubmenu(null);
    onLinkClick?.();
  };

  if (submenu) {
    return (
      <div>
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={toggleSubMenu}
        >
          <Link
            href={href}
            className={`font-medium ${className} ${isActive ? "text-primary" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {children}
          </Link>
          <MdKeyboardArrowDown
            className={`text-neutral8 size-6 transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`}
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isSubmenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mb-3.5 flex flex-col">
            {submenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-neutral10 px-3 py-2 text-sm/6.25"
                onClick={handleClick}
              >
                {item.text}
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
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default MobileNavLink;
