import TicketForm from "@/components/features/tickets/TicketForm";
import TicketList from "@/components/features/tickets/TicketList";
import SectionTitle from "@/components/panel/SectionTitle";
import { getUserTickets } from "@/features/tickets/actions/getUserTickets.actions";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: " تیکت‌های پشتیبانی | پنل کاربری",
};

export default async function TicketsPage() {
  const tickets = await getUserTickets();

  return (
    <section className="w-full">
      <SectionTitle title="تیکت های پشتیبانی" />
      <TicketForm />
      <TicketList tickets={tickets} />
    </section>
  );
}