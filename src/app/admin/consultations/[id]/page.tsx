
import AdminChatContainer from "@/components/admin/consulations/AdminChatContainer";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getConsultationById } from "@/features/consultations/actions/getConsultationById.actions";
import { getConsultationMessages } from "@/features/consultations/actions/getConsultationMessages.actions";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminConsultationDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const consultation = await getConsultationById(id);
  if (!consultation) {
    notFound();
  }

  const messages = await getConsultationMessages(id);

  return (
    <section className="h-[calc(100dvh-61px)] max-md:h-[calc(100dvh-56px)]">
      <AdminChatContainer
        consultationId={id}
        user={{
          ...consultation.user,
          avatar:
            consultation.user.avatar || "/static/images/default-user.webp",
        }}
        doctor={{
          ...consultation.doctor,
          avatar:
            consultation.doctor.avatar || "/static/images/default-user.webp",
        }}
        status={consultation.status}
        messages={messages}
        code={consultation.code}
        createdAt={consultation.createdAt}
      />
    </section>
  );
}
