import ProfileInfoForm from "@/components/panel/forms/ProfileInfoForm";
import ChangePasswordForm from "@/components/panel/forms/ChangePasswordForm";

export default function UserProfilePage() {
  return (
    <div className="mx-6 mt-8 w-full">
      <div className="mb-4 flex items-center gap-x-2.5">
        <span className="bg-primary inline-block h-6 w-0.5 rounded-xs" />
        <h2 className="font-medium">مشخصات حساب کاربری</h2>
      </div>
      <ProfileInfoForm />

      <div className="mt-8 mb-4 flex items-center gap-x-2.5">
        <span className="bg-primary inline-block h-6 w-0.5 rounded-xs" />
        <h2 className="font-medium">تغییر رمز عبور</h2>
      </div>
      <ChangePasswordForm />
    </div>
  );
}
