import Image from "next/image";
import { MdOutlineLogin } from "react-icons/md";
import OutlineButton from "@/components/shared/ui/OutlineButton";
import {
  useIsAuthenticated,
  useAuthActions,
  useIsLoading,
} from "@/features/auth/selectors/auth.selectors";
import Link from "next/link";

export default function AuthButtons() {
  const isLoading = useIsLoading();
  const isAuthenticated = useIsAuthenticated();
  const { logout } = useAuthActions();

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200 max-lg:size-10" />
        <div className="h-12 w-24 animate-pulse rounded-xl bg-gray-200 max-lg:hidden" />
      </div>
    );
  }


  if (isAuthenticated) {
    return (
      <Link href="/user" className="flex cursor-pointer items-center gap-2">
        <Image
          src="/static/images/default-user.jpg"
          alt="user"
          width={48}
          height={48}
          className="size-12 rounded-full object-cover object-center max-lg:size-10"
        />
        <span className="text-lg max-lg:hidden">سلام کاربر</span>
      </Link>
    );
  }

  return (
    <OutlineButton
      href="/login-register"
      className="h-12 gap-x-2 px-4 max-lg:size-10 max-lg:gap-0 max-lg:px-0"
    >
      <MdOutlineLogin size={24} className="transition-colors" />
      <span className="text-lg/8.5 text-nowrap transition-colors max-lg:hidden">
        ورود/ثبت نام
      </span>
    </OutlineButton>
  );
}
