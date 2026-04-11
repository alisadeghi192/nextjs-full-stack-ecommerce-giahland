import NavLink from "./NavLink";

const navLinks = [
  { text: "صفحه اصلی", href: "/" },
  { text: "محصولات", href: "/products" },
  { text: "گیاه پزشک", href: "/plant-doctor" },
  { text: "وبلاگ", href: "/blogs" },
  { text: "تماس با ما", href: "/contact-us" },
  { text: "درباره ما", href: "/about-us" },
];

const NavLinks = () => {
  return (
    <>
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          className="hover:text-primary text-lg/8.5 max-lg:text-base/8.5 transition-colors"
        >
          {link.text}
        </NavLink>
      ))}
    </>
  );
};
export default NavLinks;
