"use client";

import AdminConsultationCard from "./AdminConsultationCard";

interface AdminConsultationsListProps {
  consultations: {
    _id: string;
    code: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
    doctor: {
      _id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
    status: "active" | "closed";
    lastMessage?: string;
    lastMessageAt?: Date;
    createdAt: Date;
    messageCount?: number;
  }[];
}

export default function AdminConsultationsList({
  consultations,
}: AdminConsultationsListProps) {
  return (
    <div className="space-y-4">
      {consultations.map((consultation) => (
        <AdminConsultationCard
          key={consultation._id}
          consultation={consultation}
        />
      ))}
    </div>
  );
}