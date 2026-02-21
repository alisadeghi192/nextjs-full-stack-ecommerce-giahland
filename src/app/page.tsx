import Link from "next/link";
import NavLink from "./components/shared/ui/NavLink";
import Image from "next/image";

const navLinks = [
  { text: "صفحه اصلی", href: "/" },
  { text: "گیاه پزشک", href: "/plant-doctor" },
  { text: "وبلاگ", href: "/blogs" },
  { text: "تماس با ما", href: "/contact-us" },
  { text: "درباره ما", href: "/about-us" },
];

export default function Home() {
  return (
    <div className="font-modam container font-medium">
      <nav className="bg-WHITE text-neutral12 flex items-center justify-between py-6">
        <div className="flex gap-8">
          <Link href="/">
            <h4 className="text-primary text-2xl/8.5 font-bold">گیاه لند</h4>
          </Link>

          <div className="flex gap-6">
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

        <div className="flex gap-4">
          <button className="border-primary group hover:border-shade2 transition-color cursor-pointer rounded-xl border p-3">
            <svg
              className="text-primary group-hover:text-shade2 transition-colors"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.755 14.255H14.965L14.685 13.985C15.665 12.845 16.255 11.365 16.255 9.755C16.255 6.165 13.345 3.255 9.755 3.255C6.165 3.255 3.255 6.165 3.255 9.755C3.255 13.345 6.165 16.255 9.755 16.255C11.365 16.255 12.845 15.665 13.985 14.685L14.255 14.965V15.755L19.255 20.745L20.745 19.255L15.755 14.255ZM9.755 14.255C7.26501 14.255 5.255 12.245 5.255 9.755C5.255 7.26501 7.26501 5.255 9.755 5.255C12.245 5.255 14.255 7.26501 14.255 9.755C14.255 12.245 12.245 14.255 9.755 14.255Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="border-primary group hover:border-shade2 transition-color cursor-pointer rounded-xl border p-3">
            <svg
              className="text-primary group-hover:text-shade2 transition-colors"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5463 13C17.2963 13 17.9563 12.59 18.2963 11.97L21.8763 5.48C22.2463 4.82 21.7663 4 21.0063 4H6.20628L5.26628 2H1.99628V4H3.99628L7.59628 11.59L6.24628 14.03C5.51628 15.37 6.47628 17 7.99628 17H19.9963V15H7.99628L9.09628 13H16.5463ZM7.15628 6H19.3063L16.5463 11H9.52628L7.15628 6ZM7.99628 18C6.89628 18 6.00628 18.9 6.00628 20C6.00628 21.1 6.89628 22 7.99628 22C9.09628 22 9.99628 21.1 9.99628 20C9.99628 18.9 9.09628 18 7.99628 18ZM17.9963 18C16.8963 18 16.0063 18.9 16.0063 20C16.0063 21.1 16.8963 22 17.9963 22C19.0963 22 19.9963 21.1 19.9963 20C19.9963 18.9 19.0963 18 17.9963 18Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="border-primary group hover:border-shade2 transition-color flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2">
            <svg
              className="text-primary group-hover:text-shade2 transition-colors"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7ZM20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-primary group-hover:text-shade2 text-lg/8.5 transition-colors">
              ورود/ثبت نام
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
