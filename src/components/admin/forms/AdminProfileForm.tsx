"use client";
import AvatarUpload from "@/components/panel/AvatarUpload";
import FormField from "@/components/shared/ui/FormField";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import {
    useCheckAuth,
    useUserEmail,
    useUserFirstName,
    useUserLastName,
    useUserMobile
} from "@/features/auth/selectors/auth.selectors";
import { updateAdminProfileAction } from "@/features/user/actions/updateAdminProfile.actions";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdAlternateEmail, MdDriveFileRenameOutline } from "react-icons/md";

export default function AdminProfileForm () {
  const [state, formAction, isPending] = useActionState(
    updateAdminProfileAction,
    null,
  );

  const checkAuth = useCheckAuth();

  const storeFirstName = useUserFirstName() || "";
  const storeLastName = useUserLastName() || "";
  const storeEmail = useUserEmail() || "";

  const [firstName, setFirstName] = useState(storeFirstName);
  const [lastName, setLastName] = useState(storeLastName);
  const [email, setEmail] = useState(storeEmail);

  const mobile = useUserMobile() || "";

  useEffect(() => {
    setFirstName(storeFirstName);
    setLastName(storeLastName);
    setEmail(storeEmail);
  }, [storeFirstName, storeLastName, storeEmail,]);

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
  }, [state, checkAuth]);


  return (
    <div className="border-neutral3 rounded-2xl border p-6 shadow-lg max-md:p-3.5">
      <AvatarUpload />

      <form action={formAction} noValidate>
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1 max-md:gap-3.5">
          <FormField
            icon={<MdDriveFileRenameOutline size={20} />}
            id="firstName"
            name="firstName"
            label="نام"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormField
            icon={<MdDriveFileRenameOutline size={20} />}
            id="lastName"
            name="lastName"
            label="نام خانوادگی"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <FormField
            icon={<IoPhonePortraitOutline size={20} />}
            id="mobile"
            name="mobile"
            label="شماره موبایل"
            type="text"
            value={mobile}
            onChange={() => {}}
            disabled
          />
          <FormField
            icon={<MdAlternateEmail size={20} />}
            id="email"
            name="email"
            label="ایمیل"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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