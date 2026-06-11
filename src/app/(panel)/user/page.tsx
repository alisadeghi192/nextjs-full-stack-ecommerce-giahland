import ProfileInfoForm from "@/components/panel/forms/ProfileInfoForm";
import ChangePasswordForm from "@/components/panel/forms/ChangePasswordForm";
import SectionTitle from "@/components/panel/SectionTitle";

export default function UserProfilePage() {
  return (
    <div className="w-full">
      <SectionTitle title="مشخصات حساب کاربری" />
      <ProfileInfoForm />

      <SectionTitle title="تغییر رمز عبور" className="mt-8" />
      <ChangePasswordForm />
    </div>
  );
}
