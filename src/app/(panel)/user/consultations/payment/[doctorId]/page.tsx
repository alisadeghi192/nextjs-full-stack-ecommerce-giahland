"use client";

import { createConsultation } from "@/features/consultations/actions/createConsultation.actions";
import { getDoctors } from "@/features/consultations/actions/getAllDoctors.actions";
import { DoctorCardInfo } from "@/features/consultations/types/consultation.types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdArrowBack, MdCheckCircle, MdPayment, MdSecurity } from "react-icons/md";

export default function PaymentPage() {
  const { doctorId } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [doctor, setDoctor] = useState<DoctorCardInfo | null>(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctors = await getDoctors();
        const foundDoctor = doctors.find((d) => d._id === doctorId);
        setDoctor(foundDoctor || null);
      } catch (error) {
        console.error("Failed to fetch doctor:", error);
      } finally {
        setLoadingDoctor(false);
      }
    };
    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const handleFakePayment = async () => {
    setIsLoading(true);
    const result = await createConsultation(doctorId as string);
    if (result.success) {
      toast.success("پرداخت با موفقیت انجام شد");
      router.push("/user/consultations/list");
    } else {
      toast.error(result.message || "خطا در ثبت مشاوره");
    }
    setIsLoading(false);
  };

  if (loadingDoctor) {
    return (
      <div className="flex min-h-[calc(100dvh-200px)] items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-4ی"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center">
          <p className="text-neutral8">پزشک مورد نظر یافت نشد.</p>
          <button
            onClick={() => router.back()}
            className="bg-primary mt-4 rounded-lg px-5 py-2 text-white"
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  const formattedFee = doctor.consultationFee.toLocaleString("fa-IR");

  return (
    <div className="flex min-h-[calc(100dvh-200px)] items-center justify-center">
      <div className="border-neutral3 relative max-w-md w-full overflow-hidden rounded-2xl border bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="bg-primary h-2 w-full"></div>
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 flex h-8 w-25 px-4 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 cursor-pointer gap-x-1"
        >
          <span>بازگشت</span>
          <MdArrowBack className="size-5 shrink-0" />
        </button>

        <div className="p-8">
          <div className="mb-4 text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <MdPayment className="text-primary h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">پرداخت مشاوره</h2>
            <p className=" mt-2 text-primary">
              دکتر {doctor.firstName} {doctor.lastName}
            </p>
          </div>

          <div className="border-primary/20 bg-primary/5 mb-4 rounded-xl border p-4 text-center">
            <span className="text-neutral8 text-sm">مبلغ قابل پرداخت</span>
            <div className="mt-1 text-3xl font-bold">{formattedFee} تومان</div>
            <span className="text-neutral9 mt-1 inline-flex items-center gap-1 text-xs">
              <MdSecurity className="size-3" />
              پرداخت امن و رمزنگاری شده
            </span>
          </div>

          <div className="border-yellow-200 bg-yellow-50 mb-6 rounded-lg border p-3 text-center">
            <p className="text-yellow-700 text-xs">
              🔒 این یک درگاه پرداخت آزمایشی است. برای ادامه تست، روی دکمه زیر کلیک کنید.
            </p>
          </div>

          <button
            onClick={handleFakePayment}
            disabled={isLoading}
            className="bg-primary hover:bg-shade2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-white transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="border-white h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
                در حال پردازش...
              </>
            ) : (
              <>
                <MdCheckCircle className="h-5 w-5" />
                تأیید پرداخت آزمایشی
              </>
            )}
          </button>

          <p className="text-neutral9 mt-4 text-center text-xs">
            با کلیک روی دکمه، شما با شرایط و قوانین سایت موافقت می‌کنید.
          </p>
        </div>
      </div>
    </div>
  );
}