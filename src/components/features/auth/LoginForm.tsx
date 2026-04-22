"use client";

import FormField from "../../shared/ui/FormField";
import PasswordField from "../../shared/ui/PasswordField";
import { MdOutlineMobileFriendly } from "react-icons/md";

interface LoginFormProps {
  onToggle: () => void;
}

export default function LoginForm({ onToggle }: LoginFormProps) {
  return (
    <div className="bg-WHITE relative z-10 w-1/2 max-lg:w-2/3 max-sm:h-5/8 max-sm:w-full max-sm:rounded-t-[20px]">
      <div className="mx-auto mb-4 w-72/100 max-md:w-90/100">
        <h5 className="mb-8 text-xl/7 font-semibold max-sm:mt-3.25 max-sm:mb-6 max-sm:text-center max-sm:text-lg/8 max-sm:font-normal">
          ورود
        </h5>
        <form className="flex flex-col gap-y-6 max-sm:gap-y-4">
          <FormField
            icon={<MdOutlineMobileFriendly size={22} />}
            type="text"
            name="login-phone"
            label="شماره موبایل"
          />
          <PasswordField
            name="login-password"
            label="رمز عبور"
          />
          <p className="text-primary -mt-2 text-sm max-sm:-mt-1">
            بازیابی رمز عبور
          </p>
          <button
            type="submit"
            className="bg-primary text-WHITE mt-2 flex h-14 items-center justify-center rounded-xl text-lg/10 max-sm:mt-1 max-sm:h-10 max-sm:text-sm/6.25"
          >
            ورود
          </button>
        </form>
        <p className="mt-3 text-center max-sm:text-sm">
          حساب کاربری ندارید؟
          <span onClick={onToggle} className="text-primary mr-1 cursor-pointer">
            {" "}
            ثبت نام{" "}
          </span>
          کنید.
        </p>
      </div>
    </div>
  );
}
