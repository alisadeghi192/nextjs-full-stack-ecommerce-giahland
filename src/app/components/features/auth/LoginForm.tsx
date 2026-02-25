'use client'

import FormField from "./FormField";
import PasswordField from "./PasswordField";
import { MdOutlineMobileFriendly } from "react-icons/md";

interface LoginFormProps {
  onToggle: () => void;
}

export default function LoginForm({ onToggle }: LoginFormProps) {
  return (
    <div className="w-1/2">
      <div className="mx-auto w-72/100">
        <h5 className="mb-8 text-xl/7 font-semibold">ورود</h5>
        <form className="flex flex-col gap-y-6">
          <FormField
            icon={<MdOutlineMobileFriendly size={22} />}
            type="text"
            name="login-phone"
            id="login-phone"
            label="شماره موبایل"
          />
          <PasswordField
            name="login-password"
            id="login-password"
            label="رمز عبور"
          />
          <p className="text-primary text-sm -mt-2">بازیابی رمز عبور</p>
          <button
            type="submit"
            className="bg-primary text-WHITE mt-2 h-14 rounded-xl text-lg"
          >
            ورود
          </button>
        </form>
        <p className="mt-3 text-center">
          حساب کاربری ندارید؟
          <span
            onClick={onToggle}
            className="text-primary cursor-pointer mr-1"
          >
            ثبت نام
          </span>
          کنید.
        </p>
      </div>
    </div>
  );
}