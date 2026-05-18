"use client";

import { navLinks } from "@/lib/constants";
import NavLink from "./NavLink";

export default function NavLinks() {
  return (
    <ul className="flex gap-x-6">
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          submenu={link.submenu}
          className="text-lg/8 font-medium transition-colors hover:text-primary max-xl:text-base"
        >
          {link.text}
        </NavLink>
      ))}
    </ul>
  );
}