"use client";

import DoctorCard from "@/components/features/consultations/DoctorCard";
import { IDoctorCardInfo } from "@/features/consultations/types/consultation.types";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";

interface DoctorsListProps {
  doctors: IDoctorCardInfo[];
}

export default function DoctorsList({ doctors }: DoctorsListProps) {
  const isSidebarOpen = useIsSidebarOpen();

  const gridColumns = isSidebarOpen
    ? "grid-cols-2 max-xl:grid-cols-1"
    : "grid-cols-2 max-lg:grid-cols-1  ";

  return (
    <div className={`grid gap-4 ${gridColumns}`}>
      {doctors.map((doctor) => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );
}