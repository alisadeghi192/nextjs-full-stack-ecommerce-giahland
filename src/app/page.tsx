import Link from "next/link";
import NavLink from "./components/shared/ui/NavLink";
import Image from "next/image";
import {
  MdOutlineLogin,
  MdOutlineSearch,
  MdOutlineShoppingCart,
} from "react-icons/md";

const navLinks = [
  { text: "صفحه اصلی", href: "/" },
  { text: "گیاه پزشک", href: "/plant-doctor" },
  { text: "وبلاگ", href: "/blogs" },
  { text: "تماس با ما", href: "/contact-us" },
  { text: "درباره ما", href: "/about-us" },
];

const isUserLogin = false;

export default function Home() {
  return (
    <div className="font-modam border-neutral5 container border-b font-medium">
      {/* navlinks */}
      <nav className="bg-WHITE text-neutral12 flex items-center justify-between py-6">
        <div className="flex gap-8 max-lg:gap-4">
          <Link href="/">
            <h4 className="text-primary text-2xl/8.5 font-bold">گیاه لند</h4>
          </Link>

          <div className="flex gap-6 max-lg:gap-4">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                href={link.href}
                className="hover:text-primary text-lg/8.5 transition-colors"
              >
                {link.text}
              </NavLink>
            ))}
          </div>
        </div>
        {/* header buttuns */}

        <div className="flex gap-4">
          {/* search btn */}
          <button className="border-primary group hover:border-shade2 transition-color cursor-pointer rounded-xl border p-3">
            <MdOutlineSearch
              size={24}
              className="text-primary group-hover:text-shade2 transition-colors"
            />
          </button>
          {/* cart btn */}
          <button className="border-primary group hover:border-shade2 transition-color cursor-pointer rounded-xl border p-3">
            <MdOutlineShoppingCart
              size={24}
              className="text-primary group-hover:text-shade2 transition-colors"
            />
          </button>
          {/* login / user */}

          {isUserLogin ? (
            <button className="flex items-center gap-2">
              <Image
                src="/default-user.jpg"
                alt="user"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="text-lg max-lg:hidden">سلام کاربر</span>
            </button>
          ) : (
            <button className="border-primary group hover:border-shade2 transition-color flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 max-lg:p-3">
              <MdOutlineLogin
                size={24}
                className="text-primary group-hover:text-shade2 transition-colors"
              />

              <span className="text-primary group-hover:text-shade2 text-lg/8.5 transition-colors max-lg:hidden">
                ورود/ثبت نام
              </span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
