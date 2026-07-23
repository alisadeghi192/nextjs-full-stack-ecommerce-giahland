"use client";

import ChatMessages from "@/components/features/consultations/ChatMessages";
import { closeConsultation } from "@/features/consultations/actions/closeConsultation.actions";
import { ConsultationMessageWithDetails } from "@/features/consultations/types/consultation.types";
import { formatDate, toPersianCode } from "@/lib/utils/format";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AdminChatHeader from "./AdminChatHeader";

interface AdminChatContainerProps {
  consultationId: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  doctor: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  status: "active" | "closed";
  messages: ConsultationMessageWithDetails[];
  code: string;
  createdAt: Date;
}

export default function AdminChatContainer({
  consultationId,
  user,
  doctor,
  status,
  messages,
  code,
  createdAt,
}: AdminChatContainerProps) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const userDisplayName =
    `${user.firstName} ${user.lastName}`.trim() || "کاربر";
  const doctorDisplayName =
    `${doctor.firstName} ${doctor.lastName}`.trim() || "پزشک";

  const isActive = status === "active";

  const handleClose = async () => {
    setIsClosing(true);
    const result = await closeConsultation(consultationId);
    if (result.success) {
      toast.success(result.message);
      router.push("/admin/consultations");
    } else {
      toast.error(result.message);
    }
    setIsClosing(false);
  };

  return (
    <div className="relative flex h-full flex-col bg-[url('/static/images/chat-bg.webp')] bg-size-[350px] bg-fixed bg-repeat">
      <AdminChatHeader
        user={user}
        doctor={doctor}
        isActive={isActive}
        isClosing={isClosing}
        onClose={handleClose}
        userDisplayName={userDisplayName}
        doctorDisplayName={doctorDisplayName}
      />

      <div className="flex-1 overflow-hidden">
        <ChatMessages initialMessages={messages} />
      </div>

      <div className="text-neutral9 flex shrink-0 items-center justify-center gap-x-2 bg-white/40 px-4 py-2 text-center text-sm backdrop-blur-lg">
        <span className="text-primary">فقط مشاهده👀</span>
        <span className="text-primary">
          کد: {toPersianCode(code)} - {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
}
