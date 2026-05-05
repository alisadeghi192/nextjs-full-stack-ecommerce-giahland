import Image from "next/image";
import Link from "next/link";
import { MdOutlineLogin } from "react-icons/md";
import OutlineButton from "../../ui/OutlineButton";

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
          className="rounded-full"
        />
        <span className="text-lg max-lg:hidden">سلام کاربر</span>
      </button>
    );
  }

  return (
    <OutlineButton
      href="/login-register"
      className="h-12 gap-2 px-4 max-lg:size-12 max-lg:gap-0 max-lg:px-3"
    >
      <MdOutlineLogin size={24} className="transition-colors" />
      <span className="text-lg/8.5 transition-colors max-lg:hidden">
        ورود/ثبت نام
      </span>
    </OutlineButton>
  );
}