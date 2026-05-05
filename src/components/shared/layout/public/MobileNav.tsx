import Logo from "../../ui/Logo";
import MobileMenu from "../../ui/MobileMenu";
import SearchBox from "../../ui/SearchBox";
import IconButton from "../../ui/IconButton";
import { MdOutlineDarkMode, MdOutlineLogin, MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";

interface MobileNavProps {
  isScrolled: boolean;
  hasSearchInput: boolean;
}

export default function MobileNav({ isScrolled, hasSearchInput }: MobileNavProps) {
  return (
    <nav className="border-neutral3 bg-white border-b py-3 md:hidden">
      <div
        className={`container flex flex-col gap-y-3 ${isScrolled ? "gap-y-2.5!" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MobileMenu />
            <Logo pageSize="mobile" />
          </div>
          <div className="flex items-center gap-2">
            <IconButton icon={<MdOutlineDarkMode size={20} />} />
            <IconButton icon={<MdOutlineShoppingCart size={20} />} />
            <Link href="/login-register">
              <IconButton icon={<MdOutlineLogin size={20} />} />
            </Link>
          </div>
        </div>
        {hasSearchInput && <SearchBox />}
      </div>
    </nav>
  );
}