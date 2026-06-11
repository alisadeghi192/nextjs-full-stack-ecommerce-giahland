import TicketForm from "@/components/features/tickets/TicketForm";
import TicketList from "@/components/features/tickets/TicketList";
import SectionTitle from "@/components/panel/SectionTitle";
import { getUserTickets } from "@/features/tickets/actions/ticket.actions";

export default async function TicketsPage() {
  const tickets = await getUserTickets();

  return (
    <div className="w-full">
      <SectionTitle title="تیکت های پشتیبانی" />
      <TicketForm />
      <TicketList tickets={tickets} />
    </div>
  );
}