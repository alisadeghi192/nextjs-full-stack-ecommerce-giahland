import CreateDoctorForm from "@/components/admin/users/CreateDoctorForm";
import CreateDoctorHeader from "@/components/admin/users/CreateDoctorHeader";
import { getMeAction } from "@/features/auth/actions/me.actions";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "  افزودن پزشک | پنل مدیریت",
};

export default async function NewDoctorPage() {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <section className="space-y-4">
      <CreateDoctorHeader />
      <CreateDoctorForm />
    </section>
  );
}
