"use client";

import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { IRegisterInput } from "@/features/auth/schemas/auth.schema";
import { toEnglishDigits } from "@/lib/utils/format";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { MdMailOutline, MdOutlineMobileFriendly } from "react-icons/md";
import FormField from "../../shared/ui/FormField";
import PasswordField from "../../shared/ui/PasswordField";

interface RegisterFormProps {
  onToggle: () => void;
  register: UseFormRegister<IRegisterInput>;
  errors: FieldErrors<IRegisterInput>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function RegisterForm({
  onToggle,
  register,
  errors,
  isSubmitting,
  onSubmit,
}: RegisterFormProps) {
  return (
    <div className="dark:bg-shade5 relative z-10 w-1/2 bg-white max-lg:w-2/3 max-sm:h-5/8 max-sm:w-full max-sm:rounded-t-[20px]">
      <div className="mx-auto w-72/100 pb-4 max-md:w-90/100">
        <h5 className="mb-8 text-xl/7 font-semibold max-sm:mt-3.25 max-sm:mb-6 max-sm:text-center max-sm:text-lg/8 max-sm:font-normal">
          ثبت نام
        </h5>

        <form
          onSubmit={onSubmit}
          noValidate
          className="flex flex-col gap-y-5 max-sm:gap-y-4"
        >
          <FormField
            id="mobile"
            icon={<MdOutlineMobileFriendly size={22} />}
            type="text"
            label="شماره موبایل"
            error={errors.mobile?.message}
            {...register("mobile", {
              onChange: (e) => {
                e.target.value = toEnglishDigits(e.target.value);
              },
            })}
          />
          <FormField
            id="email"
            icon={<MdMailOutline size={22} />}
            type="email"
            label="ایمیل"
            error={errors.email?.message}
            {...register("email")}
          />
          <PasswordField
            id="password"
            label="رمز عبور"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordField
            id="confirmPassword"
            label="تکرار رمز عبور"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <PrimaryButton
            disabled={isSubmitting}
            className="mt-2 h-14 text-lg/10 max-sm:mt-1 max-sm:h-10 max-sm:text-sm/6.25"
          >
            {isSubmitting ? "در حال ثبت‌نام..." : "ثبت نام"}
          </PrimaryButton>
        </form>

        <p className="mt-3 text-center max-sm:text-sm">
          حساب کاربری دارید؟
          <span
            onClick={onToggle}
            className="text-primary dark:text-primary-dark mr-1 cursor-pointer"
          >
            ورود{" "}
          </span>
          کنید.
        </p>
      </div>
    </div>
  );
}
