"use client";
import SectionTitle from "@/components/panel/SectionTitle";
import { useAllNotifications } from "@/features/notifications/hooks/useAllNotifications";
import { ITicket } from "@/features/tickets/types/ticket.types";
import { useEffect, useState } from "react";
import TicketItem from "./TicketItem";

interface TicketListProps {
  tickets: ITicket[];
}

export default function TicketList({ tickets }: TicketListProps) {
  const { refresh } = useAllNotifications();
  useEffect(() => {
    refresh();
  }, []);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (tickets.length === 0) {
    return (
      <div className="dark:border-neutral10 border-neutral3 border dark:bg-shade4 dark:shadow-shade6 mt-6 rounded-xl bg-gray-50 p-8 text-center text-gray-500 shadow-lg dark:text-gray-50">
        هیچ تیکتی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="mt-8 max-md:mt-4">
      <SectionTitle title="تیکت های شما" />
      <div className="flex flex-col gap-y-4">
        {tickets.map((ticket) => (
          <TicketItem
            key={ticket._id}
            ticket={ticket}
            isOpen={openId === ticket._id}
            onToggle={() => toggleItem(ticket._id)}
          />
        ))}
      </div>
    </div>
  );
}
