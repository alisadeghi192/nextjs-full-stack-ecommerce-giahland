"use client";

import { NAV_LINKS } from "@/lib/constants";
import { DesktopNavLink } from "..";

export default function DesktopNav() {
  return (
    <ul className="flex gap-x-6">
      {NAV_LINKS.map((link) => (
        <DesktopNavLink
          key={link.href}
          href={link.href}
          submenu={link.submenu}
          className="text-lg/8 font-medium transition-colors hover:text-primary dark:hover:text-primary-dark max-xl:text-base"
        >
          {link.text}
        </DesktopNavLink>
      ))}
    </ul>
  );
}