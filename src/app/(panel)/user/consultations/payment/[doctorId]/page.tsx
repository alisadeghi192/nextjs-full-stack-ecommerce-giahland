import PaymentCard from "@/components/features/payment/PaymentCard";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { createConsultation } from "@/features/consultations/actions/createConsultation.actions";
import { getDoctors } from "@/features/consultations/actions/getAllDoctors.actions";
import { notFound, redirect } from "next/navigation";

interface ConsultationPaymentPageProps {
  params: Promise<{ doctorId: string }>;
}

export default async function ConsultationPaymentPage({
  params,
}: ConsultationPaymentPageProps) {
  const { doctorId } = await params;

  const { user } = await getMeAction();
  if (!user) {
    redirect("/login-register");
  }

  const doctors = await getDoctors();
  const doctor = doctors.find((d) => d._id === doctorId);
  if (!doctor) {
    notFound();
  }

  async function handlePayment() {
    "use server";
    const result = await createConsultation(doctorId);

    if (result.success) {
      if (result.redirect) {
        redirect(result.redirect);
      }
      redirect(`/user/consultations/payment/success/${result.consultationId}`);
    }

    return {
      success: false,
      message: result.message || "خطا در ثبت مشاوره",
    };
  }

  return (
    <div className="mt-5 flex min-h-[calc(100dvh-200px)] items-center justify-center">
      <PaymentCard
        title="پرداخت مشاوره"
        amount={doctor.consultationFee}
        extraInfo={{
          label: "پزشک",
          value: `دکتر ${doctor.firstName} ${doctor.lastName}`,
        }}
        isLoading={false}
        onSubmit={handlePayment}
      />
    </div>
  );
}
