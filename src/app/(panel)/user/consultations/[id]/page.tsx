import ChatHeader from "@/components/features/consultations/ChatHeader";
import ChatInput from "@/components/features/consultations/ChatInput";
import ChatMessages from "@/components/features/consultations/ChatMessages";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getConsultationById } from "@/features/consultations/actions/getConsultationById.actions";
import { getConsultationMessages } from "@/features/consultations/actions/getConsultationMessages.actions";
import { markMessagesAsSeen } from "@/features/consultations/actions/markMessagesAsSeen.actions";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;
  const { user } = await getMeAction();
  const consultation = await getConsultationById(id);
  const messages = await getConsultationMessages(id);

  if (!consultation) {
    notFound();
  }

  await markMessagesAsSeen(id);

  const isDoctor = user?.role === "plant-doctor";
  const username = user?.firstName || "کاربر";
  const displayPerson = isDoctor ? consultation.user : consultation.doctor;
  const displayPersonRole = isDoctor ? "کاربر" : "گیاه پزشک";
  const displayName = isDoctor
    ? `${displayPerson.firstName} ${displayPerson.lastName}`
    : `دکتر ${displayPerson.firstName} ${displayPerson.lastName}`;
  const displayAvatar =
    displayPerson.avatar || "/static/images/default-user.webp";

  return (
    <div className="relative flex h-full flex-col bg-[url('/test/download.png')] bg-size-[350px] bg-fixed bg-repeat">
      {/* Header */}

      <ChatHeader
        consultationId={id}
        displayPersonRole={displayPersonRole}
        displayName={displayName}
        displayAvatar={displayAvatar}
        status={consultation.status}
        isDoctor={isDoctor}
      />

      {/* Messages */}
      <ChatMessages initialMessages={messages} />
      {/* Input */}
      <ChatInput
        consultationId={id}
        consultationStatus={consultation.status}
        username={username}
      />
    </div>
  );
}
