import CreateDoctorForm from "@/components/admin/users/CreateDoctorForm";
import CreateDoctorHeader from "@/components/admin/users/CreateDoctorHeader";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { redirect } from "next/navigation";

export default async function NewDoctorPage() {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="space-y-4">
      <CreateDoctorHeader />
      <CreateDoctorForm />
    </div>
  );
}
