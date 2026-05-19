"use client";

import { navLinks } from "@/lib/constants";
import {DesktopNavLink} from "..";

export default function DesktopNav() {
  return (
    <ul className="flex gap-x-6">
      {navLinks.map((link) => (
        <DesktopNavLink
          key={link.href}
          href={link.href}
          submenu={link.submenu}
          className="text-lg/8 font-medium transition-colors hover:text-primary max-xl:text-base"
        >
          {link.text}
        </DesktopNavLink>
      ))}
    </ul>
  );
}