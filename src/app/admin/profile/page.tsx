import AdminProfileForm from "@/components/admin/forms/AdminProfileForm";
import SectionTitle from "@/components/panel/SectionTitle";
import ChangePasswordForm from "@/components/panel/forms/ChangePasswordForm";

export default function AdminProfilePage() {
  return (
    <section>
      <SectionTitle title="مشخصات حساب کاربری" />
      <AdminProfileForm />

      <SectionTitle title="تغییر رمز عبور" className="mt-8" />
      <ChangePasswordForm />
    </section>
  );
}