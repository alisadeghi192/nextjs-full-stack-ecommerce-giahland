"use client";

import { useUserRole } from "@/features/auth/selectors/auth.selectors";
import { ConsultationWithDetails } from "@/features/consultations/types/consultation.types";
import { toPersianCode, toPersianNumber } from "@/lib/utils/format";
import Image from "next/image";
import Link from "next/link";
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";

interface ConsultationCardProps {
  consultation: ConsultationWithDetails;
}

export default function ConsultationCard({
  consultation,
}: ConsultationCardProps) {
  const userRole = useUserRole();
  const isDoctor = userRole === "plant-doctor";

  const isClosedConsultation = consultation.status === "closed";

  const displayPerson = isDoctor ? consultation.user : consultation.doctor;
  const personName = isDoctor
    ? `${displayPerson.firstName} ${displayPerson.lastName}`
    : `دکتر ${displayPerson.firstName} ${displayPerson.lastName}`;

  const lastMsg = consultation.lastMessage;
  const mySender = isDoctor ? "doctor" : "user";
  const isMyMessage = lastMsg?.sender === mySender;

  const showUnreadDot = !isMyMessage && lastMsg?.status === "sent";
  const showSeen = isMyMessage && lastMsg?.status === "seen";
  const showSent = isMyMessage && lastMsg?.status === "sent";

  return (
    <Link href={`/user/consultations/${consultation._id}`}>
      <div
        className={`border-neutral5 hover:border-primary relative cursor-pointer overflow-hidden rounded-lg border p-4 pl-6 shadow-lg transition-all max-[400px]:pl-4 ${isClosedConsultation ? "hover:border-error!" : ""}`}
      >
        {isClosedConsultation && (
          <span className="bg-error absolute top-2 -left-5 z-10 w-20 -rotate-45 text-center font-medium text-white">
            بسته
          </span>
        )}

        <div
          className={`flex items-center gap-4 max-[400px]:gap-3 ${isClosedConsultation ? "grayscale" : ""}`}
        >
          <div className="relative size-18 shrink-0 overflow-hidden rounded-full">
            <Image
              alt={personName}
              src={displayPerson.avatar || "/static/images/default-user.webp"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-x-2">
              <h3 className="font-medium max-[400px]:font-normal text-nowrap">
                {personName}
              </h3>
              <div className="text-neutral9 flex flex-wrap items-center justify-end gap-x-1 text-sm max-[400px]:text-xs">
                <span>
                   کد {toPersianCode(consultation.code) || ""}
                </span>
                <span>
                  {new Date(consultation.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>

            <div className="relative mt-1 flex items-center justify-between">
              <p className="text-primary line-clamp-1 flex-1 max-[400px]:text-sm">
                {lastMsg?.text || consultation.title}
              </p>

              <div className="mr-2 flex shrink-0 items-center gap-1">
                <span className="text-primary text-sm max-[400px]:text-xs">
                  {lastMsg
                    ? new Date(lastMsg.createdAt).toLocaleTimeString("fa-IR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : new Date(consultation.createdAt).toLocaleTimeString(
                        "fa-IR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                </span>

                {showUnreadDot && (
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                    {toPersianNumber(consultation.unreadCount as number)}
                  </span>
                )}
                {showSeen && <IoCheckmarkDoneSharp className="text-primary" />}

                {showSent && <IoCheckmarkSharp className="text-primary" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
