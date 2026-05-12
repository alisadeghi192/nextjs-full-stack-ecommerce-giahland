"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import FormField from "../../shared/ui/FormField";
import PasswordField from "../../shared/ui/PasswordField";
import { MdMailOutline, MdOutlineMobileFriendly } from "react-icons/md";
import { IRegisterInput } from "@/features/auth/schemas/auth.schema";
import { useEffect } from "react";

interface RegisterFormProps {
  onToggle: () => void;
  register: UseFormRegister<IRegisterInput>;
  errors: FieldErrors<IRegisterInput>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  serverError?: string;
  serverSuccess?: string;
}

export default function RegisterForm({
  onToggle,
  register,
  errors,
  isSubmitting,
  onSubmit,
  serverError,
  serverSuccess,
}: RegisterFormProps) {
  useEffect(() => {
    if (serverError) {
      alert(serverError);
    }
    if (serverSuccess) {
      alert(serverSuccess);
    }
  }, [serverError, serverSuccess]);
  return (
    <div className="relative z-10 w-1/2 bg-white max-lg:w-2/3 max-sm:h-5/8 max-sm:w-full max-sm:rounded-t-[20px]">
      <div className="mx-auto mb-4 w-72/100 max-md:w-90/100">
        <h5 className="mb-8 text-xl/7 font-semibold max-sm:mt-3.25 max-sm:mb-6 max-sm:text-center max-sm:text-lg/8 max-sm:font-normal">
          ثبت نام
        </h5>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-y-5 max-sm:gap-y-4"
        >
          <FormField
            id="mobile"
            icon={<MdOutlineMobileFriendly size={22} />}
            type="text"
            label="شماره موبایل"
            error={errors.mobile?.message}
            {...register("mobile")}
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
          <span onClick={onToggle} className="text-primary mr-1 cursor-pointer">
            ورود{" "}
          </span>
          کنید.
        </p>
      </div>
    </div>
  );
}
