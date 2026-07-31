"use client";
import PasswordField from "@/components/shared/ui/PasswordField";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { changePasswordAction } from "@/features/user/actions/changePassword.actions";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(
    changePasswordAction,
    null,
  );

  useEffect(() => {
    if (state?.success && state?.message) {
      toast.success(state.message);
    } else if (state?.errors) {
      const firstError = Object.values(state.errors)[0]?.[0];
      if (firstError) toast.error(firstError);
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="border-neutral3 dark:border-neutral10 dark:shadow-shade6 rounded-2xl border p-6 shadow-lg max-md:p-3.5">
      <form action={formAction} noValidate>
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1 max-md:gap-3.5 lg:[&>*:first-child]:col-span-2">
          <PasswordField
            id="oldPassword"
            name="oldPassword"
            label="رمز عبور فعلی"
          />
          <PasswordField
            id="newPassword"
            name="newPassword"
            label="رمز عبور جدید"
          />
          <PasswordField
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="تکرار رمز عبور جدید"
          />
        </div>
        <PrimaryButton
          disabled={isPending}
          className="mt-4 mr-auto h-12 w-43 text-lg max-md:mt-3.5 max-md:w-full"
        >
          {isPending ? "در حال ذخیره..." : "ذخیره"}
        </PrimaryButton>
      </form>
    </div>
  );
}
