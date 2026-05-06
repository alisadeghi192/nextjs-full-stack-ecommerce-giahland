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
        className={`bg-white text-neutral12 flex items-center justify-between transition-all ${
          isScrolled ? "h-15" : "h-24"
        }`}
      >
        <div className="flex gap-8 max-lg:gap-4">
          <Logo pageSize="desktop" />
          <div className="flex gap-6 max-lg:gap-3">
            <NavLinks />
          </div>
        </div>
        <HeaderActions isScrolled = {isScrolled}/>
      </div>
    </nav>
  );
}