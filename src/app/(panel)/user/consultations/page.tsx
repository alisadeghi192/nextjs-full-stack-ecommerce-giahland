import ConsultationsPageHeader from "@/components/features/consultations/ConsultationsPageHeader";
import DoctorsList from "@/components/features/consultations/DoctorsList";
import SectionTitle from "@/components/panel/SectionTitle";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getDoctors } from "@/features/consultations/actions/getAllDoctors.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "مشاوره گیاه‌پزشکی | پنل کاربری",
};

export default async function ConsultationsPage() {
  const { user } = await getMeAction();
  if (user?.role === "plant-doctor") {
    redirect("/user/consultations/list");
  }

  const doctors = await getDoctors();
  const hasDoctors = doctors.length > 0;

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title="شروع مشاوره" className="mb-0!" />
        <ConsultationsPageHeader />
      </div>
      {!hasDoctors ? (
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          در حال حاضر پزشکی برای مشاوره وجود ندارد.
        </div>
      ) : (
        <DoctorsList doctors={doctors} />
      )}
    </section>
  );
}
