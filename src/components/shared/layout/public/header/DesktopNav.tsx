import Logo from "./Logo";
import NavLinks from "./NavLinks";
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
        <div className="flex items-center gap-x-6">
          <Logo />
          <NavLinks />
        </div>
        <HeaderActions isScrolled={isScrolled} />
      </div>
    </nav>
  );
}
