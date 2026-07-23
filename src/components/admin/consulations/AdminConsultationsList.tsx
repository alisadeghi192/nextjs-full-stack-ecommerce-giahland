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
  if (consultations.length === 0) {
    return (
      <div className="border-neutral3 rounded-2xl border p-8 text-center text-gray-500 shadow-lg">
        هیچ مشاوره‌ای یافت نشد.
      </div>
    );
  }

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