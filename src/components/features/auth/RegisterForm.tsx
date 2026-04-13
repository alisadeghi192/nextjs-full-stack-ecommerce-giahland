"use client";

import FormField from "./FormField";
import PasswordField from "./PasswordField";
import { MdMailOutline, MdOutlineMobileFriendly } from "react-icons/md";

interface RegisterFormProps {
  onToggle: () => void;
}

export default function RegisterForm({ onToggle }: RegisterFormProps) {
  return (
    <div className="bg-WHITE relative z-10 w-1/2 max-lg:w-2/3 max-sm:h-5/8 max-sm:w-full max-sm:rounded-t-[20px]">
      <div className="mx-auto w-72/100 max-md:w-90/100 mb-4">
        <h5 className="mb-8 text-xl/7 font-semibold max-sm:mt-3.25 max-sm:mb-6 max-sm:text-center max-sm:text-lg/8 max-sm:font-normal">
          ثبت نام
        </h5>
        <form className="flex flex-col gap-y-6 max-sm:gap-y-4">
          <FormField
            icon={<MdOutlineMobileFriendly size={22} />}
            type="text"
            name="register-phone"
            id="register-phone"
            label="شماره موبایل"
          />
          <FormField
            icon={<MdMailOutline size={22} />}
            type="email"
            name="email"
            id="email"
            label="ایمیل"
          />
          <PasswordField
            name="register-password"
            id="register-password"
            label="رمز عبور"
          />
          <PasswordField
            name="confirm-password"
            id="confirm-password"
            label="تکرار رمز عبور"
          />
          <button
            type="submit"
            className="bg-primary text-WHITE mt-2 flex h-14 items-center justify-center rounded-xl text-lg/10 max-sm:text-sm/6.25 max-sm:h-10"
          >
            ثبت نام
          </button>
        </form>
        <p className="mt-3 text-center max-sm:text-sm">
          حساب کاربری دارید؟
          <span onClick={onToggle} className="text-primary mr-1 cursor-pointer">
            {" "}
            ورود{" "}
          </span>
          کنید.
        </p>
      </div>
    </div>
  );
}
