import PaymentSuccess from "@/components/features/payment/PaymentSuccess";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getConsultationById } from "@/features/consultations/actions/getConsultationById.actions";
import { notFound, redirect } from "next/navigation";

interface ConsultationSuccessPageProps {
  params: Promise<{ consultationId: string }>;
}

export default async function ConsultationSuccessPage({
  params,
}: ConsultationSuccessPageProps) {
  const { consultationId } = await params;

  const { user } = await getMeAction();
  if (!user) redirect("/login-register");

  const consultation = await getConsultationById(consultationId);
  if (!consultation) {
    notFound();
  }
  if (consultation.user._id !== user._id) {
    notFound();
  }

  return (
    <main className="max-xs:mt-6 container mt-5 flex min-h-[calc(100dvh-200px)] items-center justify-center">
      <PaymentSuccess
        variant="consultation"
        trackingCode={consultation.code}
        price={consultation.doctor.consultationFee || 0}
        extraInfo={{
          label: "پزشک",
          value: `دکتر ${consultation.doctor.firstName} ${consultation.doctor.lastName}`,
        }}
      />
    </main>
  );
}
