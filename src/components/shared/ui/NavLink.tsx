"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";

interface SubMenuItem {
  href: string;
  text: string;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  submenu?: SubMenuItem[];
}

const NavLink = ({ href, children, className, submenu }: NavLinkProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActive = pathname === href;

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 75);
  };
  const closeSubmenu = () => {
    setIsOpen(false)
  }

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
        {isOpen && (
          <div className="border-neutral3 divide-y divide-neutral3 absolute top-9.5 right-0 z-50 w-53.5 overflow-hidden rounded-xl border bg-white shadow-lg">
            {submenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-primary text-neutral10 flex items-center justify-between px-3 py-3 text-sm/6.25 transition-colors`}
                onClick={closeSubmenu}
              >
                {item.text}
                <MdKeyboardArrowLeft className="size-5" />
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
    >
      {children}
    </Link>
  );
};

export default NavLink;
