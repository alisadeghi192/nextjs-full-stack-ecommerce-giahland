"use client";

import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { toPersianNumber, toPersianPrice } from "@/lib/utils/format";
import Image from "next/image";
import Link from "next/link";

interface DoctorCardProps {
  doctor: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    specialties: string;
    yearsOfExperience: number;
    consultationFee: number;
    successfulConsultations: number;
  };
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="border-neutral5 rounded-lg border p-4 shadow-lg">
      <div className="max-xs:gap-x-2.5 flex gap-x-6">
        <div className="max-xs:size-21 relative size-30 shrink-0 overflow-hidden rounded-lg">
          <Image
            alt={`${doctor.firstName} ${doctor.lastName}`}
            src={doctor.avatar}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col justify-between">
          <span className="max-xs:text-sm block text-lg">
            دکتر {doctor.firstName} {doctor.lastName}
          </span>
          <span className="text-neutral9 block text-sm">
            {doctor.specialties}
          </span>
          <div className="flex items-center gap-x-4 max-sm:gap-x-2">
            <span className="text-neutral9 text-sm">
              ویزیت موفق: {toPersianNumber(doctor.successfulConsultations)}
            </span>
            <span className="bg-primary inline-block h-4 w-0.5 rounded-xs" />
            <span className="text-neutral9 text-sm">
              سابقه: {toPersianNumber(doctor.yearsOfExperience)} سال
            </span>
          </div>
          <div className="max-xs:hidden flex w-full items-center justify-between">
            <div>
              <span className="text-lg">
               {toPersianPrice(doctor.consultationFee)}
              </span>
            </div>
            <Link  href={`/user/consultations/payment/${doctor._id}`}>
              <PrimaryButton className="h-8 w-28.5 rounded-lg!">پرداخت</PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
      <div className="xs:hidden mt-2 flex w-full items-center justify-between">
        <div>
          <span className="text-lg">
            {toPersianPrice(doctor.consultationFee)}
          </span>
        </div>
        <Link  href={`/user/consultations/payment/${doctor._id}`}>
          <PrimaryButton className="h-8 w-28.5 rounded-lg!">پرداخت</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
