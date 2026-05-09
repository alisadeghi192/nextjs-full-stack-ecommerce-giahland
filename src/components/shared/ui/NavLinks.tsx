import NavLink from "./NavLink";
import { navLinks } from "@/lib/constants";


const NavLinks = () => {
  return (
    <>
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          className="hover:text-primary text-nowrap text-lg/8.5 transition-colors max-lg:text-base/8.5"
          submenu={link.submenu}
        >
          {link.text}
        </NavLink>
      ))}
    </>
  );
};
export default NavLinks;
