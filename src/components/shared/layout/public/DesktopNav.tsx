import Logo from "../../ui/Logo";
import NavLinks from "../../ui/NavLinks";
import HeaderActions from "./HeaderActions";

interface DesktopNavProps {
  isScrolled: boolean;
}

export default function DesktopNav({ isScrolled }: DesktopNavProps) {
  return (
    <nav className="border-neutral5 container border-b font-medium max-md:hidden">
      <div
        className={`text-neutral12 flex items-center justify-between bg-white transition-all ${
          isScrolled ? "h-15" : "h-24"
        }`}
      >
        <div className="flex items-center gap-x-6 max-xl:gap-x-4 max-lg:gap-x-2">
          <Logo />
          <div className="flex gap-x-8 max-xl:gap-x-4 max-lg:gap-x-3">
            <NavLinks />
          </div>
        </div>
        <HeaderActions isScrolled={isScrolled} />
      </div>
    </nav>
  );
}
