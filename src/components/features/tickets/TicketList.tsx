"use client";
import SectionTitle from "@/components/panel/SectionTitle";
import { ITicket } from "@/features/tickets/types/ticket.types";
import { TICKET_DEPARTMENTS } from "@/lib/constants";
import { useState } from "react";

interface TicketListProps {
  tickets: ITicket[];
}

export default function TicketList({ tickets }: TicketListProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (tickets.length === 0) {
    return (
      <div className="mt-6 rounded-lg bg-gray-50 p-8 text-center text-gray-500">
        هیچ تیکتی ثبت نشده است.
      </div>
    );
  }

  const getDepartmentLabel = (value: string) => {
    return TICKET_DEPARTMENTS.find((d) => d.value === value)?.label || value;
  };

  const getStatusColor = (status: string) => {
    return status === "answered"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const getStatusText = (status: string) => {
    return status === "answered" ? "پاسخ داده شده" : "در انتظار پاسخ";
  };

  return (
    <div className="mt-6 space-y-4">
      <SectionTitle title="تیکت های ثبت شده" />
      {tickets.map((ticket) => (
        <div key={ticket._id} className="overflow-hidden rounded-lg border">
         
        </div>
      ))}
    </div>
  );
}
