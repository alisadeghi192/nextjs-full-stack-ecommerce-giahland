"use client";

import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { ILoginInput } from "@/features/auth/schemas/auth.schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { MdOutlineMobileFriendly } from "react-icons/md";
import FormField from "../../shared/ui/FormField";
import PasswordField from "../../shared/ui/PasswordField";

interface LoginFormProps {
  onToggle: () => void;
  register: UseFormRegister<ILoginInput>;
  errors: FieldErrors<ILoginInput>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({
  onToggle,
  register,
  errors,
  isSubmitting,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="relative z-10 w-1/2 bg-white max-lg:w-2/3 max-sm:h-5/8 max-sm:w-full max-sm:rounded-t-[20px]">
      <div className="mx-auto mb-4 w-72/100 max-md:w-90/100">
        <h5 className="mb-8 text-xl/7 font-semibold max-sm:mt-3.25 max-sm:mb-6 max-sm:text-center max-sm:text-lg/8 max-sm:font-normal">
          ورود
        </h5>

        <form
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col gap-y-6 max-sm:gap-y-4"
        >
          <FormField
            id="mobile"
            icon={<MdOutlineMobileFriendly size={22} />}
            type="text"
            label="شماره موبایل"
            error={errors.mobile?.message}
            {...register("mobile")}
          />

          <PasswordField
            id="password"
            label="رمز عبور"
            error={errors.password?.message}
            {...register("password")}
          />

          <p className="text-primary -mt-2 cursor-pointer text-sm max-sm:-mt-1">
            بازیابی رمز عبور
          </p>

          <PrimaryButton
            disabled={isSubmitting}
            className="mt-2 h-14 text-lg/10 max-sm:mt-1 max-sm:h-10 max-sm:text-sm/6.25"
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </PrimaryButton>
        </form>

        <p className="mt-3 text-center max-sm:text-sm">
          حساب کاربری ندارید؟
          <span onClick={onToggle} className="text-primary mr-1 cursor-pointer">
            ثبت نام{" "}
          </span>
          کنید.
        </p>
      </div>
    </div>
  );
}
