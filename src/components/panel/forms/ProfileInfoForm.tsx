"use client";
import { useActionState, useEffect } from "react";
import { updateProfileAction } from "@/features/user/actions/updateProfile.actions";
import {
  useUserFirstName,
  useUserLastName,
  useUserMobile,
  useUserEmail,
  useUserAddress,
  useUserPostalCode,
  useCheckAuth,
} from "@/features/auth/selectors/auth.selectors";
import FormField from "@/components/shared/ui/FormField";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { BsSignpost } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdAlternateEmail, MdDriveFileRenameOutline } from "react-icons/md";
import toast from "react-hot-toast";
import AvatarUpload from "../AvatarUpload";

export default function ProfileInfoForm() {
  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    null,
  );

  const checkAuth = useCheckAuth();

  const firstName = useUserFirstName() || "";
  const lastName = useUserLastName() || "";
  const email = useUserEmail() || "";
  const address = useUserAddress() || "";
  const postalCode = useUserPostalCode() || "";
  const mobile = useUserMobile() || "";

  useEffect(() => {
    if (state?.success && state?.message) {
      toast.success(state.message);
      checkAuth();
    } else if (state?.errors) {
      const firstError = Object.values(state.errors)[0]?.[0];
      if (firstError) toast.error(firstError);
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="border-neutral3 rounded-2xl border p-6 shadow-lg">
      <AvatarUpload />

      <form action={formAction}>
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
          <FormField
            icon={<MdDriveFileRenameOutline size={20} />}
            id="firstName"
            name="firstName"
            label="نام"
            type="text"
            defaultValue={firstName}
          />
          <FormField
            icon={<MdDriveFileRenameOutline size={20} />}
            id="lastName"
            name="lastName"
            label="نام خانوادگی"
            type="text"
            defaultValue={lastName}
          />
          <FormField
            icon={<IoPhonePortraitOutline size={20} />}
            id="mobile"
            name="mobile"
            label="شماره موبایل"
            type="text"
            defaultValue={mobile}
            disabled
          />
          <FormField
            icon={<BsSignpost size={20} />}
            id="postalCode"
            name="postalCode"
            label="کد پستی"
            type="text"
            defaultValue={postalCode}
          />
          <FormField
            icon={<MdAlternateEmail size={20} />}
            id="email"
            name="email"
            label="ایمیل"
            type="email"
            defaultValue={email}
          />
          <FormField
            icon={<GoHome size={20} />}
            id="address"
            name="address"
            label="آدرس"
            type="text"
            defaultValue={address}
          />
        </div>
        <PrimaryButton
          disabled={isPending}
          className="mt-4 mr-auto h-12 w-43 text-lg"
        >
          {isPending ? "در حال ذخیره..." : "ذخیره"}
        </PrimaryButton>
      </form>
    </div>
  );
}
