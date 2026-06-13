"use client";
import FormField from "@/components/shared/ui/FormField";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import {
  useCheckAuth,
  useUserAddress,
  useUserConsultationFee,
  useUserEmail,
  useUserFirstName,
  useUserLastName,
  useUserMobile,
  useUserPostalCode,
  useUserRole,
  useUserSpecialties,
  useUserYearsOfExperience,
} from "@/features/auth/selectors/auth.selectors";
import { updateProfileAction } from "@/features/user/actions/updateProfile.actions";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { BsSignpost } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdAlternateEmail, MdDriveFileRenameOutline } from "react-icons/md";
import AvatarUpload from "../AvatarUpload";

export default function ProfileInfoForm() {
  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    null,
  );

  const checkAuth = useCheckAuth();
  const role = useUserRole();

  const firstName = useUserFirstName() || "";
  const lastName = useUserLastName() || "";
  const email = useUserEmail() || "";
  const mobile = useUserMobile() || "";

  const address = useUserAddress() || "";
  const postalCode = useUserPostalCode() || "";

  const specialties = useUserSpecialties() || "";
  const yearsOfExperience = useUserYearsOfExperience() || 0;
  const consultationFee = useUserConsultationFee() || 0;

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

  if (role === "plant-doctor") {
    return (
      <div className="border-neutral3 rounded-2xl border p-6 shadow-lg max-md:p-3.5">
        <AvatarUpload />

        <form action={formAction}>
          <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1 max-md:gap-3.5">
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
              icon={<MdAlternateEmail size={20} />}
              id="email"
              name="email"
              label="ایمیل"
              type="email"
              defaultValue={email}
            />

            {/* فیلدهای تخصصی گیاه پزشک (فقط خواندنی) */}
            <FormField
              icon={<MdDriveFileRenameOutline size={20} />}
              id="specialties"
              name="specialties"
              label="تخصص"
              type="text"
              defaultValue={specialties}
              disabled
            />
            <FormField
              icon={<MdDriveFileRenameOutline size={20} />}
              id="yearsOfExperience"
              name="yearsOfExperience"
              label="سال‌های تجربه"
              type="text"
              defaultValue={yearsOfExperience.toString()}
              disabled
            />
            <FormField
              icon={<MdDriveFileRenameOutline size={20} />}
              id="consultationFee"
              name="consultationFee"
              label="هزینه مشاوره (تومان)"
              type="text"
              defaultValue={consultationFee.toLocaleString("fa-IR")}
              disabled
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
  return (
    <div className="border-neutral3 rounded-2xl border p-6 shadow-lg max-md:p-3.5">
      <AvatarUpload />

      <form action={formAction}>
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1 max-md:gap-3.5">
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
          className="mt-4 mr-auto h-12 w-43 text-lg max-md:mt-3.5 max-md:w-full"
        >
          {isPending ? "در حال ذخیره..." : "ذخیره"}
        </PrimaryButton>
      </form>
    </div>
  );
}
