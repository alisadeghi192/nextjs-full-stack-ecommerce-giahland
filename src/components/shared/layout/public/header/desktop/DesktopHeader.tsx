import { DesktopActions, DesktopNav, Logo } from "..";

interface DesktopHeaderProps {
  isScrolled: boolean;
}

export default function DesktopHeader({ isScrolled }: DesktopHeaderProps) {
  return (
    <nav className="border-neutral5 dark:border-neutral10 transition-colors container border-b font-medium max-md:hidden">
      <div
        className={`text-neutral12 dark:text-white flex items-center justify-between dark:bg-shade5 bg-white transition-all ${
          isScrolled ? "h-15" : "h-24"
        }`}
      >
        <div className="flex items-center gap-x-6">
          <Logo />
          <DesktopNav />
        </div>
        <DesktopActions isScrolled={isScrolled} />
      </div>
    </nav>
  );
}
