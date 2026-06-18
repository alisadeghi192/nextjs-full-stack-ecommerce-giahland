import DoctorsList from "@/components/features/consultations/DoctorsList";
import SectionTitle from "@/components/panel/SectionTitle";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getDoctors } from "@/features/consultations/actions/getAllDoctors.actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ConsultationsPage() {
   const { user } = await getMeAction();
  
  if (user?.role === "plant-doctor") {
    redirect("/user/consultations/list");
  }

  const doctors = await getDoctors();
  const hasDoctors = doctors.length > 0;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title="شروع مشاوره" className="mb-0!" />
        <Link
          href="/user/consultations/list"
          className="text-primary border-primary flex h-10 w-37.5 items-center justify-center rounded-xl border text-center font-medium"
        >
          مشاوره های من
        </Link>
      </div>
      {!hasDoctors ? (
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          در حال حاضر پزشکی برای مشاوره وجود ندارد.
        </div>
      ) : (
        <DoctorsList doctors={doctors} />
      )}
    </div>
  );
}
