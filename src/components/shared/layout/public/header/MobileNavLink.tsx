"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

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
}

const MobileNavLink = ({
  href,
  children,
  className,
  submenu,
  onLinkClick,
}: MobileNavLinkProps) => {
  const pathname = usePathname();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const isActive = pathname === href;

  const toggleSubMenu = () => setIsSubmenuOpen((prev) => !prev);

  useEffect(() => {
    setIsSubmenuOpen(false);
  }, [onLinkClick]);

  const handleClick = () => {
    setIsSubmenuOpen(false);
    onLinkClick?.();
  };

  if (submenu) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <Link
            href={href}
            className={`font-medium ${className} ${isActive ? "text-primary" : ""}`}
            onClick={handleClick}
          >
            {children}
          </Link>
          <MdKeyboardArrowDown
            className={`text-neutral8 size-6 transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`}
            onClick={toggleSubMenu}
          />
        </div>
        {isSubmenuOpen && (
          <div
            className={`mb-3.5 flex flex-col ${isSubmenuOpen ? "visible" : "hidden"}`}
          >
            {submenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-neutral10 px-3 py-2 text-sm/6.25`}
                onClick={handleClick}
              >
                {item.text}
              </Link>
            ))}
          </div>
        )}
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
