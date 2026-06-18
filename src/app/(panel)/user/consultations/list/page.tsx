import ConsultationsList from "@/components/features/consultations/ConsultationsList";
import SectionTitle from "@/components/panel/SectionTitle";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getUserConsultations } from "@/features/consultations/actions/getUserConsultations.actions";
import Link from "next/link";

export default async function UserConsultationsPage() {
  const consultations = await getUserConsultations();
  const { user } = await getMeAction();
  const isDoctor = user?.role === "plant-doctor";
  const hasConsultations = consultations.length > 0;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle
          title="مشاوره های من"
          className= "mb-0!"
        />
        <Link
          href="/user/consultations"
          className={`text-primary border-primary flex h-10 w-37.5 items-center justify-center rounded-xl border text-center font-medium ${isDoctor ? "hidden" : ""}`}
        >
          شروع مشاوره جدید
        </Link>
      </div>

      {!hasConsultations ? (
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          شما هیچ مشاوره‌ای ندارید.
        </div>
      ) : (
        <ConsultationsList consultations={consultations} />
      )}
    </div>
  );
}
