"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";
import CommentModel from "@/lib/db/models/Comment";
import Consultation from "@/lib/db/models/Consultation";
import ConsultationMessage from "@/lib/db/models/ConsultationMessage";
import ContactMessage from "@/lib/db/models/ContactMessage";
import Ticket from "@/lib/db/models/Ticket";

export async function getNotifications() {
  const { user } = await getMeAction();
  if (!user) {
    return { consultation: 0, ticket: 0, doctorComments: 0, adminTickets: 0, adminContact: 0, adminComments: 0 };
  }

  await connectToDB();
  const isDoctor = user.role === "plant-doctor";
  const isAdmin = user.role === "admin";

  let consultation = 0;
  let ticket = 0;
  let doctorComments = 0;
  let adminTickets = 0;
  let adminContact = 0;
  let adminComments = 0;

  if (!isAdmin) {
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

    consultation = unreadConsultations[0]?.count || 0;

    if (isDoctor) {
      const newConsultationsWithoutMessage = consultations.filter(
        (c) => !c.lastMessage || c.lastMessage === ""
      ).length;
      consultation += newConsultationsWithoutMessage;
    }

    ticket = await Ticket.countDocuments({
      user: user._id,
      status: "answered",
      isReadByUser: false,
    });
  }

  if (isAdmin) {
    [adminTickets, adminContact, adminComments] = await Promise.all([
      Ticket.countDocuments({ status: "pending" }),
      ContactMessage.countDocuments({ isRead: false }),
      CommentModel.countDocuments({ isReadByAdmin: false }),
    ]);
  }

  if (isDoctor) {
    const articles = await Article.find({ author: user._id })
      .select("_id")
      .lean();
    const articleIds = articles.map((a) => a._id.toString());

    doctorComments = await CommentModel.countDocuments({
      $or: [
        { targetType: "products" },
        { targetType: "blog", targetId: { $in: articleIds } },
      ],
      reply: { $exists: false },
      isApproved: true,
    });
  }

  return {
    consultation,
    ticket,
    doctorComments,
    adminTickets,
    adminContact,
    adminComments,
  };
}