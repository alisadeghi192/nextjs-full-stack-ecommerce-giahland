"use client";
import SectionTitle from "@/components/panel/SectionTitle";
import BackButton from "@/components/shared/ui/BackButton";
import { useRouter } from "next/navigation";

export default function CreateDoctorHeader() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <SectionTitle title="افزودن پزشک جدید" className="mb-0!" />
      <BackButton />
    </div>
  );
}
