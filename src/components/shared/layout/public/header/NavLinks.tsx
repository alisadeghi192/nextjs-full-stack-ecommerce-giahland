import NavLink from "./NavLink";
import { navLinks } from "@/lib/constants";


const NavLinks = () => {
  return (
    <div className="flex gap-x-8 max-xl:gap-x-4 ">
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          className="hover:text-primary text-nowrap text-lg/8.5 transition-colors "
          submenu={link.submenu}
        >
          {link.text}
        </NavLink>
      ))}
    </div>
  );
};
export default NavLinks;
