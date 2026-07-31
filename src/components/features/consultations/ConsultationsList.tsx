"use client";

import {
  useIsLoading
} from "@/features/auth/selectors/auth.selectors";
import { IConsultationWithDetails } from "@/features/consultations/types/consultation.types";
import { useAllNotifications } from "@/features/notifications/hooks/useAllNotifications";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import { useEffect } from "react";
import ConsultationCard from "./ConsultationCard";

interface ConsultationsListProps {
  consultations: IConsultationWithDetails[];
}

export default function ConsultationsList({
  consultations,
}: ConsultationsListProps) {
  const isSidebarOpen = useIsSidebarOpen();
  const isAuthLoading = useIsLoading();
  const { refresh } = useAllNotifications();

  useEffect(() => {
    refresh();
  }, []);

  const gridColumns = isSidebarOpen
    ? "grid-cols-2 max-xl:grid-cols-1"
    : "grid-cols-2 max-lg:grid-cols-1";

  if (isAuthLoading) {
    return (
      <div className={`grid gap-4 max-md:grid-cols-1 ${gridColumns}`}>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="border-neutral5 dark:border-neutral10 flex animate-pulse items-center gap-x-4 rounded-lg border p-4 shadow-lg"
          >
            <div className="bg-neutral3 dark:bg-shade3 size-18 shrink-0 rounded-full" />
            <div className="flex w-full flex-col gap-2">
              <div className="bg-neutral3 dark:bg-shade3 mt-auto h-6 w-1/3 rounded" />
              <div className="bg-neutral3 dark:bg-shade3 h-4 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 max-[400px]:gap-3 max-md:grid-cols-1 ${gridColumns}`}
    >
      {consultations.map((consultation) => (
        <ConsultationCard key={consultation._id} consultation={consultation} />
      ))}
    </div>
  );
}
