'use client'

import FormField from "./FormField";
import PasswordField from "./PasswordField";
import { MdMailOutline, MdOutlineMobileFriendly } from "react-icons/md";

interface RegisterFormProps {
  onToggle: () => void;
}

export default function RegisterForm({ onToggle }: RegisterFormProps) {
  return (
    <div className="w-1/2">
      <div className="mx-auto w-72/100">
        <h5 className="mb-8 text-xl/7 font-semibold">ثبت نام</h5>
        <form className="flex flex-col gap-y-6">
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
            className="bg-primary text-WHITE mt-2 h-14 rounded-xl text-lg"
          >
            ثبت نام
          </button>
        </form>
        <p className="mt-3 text-center">
          حساب کاربری دارید؟
          <span
            onClick={onToggle}
            className="text-primary cursor-pointer mr-1"
          >
            ورود
          </span>
          کنید.
        </p>
      </div>
    </div>
  );
}