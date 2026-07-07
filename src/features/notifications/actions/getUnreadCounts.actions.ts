"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import ConsultationMessage from "@/lib/db/models/ConsultationMessage";
import Ticket from "@/lib/db/models/Ticket";

export async function getUnreadCounts() {
  const { user } = await getMeAction();
  if (!user) {
    return { consultation: 0, ticket: 0 };
  }

  await connectToDB();

  const isDoctor = user.role === "plant-doctor";
  const sender = isDoctor ? "user" : "doctor";
  const filter = isDoctor ? { doctor: user._id } : { user: user._id };

  const consultations = await Consultation.find({
    ...filter,
    status: "active",
  })
    .select("_id lastMessage")
    .lean();

  const consultationIds = consultations.map((c) => c._id);

  const unreadConsultations = await ConsultationMessage.aggregate([
    {
      $match: {
        consultationId: { $in: consultationIds },
        status: "sent",
        sender: sender,
      },
    },
    { $group: { _id: "$consultationId" } },
    { $count: "count" },
  ]);

  let consultationUnread = unreadConsultations[0]?.count || 0;

  if (isDoctor) {
    const newConsultationsWithoutMessage = consultations.filter(
      (c) => !c.lastMessage || c.lastMessage === ""
    ).length;
    consultationUnread += newConsultationsWithoutMessage;
  }

  const ticketUnread = await Ticket.countDocuments({
    user: user._id,
    status: "answered",
    isReadByUser: false,
  });

  return {
    consultation: consultationUnread,
    ticket: ticketUnread,
  };
}