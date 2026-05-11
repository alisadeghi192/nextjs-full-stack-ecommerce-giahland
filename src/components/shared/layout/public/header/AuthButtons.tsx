import Image from "next/image";
import { MdOutlineLogin } from "react-icons/md";
import OutlineButton from "@/components/shared/ui/OutlineButton";

const isUserLogin = false;

export default function AuthButtons() {
  if (isUserLogin) {
    return (
      <button className="flex items-center gap-2">
        <Image
          src="/static/images/default-user.jpg"
          alt="user"
          width={48}
          height={48}
          className="rounded-full max-lg:size-10"
        />
        <span className="text-lg max-lg:hidden">سلام کاربر</span>
      </button>
    );
  }

  return (
    <OutlineButton
      href="/login-register"
      className="h-12 gap-x-2 px-4 max-lg:size-10 max-lg:gap-0 max-lg:px-0"
    >
      <MdOutlineLogin size={24} className="transition-colors" />
      <span className="text-lg/8.5 transition-colors max-lg:hidden text-nowrap">
        ورود/ثبت نام
      </span>
    </OutlineButton>
  );
}